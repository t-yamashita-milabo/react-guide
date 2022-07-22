import * as z from "zod";

const errorMap: z.ZodErrorMap = (issue, ctx) => {
  console.log({ issue });
  console.log({ ctx });
  switch (issue.code) {
    case z.ZodIssueCode.too_small:
      switch (issue.type) {
        case "string":
          if (issue.minimum === 1) {
            return {
              message: `${issue.path[0]}は必須です`,
            };
          } else {
            return {
              message: `${issue.path[0]}は少なくとも${issue.minimum}文字でなければなりません`,
            };
          }
        case "number":
          if (issue.inclusive) {
            return {
              message: `${issue.path[0]}は${issue.minimum}以上である必要があります`,
            };
          } else
            return {
              message: `${issue.path[0]}は${issue.minimum}より大きくなければなりません`,
            };
        case "array":
          return {
            message: `${issue.path[0]}フィールドには少なくとも${issue.minimum}の項目が必要です`,
          };
        default:
          return { message: ctx.defaultError };
      }
    case z.ZodIssueCode.too_big:
      switch (issue.type) {
        case "string":
          return {
            message: `${issue.path[0]}は最大${issue.maximum}文字でなければなりません`,
          };
        case "number":
          if (issue.inclusive) {
            return {
              message: `${issue.path[0]}は${issue.maximum}以下である必要があります`,
            };
          } else
            return {
              message: `${issue.path[0]}は${issue.maximum}より小さくなければなりません`,
            };
        case "array":
          return {
            message: `${issue.path[0]}フィールドには${issue.maximum}以下の項目が必要です`,
          };
        default:
          return { message: ctx.defaultError };
      }
    case z.ZodIssueCode.invalid_string:
      switch (issue.validation) {
        case "email":
          return {
            message: `${issue.path[0]}はメールアドレス形式である必要があります`,
          };
        case "url":
          return {
            message: `${issue.path[0]}は有効なURLでなければなりません`,
          };
        case "regex":
          return {
            message: `${issue.path[0]}は有効なパターンである必要があります`,
          };
        default:
          return { message: ctx.defaultError };
      }
    case z.ZodIssueCode.invalid_type:
      switch (issue.received) {
        case "undefined":
          return {
            message: `${issue.path[0]}は必須です`,
          };
        default:
          switch (issue.expected) {
            case "integer":
              return {
                message: `${issue.path[0]}は整数でなければなりません`,
              };
            default:
              return { message: ctx.defaultError };
          }
      }
    case z.ZodIssueCode.invalid_enum_value:
      return {
        message: `${issue.path[0]}は次の値のいずれかでなければなりません:${issue.options}`,
      };
    default:
      return { message: ctx.defaultError };
  }
};

z.setErrorMap(errorMap);

export default z;
