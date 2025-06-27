import React, { useState } from "react";

const AccountTabs = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    login: { email: "", password: "" },
    signup: { fullName: "", email: "", password: "", confirmPassword: "" },
    forgot: { email: "" },
  });

  const [errors, setErrors] = useState({
    login: {},
    signup: {},
    forgot: {},
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState({
    login: false,
    signup: false,
    confirmPassword: false,
  });

  // Validation rules
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateName = (name) => {
    // Only letters, spaces, hyphens, apostrophes (2-50 chars)
    const nameRegex = /^[a-zA-Z\s\-']{2,50}$/;
    return nameRegex.test(name.trim());
  };

  const sanitizeInput = (input) => {
    // Basic XSS prevention - remove potentially dangerous characters
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/[<>'"]/g, "")
      .trim();
  };

  const validateForm = (tab) => {
    const newErrors = {};
    const data = formData[tab];

    switch (tab) {
      case "login":
        if (!data.email) {
          newErrors.email = "Email is required";
        } else if (!validateEmail(data.email)) {
          newErrors.email = "Please enter a valid email address";
        }

        if (!data.password) {
          newErrors.password = "Password is required";
        } else if (data.password.length < 6) {
          newErrors.password = "Password must be at least 6 characters";
        }
        break;

      case "signup":
        if (!data.fullName) {
          newErrors.fullName = "Full name is required";
        } else if (!validateName(data.fullName)) {
          newErrors.fullName =
            "Name must be 2-50 characters and contain only letters, spaces, hyphens, or apostrophes";
        }

        if (!data.email) {
          newErrors.email = "Email is required";
        } else if (!validateEmail(data.email)) {
          newErrors.email = "Please enter a valid email address";
        }

        if (!data.password) {
          newErrors.password = "Password is required";
        } else if (!validatePassword(data.password)) {
          newErrors.password =
            "Password must be at least 8 characters with uppercase, lowercase, number, and special character";
        }

        if (!data.confirmPassword) {
          newErrors.confirmPassword = "Please confirm your password";
        } else if (data.password !== data.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        }
        break;

      case "forgot":
        if (!data.email) {
          newErrors.email = "Email is required";
        } else if (!validateEmail(data.email)) {
          newErrors.email = "Please enter a valid email address";
        }
        break;
    }

    return newErrors;
  };

  const handleInputChange = (tab, field, value) => {
    // Sanitize input
    const sanitizedValue = sanitizeInput(value);

    setFormData((prev) => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [field]: sanitizedValue,
      },
    }));

    // Clear error for this field when user starts typing
    if (errors[tab][field]) {
      setErrors((prev) => ({
        ...prev,
        [tab]: {
          ...prev[tab],
          [field]: "",
        },
      }));
    }
  };

  const handleSubmit = async (tab) => {
    const formErrors = validateForm(tab);

    if (Object.keys(formErrors).length > 0) {
      setErrors((prev) => ({
        ...prev,
        [tab]: formErrors,
      }));
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log(`${tab} form submitted:`, formData[tab]);
      alert(
        `${
          tab.charAt(0).toUpperCase() + tab.slice(1)
        } form submitted successfully!`
      );

      // Clear form after successful submission
      if (tab === "login") {
        setFormData((prev) => ({
          ...prev,
          login: { email: "", password: "" },
        }));
      } else if (tab === "signup") {
        setFormData((prev) => ({
          ...prev,
          signup: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
          },
        }));
      } else if (tab === "forgot") {
        setFormData((prev) => ({ ...prev, forgot: { email: "" } }));
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const tabs = [
    { id: "login", label: "Login" },
    { id: "signup", label: "Sign Up" },
    { id: "forgot", label: "Forgot Password" },
  ];

  const inputStyle = (hasError) => ({
    width: "100%",
    padding: "0.875rem 1rem",
    border: `2px solid ${hasError ? "#dc3545" : "#e9ecef"}`,
    borderRadius: "8px",
    fontSize: "1rem",
    fontFamily: "inherit",
    background: "#ffffff",
    color: "black",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  });

  const errorStyle = {
    color: "#dc3545",
    fontSize: "0.875rem",
    marginTop: "0.25rem",
    marginBottom: "0.5rem",
  };

  const passwordInputContainer = {
    position: "relative",
    display: "flex",
    alignItems: "center",
  };

  const passwordToggleButton = {
    position: "absolute",
    right: "1rem",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "0.875rem",
    color: "#6c757d",
    zIndex: 1,
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "2rem auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      {/* Tab List */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          background: "#f8f9fa",
          borderBottom: "2px solid #e9ecef",
        }}
      >
        {tabs.map((tab) => (
          <li
            key={tab.id}
            style={{
              flex: 1,
              padding: "1rem 1.5rem",
              cursor: "pointer",
              background: activeTab === tab.id ? "#ffffff" : "transparent",
              border: "none",
              fontSize: "1rem",
              fontWeight: activeTab === tab.id ? "600" : "500",
              color: activeTab === tab.id ? "#007bff" : "#6c757d",
              textTransform: "capitalize",
              transition: "all 0.3s ease",
              position: "relative",
              borderBottom: activeTab === tab.id ? "3px solid #007bff" : "none",
            }}
            onClick={() => setActiveTab(tab.id)}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.target.style.background = "#e9ecef";
                e.target.style.color = "#495057";
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.target.style.background = "transparent";
                e.target.style.color = "#6c757d";
              }
            }}
          >
            {tab.label}
          </li>
        ))}
      </ul>

      {/* Login Tab Panel */}
      {activeTab === "login" && (
        <div
          style={{
            padding: "2rem",
            background: "#ffffff",
            animation: "fadeIn 0.3s ease-in-out",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={formData.login.email}
                onChange={(e) =>
                  handleInputChange("login", "email", e.target.value)
                }
                style={inputStyle(errors.login.email)}
                onFocus={(e) => {
                  if (!errors.login.email) {
                    e.target.style.borderColor = "#007bff";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(0, 123, 255, 0.1)";
                    e.target.style.background = "#f8f9ff";
                  }
                }}
                onBlur={(e) => {
                  if (!errors.login.email) {
                    e.target.style.borderColor = "#e9ecef";
                    e.target.style.boxShadow = "none";
                    e.target.style.background = "#ffffff";
                  }
                }}
              />
              {errors.login.email && (
                <div style={errorStyle}>{errors.login.email}</div>
              )}
            </div>

            <div>
              <div style={passwordInputContainer}>
                <input
                  type={showPassword.login ? "text" : "password"}
                  placeholder="Password"
                  value={formData.login.password}
                  onChange={(e) =>
                    handleInputChange("login", "password", e.target.value)
                  }
                  style={inputStyle(errors.login.password)}
                  onFocus={(e) => {
                    if (!errors.login.password) {
                      e.target.style.borderColor = "#007bff";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(0, 123, 255, 0.1)";
                      e.target.style.background = "#f8f9ff";
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.login.password) {
                      e.target.style.borderColor = "#e9ecef";
                      e.target.style.boxShadow = "none";
                      e.target.style.background = "#ffffff";
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("login")}
                  style={passwordToggleButton}
                >
                  {showPassword.login ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.login.password && (
                <div style={errorStyle}>{errors.login.password}</div>
              )}
            </div>

            <button
              onClick={() => handleSubmit("login")}
              disabled={isSubmitting}
              style={{
                background: isSubmitting
                  ? "#6c757d"
                  : "linear-gradient(135deg, #007bff, #0056b3)",
                color: "white",
                border: "none",
                padding: "0.875rem 1.5rem",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                marginTop: "0.5rem",
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.target.style.background =
                    "linear-gradient(135deg, #0056b3, #004085)";
                  e.target.style.transform = "translateY(-1px)";
                  e.target.style.boxShadow =
                    "0 4px 12px rgba(0, 123, 255, 0.3)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.target.style.background =
                    "linear-gradient(135deg, #007bff, #0056b3)";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }
              }}
            >
              {isSubmitting ? "Signing In..." : "Login"}
            </button>
          </div>
        </div>
      )}

      {/* Sign Up Tab Panel */}
      {activeTab === "signup" && (
        <div
          style={{
            padding: "2rem",
            background: "#ffffff",
            animation: "fadeIn 0.3s ease-in-out",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.signup.fullName}
                onChange={(e) =>
                  handleInputChange("signup", "fullName", e.target.value)
                }
                style={inputStyle(errors.signup.fullName)}
                onFocus={(e) => {
                  if (!errors.signup.fullName) {
                    e.target.style.borderColor = "#007bff";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(0, 123, 255, 0.1)";
                    e.target.style.background = "#f8f9ff";
                  }
                }}
                onBlur={(e) => {
                  if (!errors.signup.fullName) {
                    e.target.style.borderColor = "#e9ecef";
                    e.target.style.boxShadow = "none";
                    e.target.style.background = "#ffffff";
                  }
                }}
              />
              {errors.signup.fullName && (
                <div style={errorStyle}>{errors.signup.fullName}</div>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={formData.signup.email}
                onChange={(e) =>
                  handleInputChange("signup", "email", e.target.value)
                }
                style={inputStyle(errors.signup.email)}
                onFocus={(e) => {
                  if (!errors.signup.email) {
                    e.target.style.borderColor = "#007bff";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(0, 123, 255, 0.1)";
                    e.target.style.background = "#f8f9ff";
                  }
                }}
                onBlur={(e) => {
                  if (!errors.signup.email) {
                    e.target.style.borderColor = "#e9ecef";
                    e.target.style.boxShadow = "none";
                    e.target.style.background = "#ffffff";
                  }
                }}
              />
              {errors.signup.email && (
                <div style={errorStyle}>{errors.signup.email}</div>
              )}
            </div>

            <div>
              <div style={passwordInputContainer}>
                <input
                  type={showPassword.signup ? "text" : "password"}
                  placeholder="Password"
                  value={formData.signup.password}
                  onChange={(e) =>
                    handleInputChange("signup", "password", e.target.value)
                  }
                  style={inputStyle(errors.signup.password)}
                  onFocus={(e) => {
                    if (!errors.signup.password) {
                      e.target.style.borderColor = "#007bff";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(0, 123, 255, 0.1)";
                      e.target.style.background = "#f8f9ff";
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.signup.password) {
                      e.target.style.borderColor = "#e9ecef";
                      e.target.style.boxShadow = "none";
                      e.target.style.background = "#ffffff";
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("signup")}
                  style={passwordToggleButton}
                >
                  {showPassword.signup ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.signup.password && (
                <div style={errorStyle}>{errors.signup.password}</div>
              )}
            </div>

            <div>
              <div style={passwordInputContainer}>
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formData.signup.confirmPassword}
                  onChange={(e) =>
                    handleInputChange(
                      "signup",
                      "confirmPassword",
                      e.target.value
                    )
                  }
                  style={inputStyle(errors.signup.confirmPassword)}
                  onFocus={(e) => {
                    if (!errors.signup.confirmPassword) {
                      e.target.style.borderColor = "#007bff";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(0, 123, 255, 0.1)";
                      e.target.style.background = "#f8f9ff";
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.signup.confirmPassword) {
                      e.target.style.borderColor = "#e9ecef";
                      e.target.style.boxShadow = "none";
                      e.target.style.background = "#ffffff";
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  style={passwordToggleButton}
                >
                  {showPassword.confirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.signup.confirmPassword && (
                <div style={errorStyle}>{errors.signup.confirmPassword}</div>
              )}
            </div>

            <button
              onClick={() => handleSubmit("signup")}
              disabled={isSubmitting}
              style={{
                background: isSubmitting
                  ? "#6c757d"
                  : "linear-gradient(135deg, #007bff, #0056b3)",
                color: "white",
                border: "none",
                padding: "0.875rem 1.5rem",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                marginTop: "0.5rem",
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.target.style.background =
                    "linear-gradient(135deg, #0056b3, #004085)";
                  e.target.style.transform = "translateY(-1px)";
                  e.target.style.boxShadow =
                    "0 4px 12px rgba(0, 123, 255, 0.3)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.target.style.background =
                    "linear-gradient(135deg, #007bff, #0056b3)";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }
              }}
            >
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </button>
          </div>
        </div>
      )}

      {/* Forgot Password Tab Panel */}
      {activeTab === "forgot" && (
        <div
          style={{
            padding: "2rem",
            background: "#ffffff",
            animation: "fadeIn 0.3s ease-in-out",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={formData.forgot.email}
                onChange={(e) =>
                  handleInputChange("forgot", "email", e.target.value)
                }
                style={inputStyle(errors.forgot.email)}
                onFocus={(e) => {
                  if (!errors.forgot.email) {
                    e.target.style.borderColor = "#007bff";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(0, 123, 255, 0.1)";
                    e.target.style.background = "#f8f9ff";
                  }
                }}
                onBlur={(e) => {
                  if (!errors.forgot.email) {
                    e.target.style.borderColor = "#e9ecef";
                    e.target.style.boxShadow = "none";
                    e.target.style.background = "#ffffff";
                  }
                }}
              />
              {errors.forgot.email && (
                <div style={errorStyle}>{errors.forgot.email}</div>
              )}
            </div>

            <button
              onClick={() => handleSubmit("forgot")}
              disabled={isSubmitting}
              style={{
                background: isSubmitting
                  ? "#6c757d"
                  : "linear-gradient(135deg, #007bff, #0056b3)",
                color: "white",
                border: "none",
                padding: "0.875rem 1.5rem",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                marginTop: "0.5rem",
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.target.style.background =
                    "linear-gradient(135deg, #0056b3, #004085)";
                  e.target.style.transform = "translateY(-1px)";
                  e.target.style.boxShadow =
                    "0 4px 12px rgba(0, 123, 255, 0.3)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.target.style.background =
                    "linear-gradient(135deg, #007bff, #0056b3)";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }
              }}
            >
              {isSubmitting ? "Sending Reset Link..." : "Reset Password"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountTabs;
