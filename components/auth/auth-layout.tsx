"use client";

import { useState } from "react";
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

  return (
    <div className="auth-page-wrapper">
      {/* Animated background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* 3D Card */}
      <div className="auth-card">
        {/* Glowing top border */}
        <div className="card-glow-bar" />

        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="url(#logoGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#818cf8" />
                  <stop offset="1" stopColor="#c084fc" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account or create a new one</p>
        </div>

        {/* Tab switcher */}
        <div className="tab-switcher">
          <button
            className={`tab-btn ${activeTab === "login" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("login")}
            id="tab-login"
          >
            Login
          </button>
          <button
            className={`tab-btn ${activeTab === "register" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("register")}
            id="tab-register"
          >
            Register
          </button>
          {/* Sliding indicator */}
          <div className={`tab-indicator ${activeTab === "register" ? "tab-indicator-right" : ""}`} />
        </div>

        {/* Form area */}
        <div className="form-area">
          <div className={`form-slide ${activeTab === "login" ? "form-visible" : "form-hidden-left"}`}>
            <LoginForm />
          </div>
          <div className={`form-slide ${activeTab === "register" ? "form-visible" : "form-hidden-right"}`}>
            <RegisterForm onSuccess={onSuccess} />
          </div>
        </div>

        {/* Footer */}
        <p className="auth-footer">
          {activeTab === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button className="auth-link" onClick={() => setActiveTab("register")}>
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button className="auth-link" onClick={() => setActiveTab("login")}>
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default AuthTab;
