/// <reference types="react" />
declare type EditorLinkProps = {
    file: string;
    isSourceFile: boolean;
    location?: {
        line: number;
        column: number;
    };
};
export declare function EditorLink({ file, isSourceFile, location }: EditorLinkProps): JSX.Element;
export {};
