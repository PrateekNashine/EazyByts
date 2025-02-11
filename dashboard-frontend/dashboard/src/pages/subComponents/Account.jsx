import React, { useState } from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";

const Account = () => {
  const [selectedComponent, setSelectedComponent] = useState("Profile");
  return (
    <>
      <div>
        <main className="bg-muted/40 flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
          <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">Settings</h1>
          </div>
          <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
            <nav className="text-muted-foreground grid gap-4 text-sm">
              <Link
                href="##"
                onClick={()=>setSelectedComponent("Profile")}
                className={
                  selectedComponent === "Profile"
                    ? "font-semibold text-primary"
                    : ""
                }
              >
                Profile
              </Link>
              <Link
                href="##"
                onClick={()=>setSelectedComponent("Update Password")}
                className={
                  selectedComponent === "Update Password"
                    ? "font-semibold text-primary"
                    : ""
                }
              >
                Update Password
              </Link>
              <Link
                href="##"
                onClick={()=>setSelectedComponent("Update Profile")}
                className={
                  selectedComponent === "Update Profile"
                    ? "font-semibold text-primary"
                    : ""
                }
              >
                Update Profile
              </Link>
            </nav>
            <div className="grid gap-6">
              
              {(() => {
                switch (selectedComponent) {
                  case "Profile":
                    return <Profile/>
                    break;
                  case "Update Profile":
                    return <UpdateProfile/>
                    break;
                  case "Update Password":
                    return <UpdatePassword/>
                    break;
                
                  default:
                    break;
                }

              })()}
            
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Account;
