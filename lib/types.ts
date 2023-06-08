export interface ConfigType {
  formGroupName: string;
  formControl: string[];
  initialValues: string[];
  inputType: string[];
  labelText: string[];
  validators: any;
  errorMessage: string[];
}

export interface SavedCode {
  htmlCode: string;
  tsCode: string;
  userid: number;
  type: string;
}

export interface DisplayedCode {
  componentid: number;
  html: string | undefined | null;
  typescript: string | null | undefined;
}