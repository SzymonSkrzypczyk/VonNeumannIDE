package parser

import (
	"fmt"
	"log"
	"strconv"
	"strings"
)

type FileContent struct {
	Lines     []CodeLine
	FileName  string
	Variables map[string]int
}

func NewFile(fileContents, name string) FileContent {
	var result FileContent
	var linesOfCode []CodeLine
	variables := make(map[string]int)
	result.FileName = name
	result.Variables = variables
	// split lines
	lines := strings.Split(fileContents, "\n")
	// create CodeLine structures and append them to the slice
	for i := 0; i < len(lines); i++ {
		linesOfCode = append(linesOfCode, CodeLine{LineNumber: i + 1, LineContent: lines[i]})
	}
	// add CodeLines
	result.Lines = linesOfCode

	// return result
	return result
}

func (f *FileContent) GetName() string {
	for i := 0; i < len(f.Lines); i++ {
		if line := f.Lines[i].LineContent; strings.HasPrefix(line, ".UNIT") {
			partsOfName := strings.Split(line, ", ")
			return partsOfName[1]
		}
	}
	return "Untitled"
}

func (f FileContent) GetCodeStartLine() int {
	for i := 0; i < len(f.Lines); i++ {
		if line := f.Lines[i].LineContent; strings.Contains(line, ".CODE") {
			return i
		}
	}
	return -1
}

func (f *FileContent) GetVariables() {
	for i := 0; i < len(f.Lines); i++ {
		if strings.Contains(f.Lines[i].LineContent, ": .WORD") {
			// split by semicolon to obtain variable's name
			firstSplit := strings.Split(f.Lines[i].LineContent, ":")
			if firstSplit != nil {
				variableName := strings.Trim(firstSplit[0], " ")
				// second split by comma, second index is the value
				secondSplit := strings.Split(firstSplit[1], ",")
				// set variable
				variableValue, err := strconv.Atoi(strings.Trim(secondSplit[1], " "))
				if err != nil {
					log.Fatalln(err)
				} else {
					f.Variables[variableName] = variableValue
				}
			} else {
				continue
			}
		}
	}
}

func (f FileContent) String() string {
	return fmt.Sprintf("File: %s", f.FileName)
}

type CodeLine struct {
	LineNumber   int
	LineContent  string
	LineElements []string
}
