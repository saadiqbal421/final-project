import { useRouter } from "next/router";
import { useEffect, useState, createElement } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../../../context";
import StudentRoute from "../../../components/routes/StudentRoute";
import { Button, Menu, Avatar } from "antd";
import ReactPlayer from 'react-player';
import ReactMarkdown from 'react-markdown';
import { PlayCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined, CheckCircleFilled, MinusCircleFilled } from '@ant-design/icons';
import AddPopupQuiz from "../../../components/forms/AddPopupQuiz";
const { Item } = Menu;
const SingleCourse = () => {
  const [clicked, setClicked] = useState(-1);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({ lessons: [] }); //course.lessons
  const [completedLessons, setCompletedLessons] = useState([]);
  const [showQuizPopup, setShowQuizPopup] = useState(false);

  //force state update
  const [updateState, setUpdateState] = useState(false);
  const router = useRouter();
  const { slug } = router.query;
  useEffect(() => {
    if (slug) loadCourse();

  }, [slug]);

  useEffect(() => {
    if (course) loadCompletedLessons();

  }, [course])
  const loadCourse = async () => {
    const { data } = await axios.get(`/api/user/course/${slug}`);
    setCourse(data);
  };

  const markCompleted = async () => {
    const { data } = await axios.post('/api/mark-completed', {
      courseId: course._id,
      lessonId: course.lessons[clicked]._id,
    });
    handleQuizPopup();
    console.log(data);
    setCompletedLessons([...completedLessons, course.lessons[clicked]._id]);
  };

  const loadCompletedLessons = async () => {
    const { data } = await axios.post(`/api/list-completed`, {
      courseId: course._id,
    });
    console.log("complted lessons ", data);
    setCompletedLessons(data);
  };

  const handleQuizPopup = () => {
    if (completedLessons.length >= 5) {
      // Show the quiz popup if the user has completed at least 5 lessons
      console.log(completedLessons);
      setShowQuizPopup(true);
      toast.success('Display pop Quiz');
    }
  };

  return (
    <StudentRoute>
      <AddPopupQuiz courseId={course._id}/>
      {showQuizPopup && (
        <AddPopupQuiz courseId={course._id} />
      )}
      <div className="site1">
        <div className="row">
          <div style={{ maxWidth: 320 }}>
            <Button onClick={() => setCollapsed(!collapsed)}
              className="text-primary mt-1 btn-block mb-2"
            >
              {
                createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)
              }
              {" "}
              {!collapsed && "Lessons"}
            </Button>
            <Menu
              defaultSelectedKeys={[clicked]}
              inlineCollapsed={collapsed}
              style={
                {
                  height: '80vh',
                  overflow: "hidden"
                }
              }
            >
              {
                course.lessons.map((lesson, index) => (
                  <Item onClick={() => setClicked(index)}
                    key={index} icon={<Avatar>{index + 1}</Avatar>}
                    style={{ padding: 2 }}
                  >
                    {
                      <>
                        {lesson.title.substring(0, 30)} {" "}
                        {
                          completedLessons.includes(lesson._id) ?
                            (
                              <CheckCircleFilled className="float-right text-primary ml-2"
                                style={{ marginTop: "13px" }}
                              />
                            ) : (
                              <MinusCircleFilled
                                className="float-right text-danger ml-2"
                                style={{ marginTop: "13px" }}
                              />
                            )
                        }
                      </>
                    }
                  </Item>
                ))
              }
            </Menu>
          </div>
          <div className="col">
            {clicked !== -1 ?
              (<>
                <div className="col alert alert-primary square">
                  <b>{course.lessons[clicked].title.substring(0, 30)}</b>
                </div>
                {
                  course.lessons[clicked].video && course.lessons[clicked].video.Location && (
                    <>
                      <div className="wrapper">
                        <ReactPlayer className="player" url={course.lessons[clicked].video.Location}
                          width="100%"
                          height="100%"
                          controls
                          onEnded={() => markCompleted()}
                        />
                      </div>
                    </>
                  )
                }
                <ReactMarkdown source={course.lessons[clicked].content}
                  className="single-post"
                />

              </>) :
              (<>
                <div className="d-flex justify-content-center p-5">
                  <div className="text-center p-5">
                    <PlayCircleOutlined className="text-primary display-1 p-5" />
                    <p className="lead">Click on the lessons to start learning</p>
                  </div>
                </div>
              </>)
            }
          </div>
        </div>
      </div>
    </StudentRoute>
  );
};

export default SingleCourse;
