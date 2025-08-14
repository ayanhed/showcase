/**
 * ContactForm Component Types
 * 
 * This file contains all TypeScript interfaces and types for the reusable ContactForm component.
 * Use these types when implementing custom forms or extending the component functionality.
 */

/**
 * Configuration for individual form fields
 */
export interface FormField {
  /** The name attribute for the form field */
  name: string;
  /** The label text displayed above the field */
  label: string;
  /** Placeholder text shown in the field */
  placeholder: string;
  /** Input type (text, email, etc.) */
  type?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Number of rows for textarea fields */
  rows?: number;
}

/**
 * Form data structure for contact forms
 */
export interface ContactFormData {
  /** User's name */
  name: string;
  /** User's email address */
  email: string;
  /** User's message content */
  message: string;
}

/**
 * Form submission state tracking
 */
export interface SubmissionState {
  /** Current status of the form submission */
  status: 'idle' | 'submitting' | 'success' | 'error';
  /** Status message to display to user */
  message: string;
}

/**
 * Animation types supported by the ContactForm component
 */
export type AnimationType = "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "fade";

/**
 * Layout options for form fields
 */
export type LayoutType = "grid" | "stack";

/**
 * Callback function signatures
 */
export interface FormCallbacks {
  /** Called when form submission is successful */
  onSuccess?: (formData: ContactFormData) => void;
  /** Called when form submission encounters an error */
  onError?: (error: Error, formData: ContactFormData) => void;
  /** Called when form submission starts */
  onSubmitStart?: (formData: ContactFormData) => void;
}

/**
 * Comprehensive props interface for the ContactForm component
 */
export interface ContactFormProps extends FormCallbacks {
  // Basic Configuration
  /** Additional CSS classes to apply to the component */
  className?: string;
  /** Unique name for the form (used by Netlify) */
  formName?: string;
  /** Optional title displayed at the top of the form */
  title?: string;
  /** Optional description text displayed below the title */
  description?: string;

  // Visual Configuration
  /** Whether to wrap the form in a Card component */
  showCard?: boolean;
  /** Whether to animate the form on mount */
  showAnimation?: boolean;
  /** Type of animation to use */
  animationType?: AnimationType;
  /** Animation duration in seconds */
  animationDuration?: number;
  /** Animation delay in seconds */
  animationDelay?: number;

  // Form Behavior
  /** Text for the submit button */
  submitButtonText?: string;
  /** Text for the submit button while loading */
  submitButtonLoadingText?: string;
  /** Success message to display */
  successMessage?: string;
  /** Error message to display */
  errorMessage?: string;
  /** Layout style for form fields */
  layout?: LayoutType;

  // Field Customization
  /** Custom configuration for form fields */
  fields?: {
    name?: Partial<FormField>;
    email?: Partial<FormField>;
    message?: Partial<FormField>;
  };

  // Advanced Options
  /** Custom endpoint for form submission (defaults to "/") */
  customEndpoint?: string;
  /** Whether to show success messages */
  showSuccessMessage?: boolean;
  /** Whether to show error messages */
  showErrorMessage?: boolean;
  /** Whether to reset form data on successful submission */
  resetOnSuccess?: boolean;
  /** Whether the form is disabled */
  disabled?: boolean;
}

/**
 * Common form configurations for quick setup
 */
export const FormPresets = {
  /** Basic contact form with default settings */
  basic: (): Partial<ContactFormProps> => ({}),
  
  /** Newsletter signup form */
  newsletter: (): Partial<ContactFormProps> => ({
    formName: "newsletter",
    title: "Stay Updated",
    submitButtonText: "Subscribe",
    fields: {
      message: {
        label: "Interests (Optional)",
        required: false
      }
    }
  }),
  
  /** Collaboration inquiry form */
  collaboration: (): Partial<ContactFormProps> => ({
    formName: "collaboration",
    title: "Let's Work Together",
    submitButtonText: "Send Proposal",
    fields: {
      message: {
        label: "Project Details*",
        rows: 6
      }
    }
  }),
  
  /** Compact form without card styling */
  compact: (): Partial<ContactFormProps> => ({
    showCard: false,
    showAnimation: false,
    layout: "stack"
  }),
  
  /** Modal-friendly form */
  modal: (): Partial<ContactFormProps> => ({
    showCard: false,
    showAnimation: false,
    title: "Quick Contact"
  })
} as const;

/**
 * Helper type for form validation
 */
export interface FormValidation {
  /** Whether the form is valid */
  isValid: boolean;
  /** Validation errors by field name */
  errors: Partial<Record<keyof ContactFormData, string>>;
}

export default ContactFormProps;