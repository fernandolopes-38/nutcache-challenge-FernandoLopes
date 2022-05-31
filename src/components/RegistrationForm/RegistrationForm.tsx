import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FormData } from "../../pages/App";
import { selectUsersAddStatus } from "../../store/usersSlice";
import { User } from "../../types";
import { cpfMask, startDateMask } from "../../utils/masks.utils";
import { Button } from "../Button";
import { Input } from "../Form/Input";
import { Select } from "../Form/Select";
import { useAppSelector } from "./../../store/hooks";
import { validateCpf, validateStartDate } from "./../../utils/validator.utils";
import styles from "./styles.module.scss";

interface RegistrationFormProps {
  initalData?: User;
  formSubmit: (data: FormData) => void;
  isModalOpen?: boolean;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  formSubmit,
  initalData,
  isModalOpen,
}) => {
  const requestStatus = useAppSelector(selectUsersAddStatus);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    birthDate: "",
    gender: "",
    email: "",
    cpf: "",
    startDate: "",
    team: "",
  });
  const [cpfError, setCpfError] = useState(false);
  const [startDateError, setStartDateError] = useState(false);

  useEffect(() => {
    if (isModalOpen) clearForm();
  }, [isModalOpen]);

  useEffect(() => {
    if (initalData) {
      const { _id, ...data } = initalData;
      setFormData(data);
      return;
    }
  }, [initalData]);

  const clearForm = () => {
    setFormData({
      name: "",
      birthDate: "",
      gender: "",
      email: "",
      cpf: "",
      startDate: "",
      team: "",
    });
  };

  const handleChange =
    (mask?: string) => (event: ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;
      switch (mask) {
        case "startDate":
          value = startDateMask(value);
          break;
        case "cpf":
          value = cpfMask(value);
          break;
        default:
          value = value;
          break;
      }
      setFormData({
        ...formData,
        [event.target.name]: value,
      });
    };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!validateCpf(formData.cpf)) {
      setCpfError(true);
      return;
    }
    if (!validateStartDate(formData.startDate)) {
      setStartDateError(true);
      return;
    }

    formSubmit(formData);
  };

  return (
    <form
      data-testid="registration-form"
      className={styles.container}
      onSubmit={handleSubmit}
    >
      <Input
        name="name"
        label="Name *"
        placeholder="John Doe"
        value={formData.name}
        onChange={handleChange()}
        required
      />
      <Input
        name="birthDate"
        label="Birth Date *"
        type="date"
        value={formData.birthDate}
        onChange={handleChange()}
        required
      />
      <Select
        name="gender"
        label="Gender *"
        value={formData.gender}
        onChange={handleSelectChange}
        required
      >
        <option value="">Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </Select>
      <Input
        name="email"
        label="E-mail *"
        type="email"
        placeholder="john@mail.com"
        value={formData.email}
        onChange={handleChange()}
        required
      />
      <Input
        type="text"
        name="cpf"
        label="CPF *"
        placeholder="000.000.000-00"
        maxLength={14}
        minLength={14}
        value={formData.cpf}
        onChange={handleChange("cpf")}
        error={cpfError ? "Invalid CPF." : ""}
        onFocus={() => setCpfError(false)}
        required
      />
      <Input
        type="text"
        name="startDate"
        label="Start Date *"
        placeholder="MM/YYYY"
        maxLength={7}
        minLength={7}
        value={formData.startDate}
        onChange={handleChange("startDate")}
        error={startDateError ? "Invalid start date." : ""}
        onFocus={() => setStartDateError(false)}
        required
      />
      <Select
        name="team"
        label="Team"
        value={formData.team}
        onChange={handleSelectChange}
      >
        <option value="">Select Team</option>
        <option value="mobile">Mobile</option>
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
      </Select>

      <Button
        type="submit"
        theme="success"
        loading={requestStatus === "loading"}
      >
        Save
      </Button>
    </form>
  );
};
