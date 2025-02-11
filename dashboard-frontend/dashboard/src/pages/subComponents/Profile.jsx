import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6 mb-7">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Profile</h1>
              <p>Profile Preview</p>
            </div>
          </div>
          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label className="text-lg">Fullname</Label>
              <Input type="text" defaultValue={user.fullname} disabled />
            </div>
            <div className="grid gap-2">
              <Label className="text-lg">Email</Label>
              <Input type="text" defaultValue={user.email} disabled />
            </div>
            <div className="grid gap-2">
              <Label className="text-lg">Phone Number</Label>
              <Input type="text" defaultValue={user.number} disabled />
            </div>
            <div className="grid gap-2">
              <Label className="text-lg">About me</Label>
              <Textarea defaultValue={user.aboutme} disabled />
            </div>
            <div className="grid gap-2">
              <Label className="text-lg">Portfolio URL</Label>
              <Input type="text" defaultValue={user.portfolioURL} disabled />
            </div>
            <div className="grid gap-2">
              <Label className="text-lg">Github URL</Label>
              <Input type="text" defaultValue={user.githubURL} disabled />
            </div>
            <div className="grid gap-2">
              <Label className="text-lg">Instagram</Label>
              <Input type="text" defaultValue={user.instagramURL} disabled />
            </div>
            <div className="grid gap-2">
              <Label className="text-lg">LinkedIn</Label>
              <Input type="text" defaultValue={user.linkedinURL} disabled />
            </div>
            <div
              className="flex items-start lg:justify-between lg:items-center flex-col 
                lg:flex-row gap-5"
            >
              <div className="grid gap-2 w-full sm:w-72">
                <Label className="text-lg">Profile Image</Label>
                <img
                  src={user && user.profile_photo && user.profile_photo.url}
                  alt="Profile Picture"
                  className="w-full h-auto sm:w-72 rounded-2xl"
                />
              </div>
              <div className="grid gap-2 w-full sm:w-72">
                <Label className="text-lg">Resume</Label>
                <img
                  src={user && user.resume && user.resume.url}
                  alt="Resume"
                  className="w-full h-auto sm:w-72 rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
