import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "./LoadingButton";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImageUp } from "lucide-react";
import {
  addNewProject,
  clearAllProjectErrors,
  getAllProject,
  resetProjectSlice,
} from "@/store/slices/projectSlices";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");
  const [project_shots, setProject_shots] = useState("");
  const [project_shotsPreview, setProject_shotsPreview] = useState("");

  const { loading, error, message } = useSelector((state) => state.project);

  const project_shotHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProject_shots(file);
      setProject_shotsPreview(reader.result);
    };
  };

  const dispatch = useDispatch();

  const newProjectHandler = (e) => {
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
    dispatch(addNewProject(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProject());
    }
  }, [dispatch, error, loading, message]);
  return (
    <>
      <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
        <form
          action=""
          className="w-[100%] px-5 md:w-[1000px]"
          onSubmit={newProjectHandler}
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">
                Add New Project
              </h2>
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <Label className="block text-sm font-medium leading-6 text-gray-900 text-lg">
                    Project Title
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm  px-3">
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 
                        placeholder:text-gray-400 focus: ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full sm:col-span-4">
                  <Label className="block text-sm font-medium leading-6 text-gray-900 text-lg">
                    Project Description
                  </Label>
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
                  <Label className="block text-sm font-medium leading-6 text-gray-900 text-lg">
                    Project Link
                  </Label>
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
                  <Label className="block text-sm font-medium leading-6 text-gray-900 text-lg">
                    Github Link
                  </Label>
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
                  <Label className="block text-sm font-medium leading-6 text-gray-900 text-lg">
                    Technologies
                  </Label>
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
                  <Label className="block text-sm font-medium leading-6 text-gray-900 text-lg">
                    Stack
                  </Label>
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
                  <Label className="block text-sm font-medium leading-6 text-gray-900 text-lg">
                    Deployed
                  </Label>
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

                <div className="col-span-full">
                  <label className="block text-lg font-medium text-gray-900">
                    Project Banner
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      {project_shotsPreview ? (
                        <img
                          src={
                            project_shotsPreview
                              ? `${project_shotsPreview}`
                              : "./vite.svg"
                          }
                          alt="svg"
                          className="mx-auto h-[250px] w-full text-gray-300"
                          viewbox="0 0 24 24"
                        />
                      ) : (
                        <ImageUp
                          aria-hidden="true"
                          className="mx-auto size-12 text-gray-300"
                        />
                      )}
                      <div className="mt-4 flex text-sm/6 text-gray-600">
                        <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500">
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={project_shotHandler}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <LoadingButton content={"Adding"} />
            ) : (
              <Button type="submit" className="w-full">
                Add Project
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProject;
