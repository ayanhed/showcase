import React, { useState } from "react";
import Card from "./ui/Card";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import Button from "./ui/Button";
import { Animate, Grid, Stack } from "./ui";

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
  status: 'idle' | 'submitting' | 'success' | 'error';
  message: string;
}

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
  successMessage = "Thank you! Your message has been sent successfully.",
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
    status: 'idle',
    message: ''
  });

  // Default field configurations
  const defaultFields = {
    name: {
      name: "name",
      label: "Name*",
      placeholder: "Your Name",
      type: "text",
      required: true,
      ...fields.name
    },
    email: {
      name: "email",
      label: "Email*",
      placeholder: "john@doe.com",
      type: "email",
      required: true,
      ...fields.email
    },
    message: {
      name: "message",
      label: "Message*",
      placeholder: "Hello there, I would like to ask you about...",
      required: true,
      rows: 4,
      ...fields.message
    }
  };

  const encode = (data: Record<string, string>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (disabled) return;

    setSubmissionState({ status: 'submitting', message: '' });
    
    // Call onSubmitStart callback if provided
    onSubmitStart?.(formData);

    try {
      const response = await fetch(customEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": formName,
          ...formData
        })
      });

      if (response.ok) {
        setSubmissionState({
          status: 'success',
          message: successMessage
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
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      const errorObj = error instanceof Error ? error : new Error('Unknown error');
      
      setSubmissionState({
        status: 'error',
        message: errorMessage
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

  const isDisabled = disabled || submissionState.status === 'submitting';

  const renderForm = () => (
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
            {description && (
              <p className="text-gray-400">{description}</p>
            )}
          </div>
        )}
        
        {/* Success/Error Messages */}
        {showSuccessMessage && submissionState.status === 'success' && (
          <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {submissionState.message}
          </div>
        )}
        {showErrorMessage && submissionState.status === 'error' && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
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
          <Button 
            type="submit"
            disabled={isDisabled}
          >
            {submissionState.status === 'submitting' ? submitButtonLoadingText : submitButtonText}
          </Button>
        </Stack>
      </Stack>
    </form>
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
