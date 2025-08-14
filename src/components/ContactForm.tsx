import React, { useState, useEffect } from "react";
import Card from "./ui/Card";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import Button from "./ui/Button";
import { Animate, Grid, Stack } from "./ui";
import { CheckCircle, X } from "lucide-react";
import Image from "next/image";

interface FormField {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  rows?: number;
}

interface ContactFormProps {
  className?: string;
  formName?: string;
  title?: string;
  description?: string;
  showCard?: boolean;
  showAnimation?: boolean;
  animationType?: "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "fade";
  animationDuration?: number;
  animationDelay?: number;
  submitButtonText?: string;
  submitButtonLoadingText?: string;
  successMessage?: string;
  errorMessage?: string;
  fields?: {
    name?: Partial<FormField>;
    email?: Partial<FormField>;
    message?: Partial<FormField>;
  };
  layout?: "grid" | "stack";
  onSuccess?: (formData: ContactFormData) => void;
  onError?: (error: Error, formData: ContactFormData) => void;
  onSubmitStart?: (formData: ContactFormData) => void;
  customEndpoint?: string;
  showSuccessMessage?: boolean;
  showErrorMessage?: boolean;
  resetOnSuccess?: boolean;
  disabled?: boolean;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface SubmissionState {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
}

// Success Overlay Component
interface SuccessOverlayProps {
  message: string;
  onDismiss: () => void;
  isVisible: boolean;
}

const SuccessOverlay: React.FC<SuccessOverlayProps> = ({
  message,
  onDismiss,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 bg-dark-card/95 backdrop-blur-sm rounded-lg border border-white/10 z-10 success-overlay-enter">
      <div className="flex items-center justify-center h-full p-6">
        <div className="text-center max-w-md success-content-enter">
          <div className="flex justify-center mb-4">
            <Image
              src="/emojis/rocket.gif"
              alt="Rocket launching"
              width={120}
              height={120}
              priority
              style={{ display: "inline-block" }}
            />
          </div>
          {/* Success Message */}
          <h3 className="text-xl font-semibold text-white mb-3">Thank you!</h3>
          <p className="text-gray-400 mb-6 leading-relaxed">{message}</p>

          {/* Dismiss Button */}
          <Button variant="primary" size="md" onClick={onDismiss} icon={X}>
            Dismiss
          </Button>
        </div>
      </div>
    </div>
  );
};

const ContactForm: React.FC<ContactFormProps> = ({
  className,
  formName = "contact-form",
  title,
  description,
  showCard = true,
  showAnimation = true,
  animationType = "slideUp",
  animationDuration = 0.8,
  animationDelay = 0.2,
  submitButtonText = "Send",
  submitButtonLoadingText = "Sending...",
  successMessage = "Your message has been sent. I'll get back to you soon!",
  errorMessage = "Sorry, there was an error sending your message. Please try again.",
  fields = {},
  layout = "grid",
  onSuccess,
  onError,
  onSubmitStart,
  customEndpoint = "/",
  showSuccessMessage = true,
  showErrorMessage = true,
  resetOnSuccess = true,
  disabled = false,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    status: "idle",
    message: "",
  });

  // Default field configurations
  const defaultFields = {
    name: {
      name: "name",
      label: "Name*",
      placeholder: "Your Name",
      type: "text",
      required: true,
      ...fields.name,
    },
    email: {
      name: "email",
      label: "Email*",
      placeholder: "john@doe.com",
      type: "email",
      required: true,
      ...fields.email,
    },
    message: {
      name: "message",
      label: "Message*",
      placeholder: "Hello there, I would like to ask you about...",
      required: true,
      rows: 4,
      ...fields.message,
    },
  };

  const encode = (data: Record<string, string>) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (disabled) return;

    setSubmissionState({ status: "submitting", message: "" });

    // Call onSubmitStart callback if provided
    onSubmitStart?.(formData);

    try {
      const response = await fetch(customEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": formName,
          ...formData,
        }),
      });

      if (response.ok) {
        setSubmissionState({
          status: "success",
          message: successMessage,
        });

        // Call onSuccess callback if provided
        onSuccess?.(formData);

        // Reset form if enabled
        if (resetOnSuccess) {
          setFormData({
            name: "",
            email: "",
            message: "",
          });
        }
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      const errorObj =
        error instanceof Error ? error : new Error("Unknown error");

      setSubmissionState({
        status: "error",
        message: errorMessage,
      });

      // Call onError callback if provided
      onError?.(errorObj, formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDismissSuccess = () => {
    setSubmissionState({ status: "idle", message: "" });
  };

  // Handle escape key to dismiss success overlay
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && submissionState.status === "success") {
        handleDismissSuccess();
      }
    };

    if (submissionState.status === "success") {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [submissionState.status]);

  const isDisabled = disabled || submissionState.status === "submitting";

  const renderForm = () => (
    <div className="relative transition-all duration-300 ease-out">
      <form
        name={formName}
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
      >
        {/* Hidden input for Netlify forms */}
        <input type="hidden" name="form-name" value={formName} />

        <Stack spacing="lg">
          {/* Title and Description */}
          {title && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
              {description && <p className="text-gray-400">{description}</p>}
            </div>
          )}

          {/* Error Messages Only - Success is handled by overlay */}
          {showErrorMessage && submissionState.status === "error" && (
            <div className="p-4 bg-red-900/20 border border-red-500/30 text-red-400 rounded-lg">
              {submissionState.message}
            </div>
          )}

          {/* Form Fields */}
          {layout === "grid" ? (
            <Grid cols={2} gap="md" responsive={true}>
              <Input
                type={defaultFields.name.type}
                name={defaultFields.name.name}
                value={formData.name}
                onChange={handleChange}
                placeholder={defaultFields.name.placeholder}
                label={defaultFields.name.label}
                required={defaultFields.name.required}
                disabled={isDisabled}
              />
              <Input
                type={defaultFields.email.type}
                name={defaultFields.email.name}
                value={formData.email}
                onChange={handleChange}
                placeholder={defaultFields.email.placeholder}
                label={defaultFields.email.label}
                required={defaultFields.email.required}
                disabled={isDisabled}
              />
            </Grid>
          ) : (
            <Stack spacing="md">
              <Input
                type={defaultFields.name.type}
                name={defaultFields.name.name}
                value={formData.name}
                onChange={handleChange}
                placeholder={defaultFields.name.placeholder}
                label={defaultFields.name.label}
                required={defaultFields.name.required}
                disabled={isDisabled}
              />
              <Input
                type={defaultFields.email.type}
                name={defaultFields.email.name}
                value={formData.email}
                onChange={handleChange}
                placeholder={defaultFields.email.placeholder}
                label={defaultFields.email.label}
                required={defaultFields.email.required}
                disabled={isDisabled}
              />
            </Stack>
          )}

          <Textarea
            name={defaultFields.message.name}
            value={formData.message}
            onChange={handleChange}
            rows={defaultFields.message.rows}
            placeholder={defaultFields.message.placeholder}
            label={defaultFields.message.label}
            required={defaultFields.message.required}
            disabled={isDisabled}
          />

          <Stack direction="horizontal" justify="end">
            <Button type="submit" disabled={isDisabled}>
              {submissionState.status === "submitting"
                ? submitButtonLoadingText
                : submitButtonText}
            </Button>
          </Stack>
        </Stack>
      </form>

      {/* Success Overlay */}
      <SuccessOverlay
        message={submissionState.message}
        onDismiss={handleDismissSuccess}
        isVisible={showSuccessMessage && submissionState.status === "success"}
      />
    </div>
  );

  const content = showCard ? <Card>{renderForm()}</Card> : renderForm();

  if (showAnimation) {
    return (
      <Animate
        type={animationType}
        duration={animationDuration}
        delay={animationDelay}
        once={true}
        className={className}
      >
        {content}
      </Animate>
    );
  }

  return <div className={className}>{content}</div>;
};

export default ContactForm;
