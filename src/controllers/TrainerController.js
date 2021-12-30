const Trainer = require("../models/Trainer");
const fs = require("fs");
const path = require("path");
const avatarPath = path.join(__dirname, "../public/uploads/trainer");
const CourseClass = require("../models/CourseClass")
const Trainee = require("../models/Trainee");
const Grade = require("../models/Grade");

class TrainerController {
    index(req, res) {
        console.log(req.session.user);
        res.render("trainer", {
            user: req.session.user
        });
    }

    // View course with search keyword or status
    showAssignedCoursesWithSearch(req, res) {
        let keyword = req.body.keyword;
        let courseId = req.query.id;
        if (keyword) {
            // user session as trainer logined
            let trainer = {
                email: 'trainer@fpt.edu.vn',
                name: 'Do Cong Thanh',
                image: { data: [Object], contentType: 'image/png', name: '' },
                role: 'trainer',
                code: 'GTH120222'
            };
            console.log(trainer);
            // find courseClass based on trainer Code
            CourseClass.find({
                trainers: {
                    $elemMatch: {
                        code: trainer.code
                    }
                },
                class_name: { $regex: keyword }

            }, (err, courseClasses) => {
                console.log(courseClasses)
                if (!err) res.render("trainer/assignedCourses", {
                    user: req.session.user,
                    data: courseClasses
                });
                else next(err);
            });
        }
    }



    // View trainees with search keyword or status
    viewClassWithSearch(req, res) {
        let keyword = req.body.keyword;
        let courseId = req.query.id;
        if (keyword) {
            // Find Trainees By Keywords
            CourseClass.findById({
                _id: courseId
            }, (err, courseClass) => {
                let listTraineesInClass = courseClass.trainees;
                // find all trainee in list of trainee code
                Trainee.find({
                    name: {
                        $regex: keyword
                    },
                    code: listTraineesInClass.map(trainee => trainee.code)
                }, (err, listTrainees) => {
                    Grade.find({
                        class: courseId
                    }, (err, listGrade) => {
                        if (!err) {
                            //add grade to list trainee match keyword
                            listTrainees.forEach(trainee => {
                                listGrade.forEach(gradeItem => {
                                    if (gradeItem.code == trainee.code) {
                                        trainee.grade = gradeItem.grade;
                                    }
                                })
                            })
                            listTrainees.forEach(trainee => {
                                    if (trainee.grade == undefined) {
                                        trainee.grade = 'Not Have'
                                    }
                                })
                                // add gradeStatus
                            listTrainees.forEach(trainee => {
                                console.table(trainee);
                                listTraineesInClass.forEach(traineeInClass => {
                                    console.table(traineeInClass);
                                    if (trainee.code == traineeInClass.code) {
                                        trainee.gradeStatus = traineeInClass.grade_status;
                                    }
                                })
                            })
                            res.render("trainer/viewtrainees", {
                                user: req.session.user,
                                class_name: courseClass.class_name,
                                data: listTrainees,
                                courseId: req.query.id
                            })
                        } else {
                            res.send(404).send("Not Found");
                        };
                    });
                })
            });
        } else {
            // if filter by gradestatus
            let gradeStatus = req.body.grade_status;
            let courseId = req.query.id;
            if (gradeStatus && gradeStatus != 'all') {
                CourseClass.findById({
                    _id: courseId
                }, (err, courseClass) => {
                    let listTraineesInClass = courseClass.trainees;
                    if (gradeStatus == 'fail') {
                        listTraineesInClass = listTraineesInClass.filter(trainee => trainee.grade_status.toLowerCase() == 'fail');
                    }
                    if (gradeStatus == 'pass') {
                        listTraineesInClass = listTraineesInClass.filter(trainee => trainee.grade_status.toLowerCase() != 'fail');
                    }
                    // find all trainee in list of trainee code
                    Trainee.find({
                        code: listTraineesInClass.map(trainee => trainee.code)
                    }, (err, listTrainees) => {
                        Grade.find({
                            class: courseId
                        }, (err, listGrade) => {
                            if (!err) {
                                //add grade to list trainee match keyword
                                listTrainees.forEach(trainee => {
                                    listGrade.forEach(gradeItem => {
                                        if (gradeItem.code == trainee.code) {
                                            trainee.grade = gradeItem.grade;
                                        }
                                    })
                                })
                                listTrainees.forEach(trainee => {
                                        if (trainee.grade == undefined) {
                                            trainee.grade = 'Not Have'
                                        }
                                    })
                                    // add gradeStatus
                                listTrainees.forEach(trainee => {
                                    console.table(trainee);
                                    listTraineesInClass.forEach(traineeInClass => {
                                        console.table(traineeInClass);
                                        if (trainee.code == traineeInClass.code) {
                                            trainee.gradeStatus = traineeInClass.grade_status;
                                        }
                                    })
                                })
                                res.render("trainer/viewtrainees", {
                                    user: req.session.user,
                                    class_name: courseClass.class_name,
                                    data: listTrainees,
                                    courseId: req.query.id,
                                    currentFilter: gradeStatus
                                })
                            } else {
                                res.send(404).send("Not Found");
                            };
                        });
                    })
                })
            } else if (gradeStatus && gradeStatus == 'all') {
                // Get All Trainees in Course Class
                new TrainerController().view(req, res, 'all');
            } else {
                // Get All Trainees in Course Class
                new TrainerController().view(req, res);
            }
        }
    }


    // View traniees in selected class
    view(req, res, currentFilter) {
        CourseClass.findById({
            _id: req.query.id
        }, (err, courseClass) => {
            const TraineesCode = courseClass.trainees.map(item => item.code);
            console.log(TraineesCode);
            const traineesInCoureClass = courseClass.trainees;
            // find all trainee in list of trainee code
            Trainee.find({
                code: {
                    $in: TraineesCode
                }
            }, (err, listTrainees) => {
                Grade.find({
                    class: req.query.id
                }, (err, listGrade) => {
                    if (!err) {
                        console.log('1111')
                            // Add grade to list Trainee before return to page
                        listTrainees.forEach(trainee => {
                            listGrade.forEach(gradeItem => {
                                if (gradeItem.code == trainee.code) {
                                    trainee.grade = gradeItem.grade;
                                }
                            })
                        })
                        listTrainees.forEach(trainee => {
                                if (trainee.grade == undefined) {
                                    trainee.grade = 'Not Have'
                                }
                            })
                            // Add grade status in Trainee before return to page
                        listTrainees.forEach(trainee => {
                            traineesInCoureClass.forEach(traineeInCourseClass => {
                                if (trainee.code == traineeInCourseClass.code) {
                                    trainee.gradeStatus = traineeInCourseClass.grade_status;
                                }
                            })
                        })
                        console.table(listTrainees);
                        console.table(listTrainees.map(item => item._doc));
                        res.render("trainer/viewTrainees", {
                            user: req.session.user,
                            class_name: courseClass.class_name,
                            data: listTrainees,
                            courseId: req.query.id,
                            currentFilter: currentFilter
                        })
                    } else {
                        console.log(err);
                    };
                });
                console.log(err);
            })
            console.log(err);
        });
    }


    // view trainee status
    viewTraineeStatus(req, res) {
            console.log("queryy = " + req.query);
            res.status(200).send(req.query);
        }
        //update grade 
    updateGrade(req, res) {
        if (req.body.grade != "") {
            // STEP1 : Update or Insert new grade into grade table
            var gradeStatus = "Pending";
            Grade.findOneAndUpdate({
                code: req.body.traineeCode,
                class: req.body.classId
            }, {
                grade: req.body.grade,
                code: req.body.traineeCode,
                class: req.body.classId
            }, {
                upsert: true
            }, function(err, doc) {
                if (err) {
                    return res.send(500, {
                        error: err
                    });
                } else {
                    // update grade status in courseClass table
                    if (req.body.grade > 50) {
                        gradeStatus = "Pass";
                        if (req.body.grade > 60) {
                            gradeStatus = "Merit";
                            if (req.body.grade > 80) {
                                gradeStatus = "Distinction";
                            }
                        }
                    } else {
                        gradeStatus = "Fail";
                    }
                    //Update course class
                    CourseClass.updateOne({
                        'trainees.code': req.body.traineeCode
                    }, {
                        '$set': {
                            'trainees.$.grade_status': gradeStatus
                        }
                    }, {}, (err, results) => {
                        req.query.id = req.body.classId;
                        new TrainerController().view(req, res);
                    })
                }
            });
        } else {
            var gradeStatus = "Pending";
            Grade.findOneAndDelete({
                code: req.body.traineeCode,
                class: req.body.classId
            }, (err, result) => {
                CourseClass.updateOne({
                    'trainees.code': req.body.traineeCode
                }, {
                    '$set': {
                        'trainees.$.grade_status': gradeStatus
                    }
                }, {}, (err, isUpdated) => {
                    if (!err) {}
                    req.query.id = req.body.classId;
                    new TrainerController().view(req, res);
                })
            })
        }
    }

    showAssignedCourses(req, res) {
        // user session as trainer logined
        let trainer = {
            email: 'trainer@fpt.edu.vn',
            name: 'Do Cong Thanh',
            image: { data: [Object], contentType: 'image/png', name: '' },
            role: 'trainer',
            code: 'GTH120222'
        };
        console.log(trainer);
        // find courseClass based on trainer Code
        CourseClass.find({
            trainers: {
                $elemMatch: {
                    code: trainer.code
                }
            }
        }, (err, courseClasses) => {
            console.log(courseClasses)
            if (!err) res.render("trainer/assignedCourses", {
                user: req.session.user,
                data: courseClasses
            });
            else next(err);
        });
    }
}

module.exports = new TrainerController();