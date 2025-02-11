import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import LoadingButton from "./LoadingButton";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addTimeline, clearAllTimelineErrors, getAllTimelines, resetTimelineSlice } from "@/store/slices/timelineSlices";
import { toast } from "react-toastify";

const AddTimeline = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const { loading, message, error } = useSelector((state) => state.timelines);

  const dispatch = useDispatch();

  const addTimelineHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("from", from);
    formData.append("to", to);
    dispatch(addTimeline(formData));
  };

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if(message){
      toast.success(message)
      dispatch(resetTimelineSlice())
      dispatch(getAllTimelines())
    }
  }, [dispatch, error, message, loading]);

  return (
    <>
      <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
        <form action="" className="w-[100%] px-5 md:w-[650px]" onSubmit={addTimelineHandler}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">
                Add New Timeline
              </h2>
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <Label className="block text-sm font-medium leading-6 text-gray-900 text-lg">
                    Title
                  </Label>
                  <div className="mt-2">
                    <div
                      className="flex rounded-md shadow-sm  px-3"
                    >
                      <input
                        type="text"
                        placeholder="E.g  Matriculation"
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
                    Description
                  </Label>
                  <div className="mt-2">
                    <div
                      className="flex rounded-md shadow-sm  px-3"
                    >
                      <Textarea
                        placeholder="Description"
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
                    From
                  </Label>
                  <div className="mt-2">
                    <div
                      className="flex rounded-md shadow-sm px-3"
                    >
                      <input
                        type="date"
                        placeholder="Start"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 
                        placeholder:text-gray-400 focus: ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full sm:col-span-4">
                  <Label className="block text-sm font-medium leading-6 text-gray-900 text-lg">
                    To
                  </Label>
                  <div className="mt-2">
                    <div
                      className="flex rounded-md shadow-sm  px-3"
                    >
                      <input
                        type="date"
                        placeholder="End"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 
                        placeholder:text-gray-400 focus: ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {loading ? (
              <LoadingButton content={"Adding"} />
            ) : (
              <Button type="submit" className="w-full">
                Add Timeline
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTimeline;
