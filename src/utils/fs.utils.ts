import { existsSync, readFileSync, unlinkSync, writeFileSync } from "fs";

export const saveDataToJson = (filepath: string, data: any) => {
    if (existsSync(filepath)) unlinkSync(filepath);
    writeFileSync(filepath, JSON.stringify(data));
}

export const loadDataFromJson = (filepath: string) => {
    if (!existsSync(filepath)) return null;
    const data = readFileSync(filepath);
    return JSON.parse(data.toString());
}