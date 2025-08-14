# ContactForm Component

A fully reusable, customizable contact form component with Netlify Forms integration and Ajax submission.

## Features

- ✅ **Netlify Forms Integration**: Seamless form submission to Netlify
- ✅ **Ajax Submission**: No page refresh required
- ✅ **TypeScript Support**: Full type safety and IntelliSense
- ✅ **Customizable Styling**: Flexible visual configuration
- ✅ **Loading States**: Built-in submission feedback
- ✅ **Error Handling**: Comprehensive error management
- ✅ **Callback Support**: Custom success/error handlers
- ✅ **Animations**: Optional entrance animations
- ✅ **Layout Options**: Grid or stack layouts
- ✅ **Field Customization**: Configurable form fields
- ✅ **Accessibility**: WCAG compliant form elements

## Basic Usage

```tsx
import ContactForm from '@/components/ContactForm';

// Simplest usage with defaults
export function BasicContact() {
  return <ContactForm />;
}
```

## Advanced Usage

```tsx
import ContactForm from '@/components/ContactForm';

export function CustomContact() {
  return (
    <ContactForm
      formName="collaboration"
      title="Let's Work Together"
      description="Tell me about your project!"
      submitButtonText="Send Proposal"
      successMessage="Thanks! I'll get back to you within 24 hours."
      onSuccess={(formData) => {
        // Track in analytics
        analytics.track('form_submitted', {
          form_name: 'collaboration',
          user_email: formData.email
        });
      }}
      fields={{
        message: {
          label: "Project Details*",
          placeholder: "Describe your project, timeline, and budget...",
          rows: 6
        }
      }}
    />
  );
}
```

## Props Reference

### Basic Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `formName` | `string` | `"contact-form"` | Unique form identifier for Netlify |
| `title` | `string` | - | Optional form title |
| `description` | `string` | - | Optional form description |

### Visual Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showCard` | `boolean` | `true` | Wrap form in Card component |
| `showAnimation` | `boolean` | `true` | Enable entrance animation |
| `animationType` | `AnimationType` | `"slideUp"` | Animation style |
| `animationDuration` | `number` | `0.8` | Animation duration (seconds) |
| `animationDelay` | `number` | `0.2` | Animation delay (seconds) |

### Form Behavior

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `submitButtonText` | `string` | `"Send"` | Submit button label |
| `submitButtonLoadingText` | `string` | `"Sending..."` | Loading state text |
| `successMessage` | `string` | Default success | Success feedback message |
| `errorMessage` | `string` | Default error | Error feedback message |
| `layout` | `"grid" \| "stack"` | `"grid"` | Field layout style |

### Field Customization

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fields.name` | `Partial<FormField>` | Default config | Name field customization |
| `fields.email` | `Partial<FormField>` | Default config | Email field customization |
| `fields.message` | `Partial<FormField>` | Default config | Message field customization |

### Advanced Options

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `customEndpoint` | `string` | `"/"` | Form submission endpoint |
| `showSuccessMessage` | `boolean` | `true` | Display success messages |
| `showErrorMessage` | `boolean` | `true` | Display error messages |
| `resetOnSuccess` | `boolean` | `true` | Clear form after success |
| `disabled` | `boolean` | `false` | Disable form interaction |

### Callback Functions

| Prop | Type | Description |
|------|------|-------------|
| `onSuccess` | `(formData: ContactFormData) => void` | Called on successful submission |
| `onError` | `(error: Error, formData: ContactFormData) => void` | Called on submission error |
| `onSubmitStart` | `(formData: ContactFormData) => void` | Called when submission starts |

## Form Field Configuration

The `FormField` interface allows customization of individual fields:

```tsx
interface FormField {
  name: string;          // Field name attribute
  label: string;         // Display label
  placeholder: string;   // Placeholder text
  type?: string;         // Input type (text, email, etc.)
  required?: boolean;    // Whether field is required
  rows?: number;         // Textarea rows (message field only)
}
```

### Example Field Customization

```tsx
<ContactForm
  fields={{
    name: {
      label: "Full Name*",
      placeholder: "Enter your full name"
    },
    email: {
      label: "Business Email*",
      placeholder: "your@company.com"
    },
    message: {
      label: "Project Requirements*",
      placeholder: "Describe your project needs, timeline, and budget...",
      rows: 8,
      required: true
    }
  }}
/>
```

## Common Use Cases

### 1. Newsletter Signup

```tsx
<ContactForm
  formName="newsletter"
  title="Stay Updated"
  submitButtonText="Subscribe"
  fields={{
    message: {
      label: "Interests (Optional)",
      placeholder: "What would you like to hear about?",
      required: false
    }
  }}
  layout="stack"
  showCard={false}
/>
```

### 2. Modal Contact Form

```tsx
function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full">
        <ContactForm
          formName="modal-contact"
          title="Quick Contact"
          showCard={false}
          showAnimation={false}
          onSuccess={() => onClose()}
        />
        <button onClick={onClose} className="mt-4 text-gray-400">
          Close
        </button>
      </div>
    </div>
  );
}
```

### 3. Collaboration Inquiry

```tsx
<ContactForm
  formName="collaboration"
  title="Project Collaboration"
  description="Let's discuss your project requirements"
  submitButtonText="Send Proposal"
  animationType="slideLeft"
  fields={{
    message: {
      label: "Project Details*",
      placeholder: "Describe your project, timeline, budget, and specific requirements...",
      rows: 6
    }
  }}
  onSuccess={(data) => {
    // Redirect to thank you page
    router.push('/thank-you');
  }}
/>
```

### 4. Compact Inline Form

```tsx
<ContactForm
  formName="inline-contact"
  showCard={false}
  showAnimation={false}
  layout="stack"
  className="max-w-sm"
  submitButtonText="Get in Touch"
/>
```

## Netlify Configuration

### 1. Static Form Detection

The component automatically includes the necessary Netlify attributes:
- `name` attribute for form identification
- `data-netlify="true"` for Netlify detection
- Hidden `form-name` input for Ajax submissions

### 2. Build-time Detection

Ensure your `public/contact-forms.html` includes form definitions:

```html
<form name="your-form-name" netlify hidden>
  <input type="text" name="name" />
  <input type="email" name="email" />
  <textarea name="message"></textarea>
</form>
```

### 3. Form Management

After deployment, manage your forms in the Netlify dashboard:
- View submissions
- Set up email notifications
- Configure spam filtering
- Export submission data

## TypeScript Support

Import types for enhanced development experience:

```tsx
import ContactForm from '@/components/ContactForm';
import type { ContactFormProps, ContactFormData } from '@/components/ContactForm.types';

const MyForm: React.FC<{ config: ContactFormProps }> = ({ config }) => {
  const handleSuccess = (data: ContactFormData) => {
    console.log('Form submitted:', data);
  };

  return <ContactForm {...config} onSuccess={handleSuccess} />;
};
```

## Styling and Themes

The component uses your existing UI components and respects your design system:
- Uses your `Card`, `Input`, `Textarea`, and `Button` components
- Follows your color scheme and spacing
- Responsive by default
- Supports dark mode (if your UI components do)

## Best Practices

1. **Unique Form Names**: Use descriptive, unique form names for each instance
2. **Meaningful Callbacks**: Use callbacks for analytics, redirects, or custom feedback
3. **Field Validation**: Leverage HTML5 validation with custom messages
4. **Accessibility**: Ensure labels and error states are clear
5. **Loading States**: Provide clear feedback during submission
6. **Error Handling**: Implement graceful error recovery

## Troubleshooting

### Form Not Submitting
- Verify `formName` matches your static HTML definition
- Check Netlify dashboard for form detection
- Ensure proper deployment to Netlify

### TypeScript Errors
- Import types from `ContactForm.types`
- Ensure callback function signatures match interface
- Update form data types if customizing fields

### Styling Issues
- Check that UI components support required props
- Verify CSS classes are applied correctly
- Test responsive behavior on different screen sizes

## Migration Guide

### From Basic Form to ContactForm

Before:
```tsx
<form onSubmit={handleSubmit}>
  <input name="name" required />
  <input name="email" type="email" required />
  <textarea name="message" required />
  <button type="submit">Send</button>
</form>
```

After:
```tsx
<ContactForm formName="contact" />
```

### Adding Custom Behavior

```tsx
<ContactForm
  formName="contact"
  onSuccess={(data) => {
    // Your custom success logic
    trackEvent('contact_form_submitted', data);
    showSuccessModal();
  }}
  onError={(error) => {
    // Your custom error handling
    logError(error);
    showErrorModal();
  }}
/>
```