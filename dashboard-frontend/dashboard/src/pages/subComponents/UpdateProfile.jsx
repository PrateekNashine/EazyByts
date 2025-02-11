import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoadingButton from "./LoadingButton";
import {
  clearAllUserError,
  getUser,
  resetProfile,
  updateProfile,
} from "@/store/slices/userSlices";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const { user, loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );
  const [fullname, setFullname] = useState(user && user.fullname);
  const [email, setEmail] = useState(user && user.email);
  const [number, settNumber] = useState(user && user.number);
  const [aboutme, setAboutme] = useState(user && user.aboutme);
  const [portfolioURL, setPortfolioURL] = useState(
    user && (user.portfolioURL === "undefined" ? "" : user.portfolioURL)
  );
  const [githubURL, setGithubURL] = useState(
    user && (user.githubURL === "undefined" ? "" : user.githubURL)
  );
  const [instagramURL, setInstagramURL] = useState(
    user && (user.instagramURL === "undefined" ? "" : user.instagramURL)
  );
  const [linkedinURL, setLinkedinURL] = useState(
    user && (user.linkedinURL === "undefined" ? "" : user.linkedinURL)
  );
  const [profile_photo, setProfile_photo] = useState(
    user && user.profile_photo && user.profile_photo.url
  );
  const [profile_photoPreview, setProfile_photoPreview] = useState(
    user && user.profile_photo && user.profile_photo.url
  );
  const [resume, setResume] = useState(user && user.resume && user.resume.url);
  const [resumePreview, setResumePreview] = useState(
    user && user.resume && user.resume.url
  );

  const dispatch = useDispatch();

  const photoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfile_photoPreview(reader.result);
      setProfile_photo(file);
    };
  };

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  const updateHandler = () => {
    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("number", number);
    formData.append("aboutme", aboutme);
    formData.append("portfolioURL", portfolioURL);
    formData.append("githubURL", githubURL);
    formData.append("instagramURL", instagramURL);
    formData.append("linkedinURL", linkedinURL);
    formData.append("resume", resume);
    formData.append("profile_photo", profile_photo);

    dispatch(updateProfile(formData));
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
    if(message){
        toast.success(message)
    }
  }, [dispatch, loading, error, isUpdated]);

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6 mb-7">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Update Profile</h1>
              <p>Update your Profile</p>
            </div>
          </div>
          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label className="text-lg">Fullname</Label>
              <Input
                type="text"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-lg">Email</Label>
              <Input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-lg">Phone Number</Label>
              <Input
                type="text"
                placeholder="Phone Number"
                value={number}
                onChange={(e) => settNumber(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-lg">About me</Label>
              <Textarea
                placeholder="About Me"
                value={aboutme}
                onChange={(e) => setAboutme(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-lg">Portfolio URL</Label>
              <Input
                type="text"
                placeholder="Portfolio Url"
                value={portfolioURL}
                onChange={(e) => setPortfolioURL(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-lg">Github URL</Label>
              <Input
                type="text"
                placeholder="Github Url"
                value={githubURL}
                onChange={(e) => setGithubURL(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-lg">Instagram</Label>
              <Input
                type="text"
                placeholder="Instagram Url"
                value={instagramURL}
                onChange={(e) => setInstagramURL(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-lg">LinkedIn</Label>
              <Input
                type="text"
                placeholder="Linkedin Url"
                value={linkedinURL}
                onChange={(e) => setLinkedinURL(e.target.value)}
              />
            </div>
            <div
              className="flex items-start lg:justify-between lg:items-center flex-col 
                    lg:flex-row gap-5"
            >
              <div className="grid gap-2 w-full sm:w-72">
                <Label className="text-lg">Profile Image</Label>
                <img
                  src={
                    profile_photoPreview
                      ? `${profile_photoPreview}`
                      : `./vite.svg`
                  }
                  alt="Profile Picture"
                  className="w-full h-auto sm:w-72 rounded-2xl"
                />
                <div className="relative">
                  <input
                    type="file"
                    className="profilePhoto-update-btn"
                    onChange={photoHandler}
                  />
                </div>
              </div>
              <div className="grid gap-2 w-full sm:w-72">
                <Label className="text-lg">Resume</Label>
                <Link
                  to={user && user.resume && user.resume.url}
                  target="_blank"
                >
                  <img
                    src={resumePreview ? `${resumePreview}` : `./vite.svg`}
                    alt="Resume"
                    className="w-full h-auto sm:w-72 rounded-2xl"
                  />
                </Link>
                <div className="relative">
                  <input
                    type="file"
                    className="profilePhoto-update-btn"
                    onChange={resumeHandler}
                  />
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              {!loading ? (
                <Button className="w-full" onClick={updateHandler}>Save</Button>
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

export default UpdateProfile;
