/**
 * Short design notes, in the order they were written — the first note first,
 * so a new one goes at the end. `body` is Markdown, so a new note is just
 * another entry here — paragraphs are separated by a blank line, and a list or
 * an image can go straight into the text.
 */
export interface Writing {
  /** Used as the anchor, so a single note can be linked to: /writing#<id>. */
  id: string;
  /** The note's place in the series. */
  number: number;
  title: string;
  body: string;
  tags?: string[];
  media?: {
    type: "image" | "video";
    src: string;
    alt: string;
  };
}

export const writings: Writing[] = [
  {
    id: "users-dont-live-on-the-screen",
    number: 1,
    title: "Users don't live on the screen.",
    body: `While many things are designed for the screen, users don't live there.

I see this a lot — when people design, they think about the screen: the layout, the states, the edge cases. But not the situation the screen is going to show up in.

Because users come to the screen with a purpose. The screen is the last step of a situation that started somewhere else entirely.

Think about a food delivery app. The person opening it is probably exhausted and hungry. The urgency is what makes them okay with paying delivery fees. If ordering takes 20 minutes, they're not coming back.

In that moment, the app has one job: get out of the way. Surface their usual order. Cut the steps. Reduce the cognitive load to near zero.

Design for the user's actual situation, not just the interface. The screen should arrive exactly when they need it — and then disappear.`,
    tags: ["Design learnings", "SaaS products"],
  },
  {
    id: "b2b-users-give-the-best-feedback",
    number: 2,
    title: "B2B users give you the best feedback. Here's why.",
    body: `B2B users are very resilient.

If a consumer app doesn't work, the user leaves and never comes back. If a B2B product doesn't work, the user… still has to use it. It's sometimes mandated by their company or a part of their job.

So they find workarounds. They push through friction. And when they give feedback, it's some of the best feedback you'll ever get — because they genuinely want the product to work.

Users will work with a broken product to get the job done. Even if you think a feature is useless, it'll still be used by someone in an unintended, unprecedented way.`,
    tags: ["B2B", "SaaS", "Users", "Insights"],
  },
  {
    id: "not-missing-features-that-kill-adoption",
    number: 3,
    title: "It's not missing features that kill adoption.",
    body: `Sometimes low adoption has nothing to do with missing features. We have a survey tool with every feature you'd want — question types, distribution, response collection, all of it. And people still weren't really using it.

When we probed further we heard: *"It gives me all the features to collect data. But once I have the data, I can't do anything with it."* For which admins export everything and rebuild their analysis from scratch in Excel.

The real problem: they couldn't target the specific groups they cared about, and then slice and dice the responses.

The old audience picker had only 5-6 ways to slice people, so if the group they needed wasn't one of them, the tool couldn't do the job and admins went and used a different one that could.

So that's what we're fixing now. Taking the audience picker to 12 parameters and adding the ability to filter responses by manager and title too.

The tool did 80% of the job. But the user's purpose was the full 100%. And a product that solves most of the purpose gets treated the same as one that solves none of it.`,
    tags: ["B2B", "SaaS", "Users", "Insights"],
  },
  {
    id: "ai-can-help-users-understand",
    number: 4,
    title: "AI can help users understand, not just do.",
    body: `While improving our employee selection feature, I explored a few ways AI could help.

The obvious one was an input box where people could enter their criteria and let AI make the selection. But the person would still have to review whether AI had applied the criteria correctly.

So I tried a different approach: use AI to summarize the selection instead. The AI doesn't make the decision. It tells the user what they've selected, so they can review and feel confident about it.

This made me think that AI doesn't always need to take over a task, sometimes, it can make the user understand their own actions.`,
    media: {
      type: "video",
      src: "/writing/employee-selector.mp4",
      alt: "Adding include and exclude conditions to a survey audience, with an AI summary describing the selection as it changes.",
    },
    tags: ["B2B design", "AI workflows", "Learning"],
  },
  {
    id: "small-tagging-problem",
    number: 5,
    title: "A small tagging problem was making customer insights harder to find.",
    body: `While working on a user research tool, I noticed that people would create new tags for the same problem when analyzing multiple calls.

You'd see things like:

- Slow load times
- Slow page loading
- Pages load slowly
- Long load times

They were essentially talking about the same thing, but each became a separate tag. Over time, users could end up with 100+ tags, many of which were used only once. So even though they had a lot of data, it was difficult to spot patterns across calls.

When I introduced Projects, I made it easier to see and select from existing Tags from the individual call screen.

This solved two problems:

**Fewer duplicate tags.** People could reuse existing tags instead of creating slightly different versions of the same thing.

**Better patterns.** When the same problems were tagged consistently across calls, it became much easier to spot patterns in what users were saying.

It was a relatively small change, but it made the data much more useful. This also made the out of sight, out of mind problem much clearer to me wrt design.`,
    media: {
      type: "image",
      src: "/writing/project-tags.png",
      alt: "Five near-duplicate project tags about slow loading collapse into two: Slow Load Time and Onboarding Challenge.",
    },
  },
  {
    id: "bad-design-comes-down-to-care",
    number: 6,
    title: "Bad design comes down to care.",
    body: `We usually attribute bad design to things like priorities, taste, resources, and timelines.

But I think, in most cases, it comes down to care. Care for the people who will be using the design and the contexts they'll be using it in.

A lot of design feels dated or poorly thought out because it doesn't account for the people it's meant for.

And once we understand how much the companies making these products actually care about their users, the state of things becomes pretty evident.

Good design starts with caring about the people who'll use it at the end of the day.`,
  },
];
