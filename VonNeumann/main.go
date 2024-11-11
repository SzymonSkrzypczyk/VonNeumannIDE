package main

import (
	//"embed"
	//"github.com/wailsapp/wails/v2"
	//"github.com/wailsapp/wails/v2/pkg/options"
	//"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"VonNeumann/parser"
	"fmt"
)

// go:embed all:frontend/dist
//var assets embed.FS

func main() {
	yo := parser.NewFile(".UNIT, mnoz_dod\n.DATA\nx: .WORD, -125\ny: .WORD, -155", "test")
	fmt.Println(yo.GetName())
	yo.GetVariables()
	fmt.Println(yo.Variables)
	// Create an instance of the app structure
	/*
		app := NewApp()

		// Create application with options
		err := wails.Run(&options.App{
			Title:  "VNMC", // Von Neumann's Machine Compliler
			Width:  1024,
			Height: 768,
			AssetServer: &assetserver.Options{
				Assets: assets,
			},
			BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
			OnStartup:        app.startup,
			Bind: []interface{}{
				app,
			},
		})

		if err != nil {
			println("Error:", err.Error())
		}
	*/
}
