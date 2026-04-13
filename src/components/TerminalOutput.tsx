"use client";

import React from 'react';

interface TerminalOutputProps {
  studentName: string;
  filename: string;
  outputResult: string;
  terminalColor?: string;
  forceComplete?: boolean;
}

const themes = [
  {
    type: "mac",
    bg: "bg-white print:bg-white", border: "border-gray-300 print:border-gray-300",
    headerBg: "bg-gray-100 print:bg-gray-100", headerBorder: "border-gray-300 print:border-gray-300",
    text: "text-gray-900 print:text-black", titleText: "text-gray-700 print:text-gray-700",
    title: "Terminal", showDots: true,
  },
  {
    type: "cmd",
    bg: "bg-white print:bg-white", border: "border-gray-300 print:border-gray-300",
    headerBg: "bg-gray-50 print:bg-gray-50", headerBorder: "border-gray-300 print:border-gray-300",
    text: "text-gray-900 print:text-black", titleText: "text-gray-700 print:text-gray-700",
    title: "C:\\WINDOWS\\system32\\cmd.exe", showDots: false,
  },
  {
    type: "powershell",
    bg: "bg-[#f8f9fa] print:bg-white", border: "border-gray-300 print:border-gray-300",
    headerBg: "bg-gray-100 print:bg-gray-100", headerBorder: "border-gray-300 print:border-gray-300",
    text: "text-[#012456] print:text-[#012456]", titleText: "text-gray-700 print:text-gray-700",
    title: "Windows PowerShell", showDots: false,
  },
  {
    type: "ubuntu",
    bg: "bg-white print:bg-white", border: "border-gray-300 print:border-gray-300",
    headerBg: "bg-[#e5e5e5] print:bg-[#e5e5e5]", headerBorder: "border-gray-300 print:border-gray-300",
    text: "text-[#300a24] print:text-[#300a24]", titleText: "text-gray-800 print:text-gray-800",
    title: "user@ubuntu: ~", showDots: true,
  },
  {
    type: "gitbash",
    bg: "bg-white print:bg-white", border: "border-gray-300 print:border-gray-300",
    headerBg: "bg-gray-100 print:bg-gray-100", headerBorder: "border-gray-300 print:border-gray-300",
    text: "text-gray-900 print:text-black", titleText: "text-gray-700 print:text-gray-700",
    title: "MINGW64:/c/Users", showDots: false,
  }
];

const fonts = ["font-mono", "font-['Consolas',_monospace]", "font-['Courier_New',_monospace]", "font-['Lucida_Console',_monospace]", "font-['Menlo',_monospace]"];

export default function TerminalOutput({ studentName, filename, outputResult }: TerminalOutputProps) {
  const baseName = studentName.trim().split(" ")[0] || "User";
  
  // Real terminals format names properly (usually TitleCase for Windows, lowercase for Unix)
  const winName = baseName.charAt(0).toUpperCase() + baseName.slice(1).toLowerCase();
  const unixName = baseName.toLowerCase();
  
  const hash = studentName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const theme = themes[hash % themes.length];
  const font = fonts[hash % fonts.length];
  
  const winPaths = [
    `C:\\Users\\${winName}\\Documents\\DBMSLab`, `C:\\Users\\${winName}\\DBMSProjects`,
    `D:\\MCA\\Semester2\\DBMS`, `C:\\Users\\${winName}\\Desktop\\DBMSPrograms`,
    `E:\\Assignments\\DBMSLab`, `C:\\Workspace\\Database`
  ];
  
  const unixPaths = [
    `~/Documents/DBMSLab`, `~/DBMSProjects`,
    `~/Desktop/DBMSPrograms`, `~/Workspace/Database`,
    `~/Assignments/DBMSLab`
  ];

  const winPath = winPaths[hash % winPaths.length];
  const unixPath = unixPaths[hash % unixPaths.length];
  
  let promptText = "";
  if (theme.type === "mac") {
    // macOS: username@MacBook-Pro DBMSLab %
    promptText = `${unixName}@MacBook-Pro ${unixPath.split('/').pop()} %`;
  } else if (theme.type === "ubuntu") {
    // Ubuntu: username@ubuntu:~/Documents/DBMSLab$
    promptText = `${unixName}@ubuntu:${unixPath}$`;
  } else if (theme.type === "gitbash") {
    // Git Bash: username@DESKTOP MINGW64 ~/Documents/DBMSLab
    // $
    promptText = `${unixName}@DESKTOP-ABC MINGW64 ${unixPath}\n$`;
  } else if (theme.type === "powershell") {
    promptText = `PS ${winPath}>`;
  } else {
    // CMD
    promptText = `${winPath}>`;
  }

  const isOracle = outputResult.startsWith("SQL>");

  const dbLogin = isOracle ? [
    `${promptText} sqlplus ${unixName}/admin123`,
    ``,
    `SQL*Plus: Release 21.0.0.0.0 - Production on ${new Date().toLocaleDateString('en-GB')}`,
    `Oracle Database 21c Express Edition Release 21.0.0.0.0 - Production`,
    ``
  ] : [
    `${promptText} mysql -u root -p university_db`,
    `Enter password: ********`,
    `Welcome to the MySQL monitor.  Commands end with ; or \\g.`,
    `Your MySQL connection id is ${Math.floor(Math.random() * 100) + 10}`,
    `Server version: 8.0.32 MySQL Community Server - GPL`,
    ``
  ];

  const exitPrompt = isOracle ? [ `SQL> exit`, `Disconnected from Oracle Database`, promptText ] : [ `mysql> exit`, `Bye`, promptText ];

  const executionFlow = [
    ...dbLogin,
    ...outputResult.split("\n"),
    ...exitPrompt
  ];

  return (
    <div className={`rounded-xl overflow-hidden shadow-2xl border print:shadow-xl mt-4 relative ${theme.bg} ${theme.border} font-sans box-border`}>
      <div className={`${theme.headerBg} flex items-center px-4 py-2 border-b ${theme.headerBorder} h-9`}>
        {theme.showDots && (
          <div className="flex space-x-2 absolute">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] print:bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] print:bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f] print:bg-[#27c93f]"></div>
          </div>
        )}
        <div className={`w-full text-center text-[13px] font-medium ${theme.titleText} tracking-wide font-sans`}>
          {theme.title}
        </div>
      </div>
      
      <div className={`${theme.bg} ${theme.text} ${font} text-[13.5px] p-5 overflow-x-auto min-h-[120px]`}>
        {executionFlow.map((line, idx) => (
          <div key={idx} className="min-h-[20px] whitespace-pre-wrap break-all leading-relaxed">
            {line === 'compiling...' ? <span className="opacity-50 italic">{line}</span> : line}
          </div>
        ))}
      </div>
    </div>
  );
}
