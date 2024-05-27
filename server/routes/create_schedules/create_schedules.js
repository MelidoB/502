const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/', (req, res) => {
    const courseTopics = req.body.courseTopics;

    // Read the updatedSearchResults.json file
    const dataPath = path.join(__dirname, '../../routes/rate_my_professor/updatedSearchResults.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }

        let allCourses = JSON.parse(data);

        // Group classes by course topic
        let topicCoursesMap = new Map();
        allCourses.forEach(course => {
            const topic = course.courseTopic;
            if (!topicCoursesMap.has(topic)) {
                topicCoursesMap.set(topic, []);
            }
            topicCoursesMap.get(topic).push(course);
        });

        // Generate all possible schedules with one class from each course topic
        let schedules = [];
        function createSchedulesHelper(schedule, remainingTopics) {
            if (remainingTopics.length === 0) {
                schedules.push([...schedule]);
                return;
            }

            let nextTopic = remainingTopics[0];
            let nextCourses = topicCoursesMap.get(nextTopic.split('_')[0]);
            
            if (!nextCourses) {
                console.error(`No courses found for topic: ${nextTopic}`);
                return;
            }

            nextCourses.forEach(course => {
                schedule.push(course);
                createSchedulesHelper(schedule, remainingTopics.slice(1));
                schedule.pop();
            });
        }

        // To handle the same course topic multiple times, we use index to differentiate
        let uniqueTopics = courseTopics.map((topic, index) => topic + '_' + index);
        createSchedulesHelper([], uniqueTopics);

        // Calculate the overall rating for each schedule and order them
        const orderedSchedules = schedules.map(schedule => {
            const overallRatingSum = schedule.reduce((sum, course) => {
                return sum + (course.overallRating || 0);
            }, 0);

            return { schedule, overallRatingSum };
        }).sort((a, b) => b.overallRatingSum - a.overallRatingSum);

        // Write the ordered schedules to a JSON file
        const outputFilePath = path.join(__dirname, './ordered_schedules.json');
        fs.writeFile(outputFilePath, JSON.stringify(orderedSchedules, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write output file' });
            }

            res.json({ message: 'Schedules created successfully', file: outputFilePath });
        });
    });
});

module.exports = router;
