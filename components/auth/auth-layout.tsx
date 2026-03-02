"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import LoginForm from "./login";
import RegisterForm from "./register";

function AuthTab() {
  return (
    <div className="p-4 md:w-120 w-90 min-h-70 rounded-2xl border-2 shadow-lg flex flex-col justify-start items-center gap-10">
      <h1 className="text-center text-3xl font-bold text-shadow-md mt-3">
        Welcome!
      </h1>
      <Tabs defaultValue="login" className="w-full">
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
          <RegisterForm></RegisterForm>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AuthTab;
