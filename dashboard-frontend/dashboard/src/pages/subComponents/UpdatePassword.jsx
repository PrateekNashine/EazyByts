import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingButton from "./LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { clearAllUserError, getUser, resetProfile, updatePassword } from "@/store/slices/userSlices";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, error, message, isUpdated } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const updatePasswordHandler = () => {
    dispatch(updatePassword(currentPassword, newPassword, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserError());
    }
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, loading, error, isUpdated]);
  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6 mb-7">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Update Password</h1>
              <p>Update your password</p>
            </div>
          </div>
          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label className="text-lg">Current Password</Label>
              <Input
                type="text"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-lg">New Password</Label>
              <Input
                type="text"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-lg">Confirm Password</Label>
              <Input
                type="text"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              {!loading ? (
                <Button className="w-full" onClick={updatePasswordHandler}>
                  Change Password
                </Button>
              ) : (
                <LoadingButton content={"Saving..."} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
