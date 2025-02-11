import {
  Calendar1,
  CircleUserRound,
  FolderOpenDot,
  GalleryVerticalEnd,
  House,
  LogOut,
  MessageSquareMore,
  Microchip,
  Package2,
  PanelLeft,
} from "lucide-react";
import { clearAllUserError, logout } from "@/store/slices/userSlices";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Dashboard from "./subComponents/Dashboard";
import AddProject from "./subComponents/AddProject";
import AddSkill from "./subComponents/AddSkill";
import AddTimeline from "./subComponents/AddTimeline";
import Messages from "./subComponents/Messages";
import Account from "./subComponents/Account";

const Homepage = () => {
  const [active, setActive] = useState("Dashboard");
  const { isAuthenticated, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    toast.success("Logged out");
  };

  const navigateTo = useNavigate();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserError());
    }
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside
          className="fixed inset-y-0 left-0 hidden w-14 flex-col border-r bg-background sm:flex 
        z-50"
        >
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link className="group flex h-p w-p shrink-0 items-center justify-center gap-2 rounded-full">
              <GalleryVerticalEnd className="h-5.5 w-5.5 transition-all group-hover:scale-110" />
              <span className="sr-only">Dashboard</span>
            </Link>
            {/* Dashboard */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Dashboard"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive("Dashboard")}
                  >
                    <House className="w-5.5 h-5.5 " />
                    <span className="sr-only">Dashboard</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="font-bold">
                  Dashboard
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* Add Project */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Add Project"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive("Add Project")}
                  >
                    <FolderOpenDot className="w-5.5 h-5.5" />
                    <span className="sr-only">Add Project</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="font-bold">
                  Add Project
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* Add Skills */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Add Skills"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive("Add Skills")}
                  >
                    <Microchip className="w-5.5 h-5.5" />
                    <span className="sr-only">Add Skills</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="font-bold">
                  Add Skills
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* Add Timeline */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Add Timeline"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive("Add Timeline")}
                  >
                    <Calendar1 className="w-5.5 h-5.5" />
                    <span className="sr-only">Add Timeline</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="font-bold">
                  Add Timeline
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* Messages */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Messages"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive("Messages")}
                  >
                    <MessageSquareMore className="w-5.5 h-5.5" />
                    <span className="sr-only">Messages</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="font-bold">
                  Messages
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* Account */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Account"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive("Account")}
                  >
                    <CircleUserRound className="w-5.5 h-5.5" />
                    <span className="sr-only">Account</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="font-bold">
                  Account
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
          <nav className="mt-auto flex-col items-center gap-4 px-2 py-4">
            {/* Logout */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === "Logout"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={logoutHandler}
                  >
                    <LogOut className="w-5.5 h-5.5" />
                    <span className="sr-only">Logout</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="font-bold">
                  Logout
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </aside>
        <header
          className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 
          sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 max-[900px]:h-[100px]"
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggetl Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  className="group flex h-10 w-10 shrink=0 items-center justify-center gap-2 
                  rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className=" h-5 w-5 transition-all group-hover:scale-110" />
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Dashboard"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Dashboard")}
                >
                  <House className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Add Project"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Add Project")}
                >
                  <FolderOpenDot className="w-5 h-5" />
                  Add Project
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Add Skill"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Add Skill")}
                >
                  <Microchip className="w-5 h-5" />
                  Add Skill
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Add Timeline"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Add Timeline")}
                >
                  <Calendar1 className="w-5 h-5" />
                  Add Timeline
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Messages"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Messages")}
                >
                  <MessageSquareMore className="w-5 h-5" />
                  Messages
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Account"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Account")}
                >
                  <CircleUserRound className="w-5 h-5" />
                  Account
                </Link>
                <Link
                  className={`flex items-center gap-4 px-2.5 text-muted-foreground 
                    hover:text-foreground`}
                  onClick={logoutHandler}
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-4 md:grow-0 sm:ml-16 sm:mt-5">
            <img
              src={user && user.profile_photo && user.profile_photo.url}
              alt="Profile Photo"
              className="w-20 h-20 rounded-full max-[900px]:hidden"
            />
            <h1 className="text-4xl max-[900px]:text-2xl">
              Welcome, {user.fullname}
            </h1>
          </div>
        </header>
        {(() => {
          switch (active) {
            case "Dashboard":
              return <Dashboard />;
              break;
            case "Add Project":
              return <AddProject />;
              break;
            case "Add Skills":
              return <AddSkill />;
              break;
            case "Add Timeline":
              return <AddTimeline />;
              break;
            case "Messages":
              return <Messages />;
              break;
            case "Account":
              return <Account />;
              break;

            default:
              return <Dashboard />;
              break;
          }
        })()}
      </div>
    </>
  );
};

export default Homepage;
