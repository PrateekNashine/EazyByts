import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  clearAllProjectErrors,
  getAllProject,
  resetProjectSlice,
  updateProject,
} from "@/store/slices/projectSlices";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingButton from "./subComponents/LoadingButton";
import { Button } from "@/components/ui/button";

const UpdateProject = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");
  const [project_shots, setProject_shots] = useState("");
  const [project_shotsPreview, setProject_shotsPreview] = useState("");

  const { error, message, loading } = useSelector((state) => state.project);

  const dispatch = useDispatch();
  const navigateTo= useNavigate();
  const { id } = useParams();

  const projectBannerHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProject_shots(file);
      setProject_shotsPreview(reader.result);
    };
  };

  useEffect(() => {
    const getProject = async () => {
      await axios
        .get(`http://localhost:4000/api/project/get/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setTitle(res.data.project.title);
          setDescription(res.data.project.description);
          setProjectLink(res.data.project.projectLink);
          setGithubLink(res.data.project.githubLink);
          setTechnologies(res.data.project.technologies);
          setStack(res.data.project.stack);
          setDeployed(res.data.project.deployed);
          setProject_shots(
            res.data.project.project_shots && res.data.project.project_shots.url
          );
          setProject_shotsPreview(
            res.data.project.project_shots && res.data.project.project_shots.url
          );
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };

    getProject();

    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProject());
      navigateTo("/manage/projects")
    }
  }, [id, message, loading, error]);

  const updateProjectHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("projectLink", projectLink);
    formData.append("githubLink", githubLink);
    formData.append("technologies", technologies);
    formData.append("stack", stack);
    formData.append("deployed", deployed);
    formData.append("project_shots", project_shots);
    dispatch(updateProject(id, formData));
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
        <form
          action=""
          className="w-[100%] px-5 md:w-[1000px]"
          onSubmit={updateProjectHandler}
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
            <div className="flex justify-between items-center">
              <h2 className="font-bold leading-7 text-gray-900 text-3xl text-center">
                Update Project
              </h2>
              <Link to={"/"}>
                <Button> Return to Dashboard</Button>
              </Link>
            </div>
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <img
                    src={
                      project_shotsPreview ? project_shotsPreview : "./vite.svg"
                    }
                    alt="Project Banner"
                    className="w-full h-auto"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      onChange={projectBannerHandler}
                      className="profilePhoto-update-btn mt-2 w-full"
                    />
                  </div>
                </div>
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900 text-lg">
                    Project Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm  px-3">
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 
                        placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900 text-lg">
                    Project Description
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm  px-3">
                      <Textarea
                        type="text"
                        placeholder="Eg. Project Feature 1. Project Feature 2..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 
                        placeholder:text-gray-400 focus: ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900 text-lg">
                    Project Link
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm  px-3">
                      <input
                        type="text"
                        placeholder="Project Link"
                        value={projectLink}
                        onChange={(e) => setProjectLink(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 
                        placeholder:text-gray-400 focus: ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900 text-lg">
                    Github Link
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm  px-3">
                      <input
                        type="text"
                        placeholder="Github Link"
                        value={githubLink}
                        onChange={(e) => setGithubLink(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 
                        placeholder:text-gray-400 focus: ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900 text-lg">
                    Technologies
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm  px-3">
                      <input
                        type="text"
                        placeholder="Eg. Node.js, Express, HTML, CSS"
                        value={technologies}
                        onChange={(e) => setTechnologies(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 
                        placeholder:text-gray-400 focus: ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900 text-lg">
                    Stack
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm  px-3">
                      <Select
                        value={stack}
                        onValueChange={(selectedValue) =>
                          setStack(selectedValue)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select project stack" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ruby">Ruby</SelectItem>
                          <SelectItem value="Python">Python</SelectItem>
                          <SelectItem value="Java">Java</SelectItem>
                          <SelectItem value="C/C++">C/C++</SelectItem>
                          <SelectItem value="Full Stack">Full Stack</SelectItem>
                          <SelectItem value="MERN Stack">MERN Stack</SelectItem>
                          <SelectItem value="MEAN Stack">MEAN Stack</SelectItem>
                          <SelectItem value="MEVN Stack">MEVN Stack</SelectItem>
                          <SelectItem value="NEXT.js">NEXT.js</SelectItem>
                          <SelectItem value="REACT.js">REACT.js</SelectItem>
                          <SelectItem value="HTML, CSS, JavaScript">
                            HTML, CSS, JavaScript
                          </SelectItem>
                          <SelectItem value="Others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900 text-lg">
                    Deployed
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm  px-3">
                      <Select
                        value={deployed}
                        onValueChange={(selectedValue) =>
                          setDeployed(selectedValue)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Project Deployed?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-content-center w-full items-center">
            {loading ? (
              <LoadingButton content={"Updating..."} width={"w-52"}/>
            ) : (
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium 
                rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 
                focus:outline-none dark:focus:ring-blue-800 w-52"
                onClick={updateProjectHandler}
              >
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProject;
