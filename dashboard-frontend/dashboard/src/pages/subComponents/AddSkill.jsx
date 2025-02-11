import {
  addNewSkill,
  clearAllSkillsError,
  getAllSkills,
  resetSkillsSlice,
} from "@/store/slices/skillSlices";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingButton from "./LoadingButton";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUp } from "lucide-react";

const AddSkill = () => {
  const [title, setTitle] = useState();
  const [proficiency, setProficiency] = useState();
  const [svg, setSvg] = useState();
  const [svgPreview, setSvgPreview] = useState();

  const svgHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSvg(file);
      setSvgPreview(reader.result);
    };
  };

  const { loading, error, message } = useSelector((state) => state.skill);
  const dispatch = useDispatch();

  const newSkillHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("proficiency", proficiency);
    formData.append("svg", svg);
    dispatch(addNewSkill(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillsError());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillsSlice());
      dispatch(getAllSkills());
    }
  }, [dispatch, loading, error]);
  return (
    <>
      <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
        <form
          action=""
          className="w-[100%] px-5 md:w-[650px]"
          onSubmit={newSkillHandler}
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">
                Add New Skill
              </h2>
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <Label className="block text-sm font-medium leading-6 text-gray-900 text-lg">
                    Skill Title
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm  px-3">
                      <input
                        type="text"
                        placeholder="Skill Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 
                        placeholder:text-gray-400 focus: ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full sm:col-span-4">
                  <Label className="block font-medium leading-6 text-gray-900 text-lg">
                    Proficiency
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm  px-3 ">
                      <input
                        type="number"
                        placeholder="Proficiency"
                        value={proficiency}
                        onChange={(e) => setProficiency(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 
                        placeholder:text-gray-400 focus: ring-0 sm:text-sm sm:leading-6 "
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label className="block text-lg font-medium text-gray-900">
                    Skill Svg
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      {svgPreview ? (
                        <img
                          src={svgPreview ? `${svgPreview}` : './vite.svg'}
                          alt="svg"
                          className="mx-auto h-12 w-12 text-gray-300"
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
                            onChange={svgHandler}
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
                Add Skill
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddSkill;
