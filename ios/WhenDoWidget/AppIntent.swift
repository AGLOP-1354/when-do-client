//
//  AppIntent.swift
//  WhenDoWidget
//
//  Created by jake on 5/25/24.
//

import WidgetKit
import AppIntents

struct ConfigurationAppIntent: WidgetConfigurationIntent {
    static var title: LocalizedStringResource = "Configuration"
    static var description = IntentDescription("This is an example widget.")

    // An example configurable parameter.
    @Parameter(title: "Favorite Emoji", default: "sfsdf")
    var todoTitle: String
}
