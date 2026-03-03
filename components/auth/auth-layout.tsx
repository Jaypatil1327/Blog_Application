"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import LoginForm from "./login";
import RegisterForm from "./register";

export type RegisterFormProps = {
  onSuccess: () => void;
};
function AuthTab() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  function onSuccess() {
    setActiveTab("login");
  }
  function changeTab(val: any) {
    setActiveTab(val);
  }
  return (
    <div className="p-4 md:w-120 w-90 min-h-70 rounded-2xl border-2 shadow-lg flex flex-col justify-start items-center gap-10">
      <h1 className="text-center text-3xl font-bold text-shadow-md mt-3">
        Welcome!
      </h1>
      <Tabs value={activeTab} onValueChange={changeTab} className="w-full">
        <TabsList className="w-full flex justify-center items-center">
          <TabsTrigger value="login" className="text-center">
            Login
          </TabsTrigger>
          <TabsTrigger value="register" className="text-center">
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm></LoginForm>
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm onSuccess={onSuccess}></RegisterForm>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AuthTab;
