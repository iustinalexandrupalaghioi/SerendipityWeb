import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface BookingFormProps {
  name: string;
  email: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  errors?: {
    name?: string;
    email?: string;
  };
}

const BookingForm = ({
  name,
  email,
  onNameChange,
  onEmailChange,
  errors,
}: BookingFormProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full name</Label>
        <Input
          id="fullName"
          placeholder="John Doe"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
        {errors?.name && (
          <p className="text-sm text-destructive">{errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
        />
        {errors?.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
