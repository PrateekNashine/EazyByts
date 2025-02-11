import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProjectView = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");
  const [project_shots, setProject_shots] = useState("");

  const { id } = useParams();

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
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };

    getProject();
  }, [id]);

  const descriptionPointers = description.split(". ");
  const technologiesPointers = technologies.split(", ");

  return (
    <>
      <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
        <div className="w-[100%] px-5 md:w-[1000px]">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <h1 className="text-2xl font-bold mb-4">{title}</h1>
                  <img
                    src={project_shots ? project_shots : "./vite.svg"}
                    alt="Project Banner"
                    className="w-full h-auto"
                  />
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl font-bold mb-2">Features:</p>
                  <ul className="list-disc">
                    {descriptionPointers.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                  </ul>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl font-bold mb-2">Technologies:</p>
                  <ul className="list-disc">
                    {technologiesPointers.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                  </ul>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl font-bold mb-2">Stack:</p>
                  <p>{stack}</p>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl font-bold mb-2">Deployed:</p>
                  <p>{deployed}</p>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl font-bold mb-2">Github Link</p>
                  <Link
                    to={githubLink}
                    target="_blank"
                    className="text-sky-700"
                  >
                    {githubLink}
                  </Link>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl font-bold mb-2">Project Link</p>
                  <Link
                    to={projectLink ? projectLink: "/"}
                    target="_blank"
                    className="text-sky-700"
                  >
                    {projectLink ? projectLink: "Not Deployed"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectView;
