import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  clearAllSkillsError,
  deleteSkill,
  getAllSkills,
  resetSkillsSlice,
  updateSkill,
} from "@/store/slices/skillSlices";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ManageSkills = () => {
  const { loading, skills, message, error } = useSelector(
    (state) => state.skill
  );
  const dispatch = useDispatch();
  const [newProficiency, setNewProficiency] = useState("");

  const inputChangeHandler = (proficiency) => {
    setNewProficiency(proficiency);
  };

  const updateSkillHandler = (id) => {
    dispatch(updateSkill(id, newProficiency));
  };

  const deleteSkillHandler = (id) => {
    dispatch(deleteSkill(id));
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
  }, [dispatch, error, message, loading]);
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Tabs>
          <TabsContent>
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle>Manage Skills</CardTitle>
                <Link to={"/"}>
                  <Button className="w-fit">Return to Dashboard</Button>
                </Link>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                {skills && skills.length > 0 ? (
                  skills.map((element) => {
                    return (
                      <Card key={element._id}>
                        <CardHeader className="text-3xl font-bold items-center justify-between flex-row">
                          {element.title}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Trash2
                                  className="h-5 w-5 hover:text-red-600"
                                  onClick={() =>
                                    deleteSkillHandler(element._id)
                                  }
                                />
                              </TooltipTrigger>
                              <TooltipContent
                                side="right"
                                style={{ color: "red" }}
                              >
                                Delete
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </CardHeader>
                        <CardFooter>
                          <Label className="text-2xl mr-2">Proficiency</Label>
                          <Input
                            type="number"
                            defaultValue={element.proficiency}
                            onChange={(e) =>
                              inputChangeHandler(e.target.value)
                            }
                            onBlur={() => updateSkillHandler(element._id)}
                          />
                        </CardFooter>
                      </Card>
                    );
                  })
                ) : (
                  <CardTitle className="text-3xl overflow-y-hidden">
                    No Skills Found
                  </CardTitle>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ManageSkills;
