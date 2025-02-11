import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [project, setProject] = useState([]);

  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    const getProjects = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/project/viewall",
        { withCredentials: true }
      );
      setProject(data.projects);
    };
    getProjects();
  });
  return (
    <>
      <div>
        <div className="relative mb-10">
          <h1
            className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] mx-auto
          w-fit font-extrabold"
            style={{ background: "hsl(222.2 84% 4.9%)" }}
          >
            Projects
          </h1>
          <h1
            className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] mx-auto
          w-fit font-extrabold"
            style={{ background: "hsl(222.2 84% 4.9%)" }}
          >
            Projects
          </h1>
          <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {viewAll
            ? project &&
              project.map((element) => {
                return (
                  <Link to={`/project/get/${element._id}`} key={element._id}>
                    <img
                      src={element.project_shots && element.project_shots.url}
                      alt="Project Banner"
                    />
                  </Link>
                );
              })
            : project &&
              project.slice(0, 9).map((element) => {
                return (
                  <Link to={`/project/get/${element._id}`} key={element._id}>
                    <img
                      src={element.project_shots && element.project_shots.url}
                      alt="Project Banner"
                    />
                  </Link>
                );
              })}
          <div>
            {project && project.length > 9 && (
              <div className="w-full text-center my-9">
                <Button
                  className="w-52"
                  onClick={() => setViewAll(!viewAll)}
                >
                  {viewAll ? "Show less": "Show More"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
