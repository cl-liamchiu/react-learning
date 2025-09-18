import type { ReactNode } from "react";

export interface CardItem { title: string; contentBasic: ReactNode; contentAdvanced: ReactNode; }

export const HWData: CardItem =
    {
        title: "Welcome Page",
        contentBasic: (<>
        <ul>
            <li>show input value on the screen</li>
        </ul>
        </>),
        contentAdvanced: (<>
        <ul>
            <li>use Regular Expression to limit input value as:</li>
            <ul>
                <li>only accept Numbers</li>
                <li>only accept Alphabets</li>
            </ul>
        </ul>
        </>)
    };