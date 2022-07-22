import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import {
  Select,
  FormControl,
  FormErrorMessage,
  Button,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import yup from "utils/yup.ja";
import { yupResolver } from "@hookform/resolvers/yup";

const schoolTypes = ["小学校", "中学校"] as const;
const grades = [1, 2, 3, 4, 5, 6] as const;

type SchoolType = typeof schoolTypes[number];
type Grade = typeof grades[number];

const schema = yup.object({
  schoolType: yup
    .string()
    .oneOf([...schoolTypes])
    .required()
    .label("学校種別"),
  grade: yup
    .number()
    .oneOf([...grades])
    .required()
    .label("学年"),
});

export type FormInput = {
  schoolType: SchoolType;
  grade: Grade;
};

const GradeFormYup = () => {
  const toast = useToast();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    console.log({ data });
    toast({
      title: "Success!",
      status: "success",
      duration: 10_000,
      isClosable: true,
      position: "top",
    });
  };

  const defaultValues: FormInput = {
    schoolType: "小学校",
    grade: 1,
  };

  const { register, control, formState, handleSubmit } = useForm<FormInput>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const selectedSchoolType = useWatch<FormInput, "schoolType">({
    name: "schoolType",
    control,
    defaultValue: defaultValues.schoolType,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!formState.errors.schoolType}>
        <FormLabel>学校種別</FormLabel>
        <Select {...register("schoolType")}>
          {schoolTypes.map((schoolType) => (
            <option key={schoolType} value={schoolType}>
              {schoolType}
            </option>
          ))}
        </Select>
        <FormErrorMessage>
          {formState.errors.schoolType?.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!formState.errors.grade}>
        <FormLabel>学年</FormLabel>
        <Select {...register("grade")}>
          {(selectedSchoolType === "小学校" ? grades : grades.slice(0, 3)).map(
            (grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            )
          )}
        </Select>
        <FormErrorMessage>{formState.errors.grade?.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit">保存</Button>
    </form>
  );
};

export default GradeFormYup;
