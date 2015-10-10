// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/1.1.1";
var tester = new TextLintTester();
tester.run("1.1.1.本文", rule, {
    valid: [
        "これはペンです。\nこれもペンです。",
        "これはペンである。\nこれもペンである。",
        "昨日はいい天気であったのだが、今日は悪天候である。",
        "今日はいい天気ですね。\n\nそうですね。",
        // 箇条書きは無視
        `
- 今日はいい天気ですね。
- 今日はいい天気である。
`
    ],
    invalid: [
        // 常体が多い
        {
            text: `それはペンなのだが、これもペンである。

じゃあこっちは？

それはペンです。`,
            errors: [
                {
                    message: '本文を常体(である調)に統一して下さい。\n本文の文体は、敬体(ですます調)あるいは常体(である調)のどちらかで統一します。\n"です。"が敬体(ですます調)です。',
                    line: 5,
                    column: 5
                }
            ]
        },
        // 接続の混在
        {
            text: `昨日は雨だったのだが、持ち直した。
昨日は雨だったのですが、持ち直しました。
`,
            errors: [
                {
                    message: '本文を敬体(ですます調)に統一して下さい。\n本文の文体は、敬体(ですます調)あるいは常体(である調)のどちらかで統一します。\n"のだが"が常体(である調)です。',
                    line: 1,
                    column: 7
                }
            ]
        },
        // 文末が混在してるとreportされる
        {
            text: `今日はいい天気ですね。
今日はいい天気である。
`,
            errors: [
                // 同数である場合は、"ですます"に統一するのを優先する
                {
                    message: `本文を敬体(ですます調)に統一して下さい。\n本文の文体は、敬体(ですます調)あるいは常体(である調)のどちらかで統一します。\n"である。"が常体(である調)です。`,
                    line: 2,
                    column: 7
                }
            ]
        }
    ]
});