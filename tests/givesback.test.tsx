import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { GivesBack } from "@/components/sections/GivesBack";

describe("GivesBack", () => {
  it("renders 4 items when given 4 sustainability facts", () => {
    const items = [
      { title: "Fact one", body: "Body one" },
      { title: "Fact two", body: "Body two" },
      { title: "Fact three", body: "Body three" },
      { title: "Fact four", body: "Body four" },
    ];
    const html = renderToStaticMarkup(
      <GivesBack headline="Headline" items={items} />,
    );
    for (const item of items) {
      expect(html).toContain(item.title);
    }
    expect((html.match(/data-testid="gives-back-grid"/g) ?? []).length).toBe(1);
  });

  it("renders nothing when items is null", () => {
    const html = renderToStaticMarkup(<GivesBack headline="Headline" items={null} />);
    expect(html).toBe("");
  });
});
