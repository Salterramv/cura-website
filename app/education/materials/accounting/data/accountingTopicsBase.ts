export type AccountingBlock = {
  title: string
  items: string[]
}

export type AccountingQuizQuestion = {
  question: string
  options: string[]
  answer: number
}

export type AccountingPracticeSet = {
  title: string
  question: string
  answer: string
}

export type AccountingTopic = {
  slug: string
  title: string
  standard: string
  blocks: AccountingBlock[]
  quiz: AccountingQuizQuestion[]
  practice: AccountingPracticeSet[]
}

export const accountingTopics: AccountingTopic[] = [
  {
    "slug": "published-accounts",
    "title": "Published Accounts & Financial Statement Presentation",
    "standard": "IAS 1 / IAS 7",
    "blocks": [
      {
        "title": "IAS 1: Presentation of Financial Statements",
        "items": [
          "According to IAS 1 Presentation of Financial Statements, a complete set of financial statements has the following components:",
          "1. Statement of Financial Position (Balance Sheet)",
          "2. Statement of Comprehensive Income can be shown either as",
          "• A single statement     • Statement of Profit or Loss and Other Comprehensive Income",
          "• A Statement of Profit or Loss, immediately followed by;",
          "• Two statements",
          "• A Statement of Comprehensive Income starting with profit or loss",
          "3. Statement of Changes in Equity",
          "4. Statement of Cash Flows",
          "5. Accounting Policies and Explanatory Notes",
          "Other reports and statements in the annual report (such as a financial review, or an environmental report) are outside the scope of IAS 1."
        ]
      },
      {
        "title": "The statement of financial position",
        "items": [
          "Assets IAS 1 says that an entity must classify an asset as current on the statement of financial position if it:",
          "• is realised or consumed during the entity’s normal trading cycle, or",
          "• is held for trading, or",
          "• will be realised within 12 months of the reporting date.",
          "All other assets are classified as non-current.",
          "Liabilities IAS 1 says that an entity must classify a liability as current on the statement of financial position if it:",
          "• is settled during the entity’s normal trading cycle, or",
          "• is held for trading, or",
          "• will be settled within 12 months of the reporting date.",
          "All other liabilities are classified as non-current."
        ]
      },
      {
        "title": "The statement of profit or loss and other comprehensive income",
        "items": [
          "• Other comprehensive income (OCI) are income and expenses recognized outside of profit or loss, as required by particular IFRS Standards.",
          "• Total comprehensive income (TCI) is the total of the entity's profit or loss and other comprehensive income for the period.",
          "IAS 1 requires that OCI is classified into two groups as follows:",
          "• items that might be reclassified (or recycled) to profit or loss in subsequent accounting periods:",
          "– foreign exchange gains and losses arising on translation of a foreign operation (IAS 21)",
          "– effective parts of cash flow hedging arrangements (IFRS 9)",
          "– Remeasurement of investments in debt instruments that are classified as fair value through OCI (IFRS 9)",
          "• items that will not be reclassified (or recycled) to profit or loss in subsequent accounting periods:",
          "– changes in revaluation surplus (IAS 16 & IAS 38)",
          "– remeasurement components on defined benefit plans (IAS 19)",
          "– remeasurement of investments in equity instruments that are classified as fair value through OCI (IFRS 9).",
          "Reference - Page 41"
        ]
      },
      {
        "title": "The statement of profit or loss and other comprehensive income",
        "items": [
          "• IAS 1 requires an entity to disclose income tax relating to each component of OCI. This may be achieved by either:",
          "• disclosing each component of OCI net of any related tax effect, or",
          "• disclosing OCI before related tax effects with one amount shown for tax."
        ]
      },
      {
        "title": "Statement of changes in equity",
        "items": [
          "• IAS 1 requires all changes in equity arising from transactions with owners in their capacity as owners to be presented separately from non-owner changes in equity. This would include:",
          "✓ issues of shares",
          "✓ dividends.",
          "• A comparative statement for the prior period must also be published.",
          "Reference - Page 43"
        ]
      },
      {
        "title": "General features of financial statements",
        "items": [
          "• The Conceptual Framework states that financial statements are normally prepared on the assumption that the reporting entity will continue for the foreseeable future. In other words, it is assumed the entity will not enter liquidation, or cease to trade.",
          "• IAS 1 states that management should assess whether the going concern assumption is appropriate. Management should take into account all available information about events within at least twelve months of the end of the reporting period.",
          "• The following are indicators of a going concern uncertainty:",
          "✓ A lack of cash and cash equivalents",
          "✓ Increased levels of overdrafts and other forms of short-term borrowings",
          "✓ Major debt repayments due in the next 12 months",
          "✓ A rise in payables days",
          "✓ Increased levels of gearing",
          "✓ Negative cash flows, particularly in relation to operating activities",
          "✓ Disclosures or provisions relating to material legal claims",
          "✓ Large impairment losses."
        ]
      },
      {
        "title": "General features of financial statements",
        "items": [
          "Accruals basis of accounting The accruals basis of accounting means that transactions and events are recognised when they occur, not when cash is received or paid for them.",
          "Consistency of presentation The presentation and classification of items in the financial statements should be retained from one period to the next unless:",
          "• it is clear that a change will result in a more appropriate presentation, or",
          "• a change is required by an IFRS or IAS Standard.",
          "Materiality and aggregation An item is material if its omission or misstatement could influence the economic decisions of users taken on the basis of the financial statements. This could be based on the size or nature of an omission or misstatement. When assessing materiality, entities should consider the characteristics of the users of its financial statements. It can be assumed that these users have knowledge of business and accounting. To aid user understanding, financial statements should show material classes of items separately. Immaterial items may be aggregated with amounts of a similar nature, as long as this does not reduce understandability."
        ]
      },
      {
        "title": "General features of financial statements",
        "items": [
          "Offsetting IAS 1 says that assets and liabilities, and income and expenses, should only be offset when required or permitted by an IFRS standard.",
          "Comparative information Comparative information for atleast previous period should be disclosed."
        ]
      },
      {
        "title": "Disclosures",
        "items": [
          "Disclosure note presentation IAS 1 says that entities must present their disclosure notes in a systematic order. This might mean:",
          "• Giving prominence to the most relevant areas",
          "• Grouping items measured in similar ways, such as assets held at fair value",
          "• Following the order in which items are presented in the statement of profit or loss and the statement of financial position.",
          "Compliance with IFRS Standards Entities should make an explicit and unreserved statement that their financial statements comply with IFRS Standards.",
          "Accounting policies Entities must produce an accounting policies disclosure note that details:",
          "• the measurement basis (or bases) used in preparing the financial statements (e.g. historical cost, fair value, etc)",
          "• each significant accounting policy.",
          "Sources of uncertainty An entity should disclose information about the key sources of estimation uncertainty that may cause a material adjustment to assets and liabilities within the next year, e.g. key assumptions about the future."
        ]
      },
      {
        "title": "Disclosures",
        "items": [
          "Reclassification adjustments",
          "• Reclassification adjustments are amounts 'recycled' from other comprehensive income to profit or loss.",
          "• IAS 1 requires that reclassification adjustments are disclosed, either on the face of the statement of profit or loss and other comprehensive income or in the notes."
        ]
      },
      {
        "title": "Criticisms of the use of other comprehensive income",
        "items": [
          "The accounting treatment and guidance with respect to other comprehensive income (OCI) has been criticised in recent years. Some of these criticisms are as follows:",
          "• Many users ignore OCI, since the gains and losses reported there are not related to an entity’s trading cash flows. As a result, material expenses presented in OCI may not be given the attention that they require.",
          "• Reclassification from OCI to profit or loss results in profits or losses being recorded in a different period from the change in the related asset or liability. This contradicts the definitions of income and expenses in the Conceptual Framework"
        ]
      },
      {
        "title": "IAS 34 Interim Financial Reporting",
        "items": [
          "• Interim financial reports are prepared for a period shorter than a full financial year. Entities may be required to prepare interim financial reports under local law or listing regulations.",
          "• IAS 34 does not require the preparation of interim reports, but sets out the principles that should be followed if they are prepared and specifies their minimum content.",
          "• Financial information is more useful to primary user groups if it is published on a timely basis. Interim financial reports provide up-to-date information on the performance, position and cash flows of an entity for the period-to-date.",
          "• This information helps users react more quickly to positive or negative changes during the financial year."
        ]
      },
      {
        "title": "Components of interim reports",
        "items": [
          "An interim financial report should include, as a minimum, the following components:",
          "• condensed statement of financial position as at the end of the current interim period, with a comparative statement of financial position as at the end of the previous financial year",
          "• condensed statement of profit or loss and other comprehensive income for the current interim period and cumulatively for the current financial year to date (if, for example the entity reports quarterly), with comparatives for the interim periods (current and year to date) of the preceding financial year",
          "• condensed statement showing changes in equity. This statement should show changes in equity cumulatively for the current year to date with comparatives for the corresponding period of the preceding financial year",
          "• condensed statement of cash flows cumulatively for the current year to date, with a comparative statement to the same date in the previous year",
          "• selected explanatory notes",
          "• basic and diluted EPS should be presented on the face of interim statements of profit or loss and other comprehensive income for those entities within the scope of IAS 33 Earnings per Share."
        ]
      },
      {
        "title": "Accounting policies",
        "items": [
          "• The same accounting policies should be applied in an entity’s interim financial statements as are applied in its annual financial statements.",
          "• Measurement should be made on a year-to-date basis (last quarter values + this quarter values)",
          "• Interim financial statements are likely to rely more heavily on estimation methods than annual financial reports."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Statement of Financial Position",
          "Statement of Changes in Equity",
          "Statement of Profit or Loss; OR",
          "Statement of Profit or Loss and Other Comprehensive Income"
        ],
        "answer": 0
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Statement of Profit or Loss; OR",
          "Statement of Profit or Loss and Other Comprehensive Income",
          "IAS 1 Presentation of Financial Statements states that a complete set of financial statements comprises:",
          "Statement of Changes in Equity"
        ],
        "answer": 3
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "IAS 1 Presentation of Financial Statements states that a complete set of financial statements comprises:",
          "a statement of financial position",
          "Statement of Profit or Loss; OR",
          "Statement of Profit or Loss and Other Comprehensive Income"
        ],
        "answer": 2
      }
    ],
    "practice": []
  },
  {
    "slug": "conceptual-framework-fair-value",
    "title": "Conceptual Framework & Fair Value",
    "standard": "Conceptual Framework / IFRS 13",
    "blocks": [
      {
        "title": "Conceptual Framework",
        "items": [
          "• A conceptual framework is a set of theoretical                                     CONCEPTUAL FRAMEWORK",
          "principles and concepts that underlie the preparation and presentation of financial statements.",
          "CONCEPTUAL FRAMEWORK",
          "• If no conceptual framework existed, then accounting                                    INTERNATIONAL",
          "FINANCIAL",
          "standards would be produced on a haphazard basis as                                      REPORTING",
          "STANDARDS",
          "particular issues and circumstances arose. These accounting standards might be inconsistent with one another, or perhaps even contradictory. FINANCIAL",
          "• A strong conceptual framework means that there are                                      STATEMENT",
          "principles in place from which all future accounting standards draw. It also acts as a reference point for the preparers of financial statements if no accounting CONCEPTUAL FRAMEWORK standard governs a particular transaction (although this will be extremely rare)."
        ]
      },
      {
        "title": "Conceptual Framework: Background",
        "items": [
          "• The Framework for the Presentation and Preparation of Financial Statements was issued in 1989.",
          "• In 2004 the Board and the US Financial Accounting Standards Board (FASB) started a joint project to revise their respective frameworks. As a result of this project the Board issued the Conceptual Framework for Financial Reporting in 2010. Most of the text from the 1989 Framework was simply rolled over but two chapters were revised. These covered:",
          "• The objective of financial reporting",
          "• The qualitative characteristics of useful financial information.",
          "• The Board and the FASB subsequently suspended work on this joint project."
        ]
      },
      {
        "title": "Conceptual Framework: Background",
        "items": [
          "• Several criticisms emerged of the 2010 Conceptual Framework:",
          "• It did not cover certain areas, such as derecognition, and presentation and disclosure",
          "• Guidance in some areas was unclear, such as with regards to measurement uncertainty",
          "• Some aspects were out of date, such as recognition criteria for assets and liabilities.",
          "• As a result of criticism, the Conceptual Framework was identified as a priority project so, in 2012, the Board restarted this project without the FASB.",
          "• A Discussion Paper outlining the Board’s thinking was published in 2013 and an Exposure Draft of the proposed amendments was published in 2015. Feedback from these documents informed the revised Conceptual Framework, which was published in 2018."
        ]
      },
      {
        "title": "What does the Conceptual Framework Cover?",
        "items": [
          "• The Framework covers the following topics:",
          "✓ Purpose of the framework",
          "✓ The objectives of general purpose financial reporting",
          "✓ Qualitative characteristics of useful financial information",
          "✓ Financial statements and the reporting entity",
          "✓ The elements of the financial statements",
          "✓ Recognition and derecognition",
          "✓ Measurement",
          "✓ Presentation and disclosure",
          "✓ Concepts of capital and capital maintenance."
        ]
      },
      {
        "title": "Purpose of the Conceptual Framework",
        "items": [
          "• According to the Framework, its purpose is to:",
          "1. assist the International Accounting Standards Board (Board) to develop IFRS Standards (Standards) that are based on consistent concepts",
          "2. assist preparers to develop consistent accounting policies when no IFRS Standard applies to a particular transaction or other event, or when an IFRS Standard allows a choice of accounting policy",
          "3. assist all parties to understand and interpret IFRS Standards.",
          "• The Framework is not an accounting standard and does not override the requirements of any IFRS Standards"
        ]
      },
      {
        "title": "Objective of General Purpose Financial Reporting",
        "items": [
          "• The Conceptual Framework states that the purpose of financial reporting is to provide information to current and potential investors, lenders and other creditors that will enable them to make decisions about providing economic resources to an entity.",
          "• Decisions relating to providing resources to an entity include whether or not to:",
          "– buy, sell or hold equity and debt instruments",
          "– provide or settle loans and other forms of credit",
          "– exercise the rights to vote on, or otherwise influence, management’s actions that affect the use of the entity’s economic resources.",
          "• If investors, lenders and creditors are going to make these decisions then they require information that will help them to assess:",
          "1. an entity’s potential future cash flows, and",
          "2. management’s stewardship of the entity’s economic resources.",
          "• To assess an entity’s future cash flows, users need information about:",
          "1. economic resources of the entity e.g. assets",
          "2. economic claims against the entity e.g. liabilities and equity",
          "3. changes in economic resources and claims e.g. income and expenses."
        ]
      },
      {
        "title": "Qualitative Characteristics of Useful financial information",
        "items": [
          "Fundamental Qualitative Enhancing Qualitative",
          "Characteristics           Characteristics",
          "Relevance               Comparability",
          "Faithful Representation        Verifiability",
          "Timeliness",
          "Understandability"
        ]
      },
      {
        "title": "Fundamental Qualitative Characteristics",
        "items": [
          "Relevance Relevant financial information is capable of making a difference in the decisions made by users. Relevant information has",
          "1. Predictive value,",
          "2. Confirmatory value, or both",
          "Materiality is an entity-specific aspect of relevance based on the nature or magnitude. Information is material if its omission or misstatement could influence economic decisions of users taken on basis of financial statements",
          "Faithful Representation",
          "Information represent faithfully the transactions and other events that it claims to represent. Faithful representation means representation of the economic substance of a transaction and not its legal form only",
          "A faithful representation seeks to maximize the underlying characteristics of :",
          "1. Completeness",
          "2. Neutrality - free from bias",
          "3. Freedom from error"
        ]
      },
      {
        "title": "Completeness",
        "items": [
          "• To be understandable information must contain all the necessary descriptions and explanations.",
          "Neutrality",
          "• Information must be neutral, i.e. free from bias. Financial statements are not neutral if, by the selection or presentation of information, they influence the making of a decision or judgement in order to achieve a predetermined result or outcome.",
          "• Neutrality is underpinned by the application of prudence. Prudence is an accounting mind-set which favours caution in situations of uncertainty and judgement. Practically applications of prudence can lead to judgemental liabilities being recorded more readily than uncertain assets.",
          "Free from error",
          "• Information must be free from error within the bounds of materiality. A material error or an omission can cause the financial statements to be false or misleading and thus unreliable and deficient in terms of their relevance",
          "• Free from error does not mean perfectly accurate in all respects. For example, where an estimate has been used the amount must be described clearly and accurately as being an estimate. This phenomena is described as measurement uncertainty."
        ]
      },
      {
        "title": "• When preparing financial reports, preparers should exercise prudence. Prudence means that assets",
        "items": [
          "and income are not overstated and liabilities and expenses are not understated. However, this does not mean that assets and income should be purposefully understated, or liabilities and expenses purposefully overstated. Such intentional misstatements are not neutral."
        ]
      },
      {
        "title": "Enhancing Qualitative Characteristics",
        "items": [
          "Timeliness",
          "• Timeliness means that information is available to decision-makers in time to be capable of influencing their decisions",
          "• Generally, older the information is the less useful it becomes",
          "Understandability",
          "• Classifying, characterising and presenting information clearly and concisely makes it understandable",
          "• While some transactions are inherently complex and cannot be made easy to understand, to exclude such information would make financial reports incomplete and potentially misleading",
          "• Financial reports are prepared for users who have a reasonable knowledge of business and economic activities and who review and analyze the information with diligence"
        ]
      },
      {
        "title": "Enhancing Qualitative Characteristics",
        "items": [
          "Verifiability",
          "• Verifiability means that different knowledgeable and independent observers could reach consensus, although not necessarily complete agreement, that a particular depiction is a faithful representation",
          "• Verification can be direct or indirect Direct verification - verifying amounts or other representations through direct observations",
          "E.g. – Counting cash at a specific date Indirect Verifications - checking the inputs to a model, formula or other technique and recalculating the output",
          "E.g. – Recalculating inventory amounts using the FIFO method",
          "Comparability",
          "• Information about a reporting entity is more useful if it can be compared with a similar information about other entities and with similar information about the same entity for another period or another date",
          "• Comparability enables users to identify and understand similarities in, and differences among, items"
        ]
      },
      {
        "title": "Cost Constraint",
        "items": [
          "• Producing financial reports takes time and costs money.",
          "• When developing IFRS Standards, the Board assesses whether the benefits of reporting particular information outweigh the costs involved in providing it."
        ]
      },
      {
        "title": "Going Concern Assumption",
        "items": [
          "• It is the underlying concept in preparing financial statements",
          "• Financial statements are normally prepared on the assumption that the reporting entity is a going concern and will continue in operation for the foreseeable future",
          "• The foreseeable future is not strictly defined but can be generally considered as being a period of greater than 12 months",
          "• The financial statements are prepared under the assumption that the entity neither has an intention nor the need to liquidate or significantly reduce the scale of its operations.",
          "• If the business was not deemed to be a going concern, the financial statements would be prepared on the break-up basis e.g. all assets are valued using realisable values and no ‘non-current’ classifications can be used"
        ]
      },
      {
        "title": "Reporting Entity",
        "items": [
          "• The Framework defines a reporting entity as an entity that chooses to or is required by law to prepare financial statements.",
          "• A reporting entity can be a single entity or can comprise of more than one entity. Financial statements produced for two or more entities that are not parent/subsidiaries are called ‘combined financial statements’. It can be difficult in these circumstances to determine the boundary of the reporting entity. Note that the Conceptual Framework does not stipulate how or when to prepare combined financial statements, although the Board may develop a standard on this issue in the future.",
          "• If an entity (parent) has control over another entity (subsidiary), two options for the preparation of the financial statements exist",
          "• If a reporting entity comprises both the parent and its subsidiaries, the reporting entity’s financial statements are referred to as ‘consolidated financial statements’",
          "• If a reporting entity is the parent alone, the reporting entity’s financial statements are referred to as ‘unconsolidated financial statements’."
        ]
      },
      {
        "title": "Elements of Financial Statements",
        "items": [
          "Statement of            Statement of",
          "Profit Or Loss        Financial Position",
          "Income                      Assets",
          "Expenses       Liabilities            Equity"
        ]
      },
      {
        "title": "Elements of Financial Statements",
        "items": [
          "Assets An asset is a present economic resource controlled by the entity as a result of past events An economic resource is a right that has the potential to produce economic benefits",
          "Right",
          "• a right that generates economic resource could take many forms. For instance, an entity may have the right to receive cash, to receive goods or services or to use an asset",
          "• Rights are often created through contracts and legislation but can also be created through another entity’s past practice. Potential to produce future economic benefit",
          "• The right must have the potential for economic benefits. For that potential to exist, it does not need to be certain, or even likely that the right will produce economic benefits",
          "• It is only necessary that the right already exists and that, in at least one circumstance, it would produce for the entity economic benefits beyond those available to all other parties. However, whether the resource is recognised as an asset is dependent upon the recognition criteria outlined within the Framework"
        ]
      },
      {
        "title": "Elements of Financial Statements",
        "items": [
          "Control",
          "• An entity controls an economic resource if it has the present ability to direct the use of the economic resource and obtain the economic benefits that may flow from it",
          "• Control is the ability to obtain the economic benefits and to restrict the access to others (e.g. by an entity being the sole user of its plant and machinery, or by selling surplus plant and machinery)",
          "• An asset does not have to be legally owned, the key factor is whether the entity has control over the future economic benefits that the item will provide. A leased vehicle could therefore be an asset."
        ]
      },
      {
        "title": "Elements of Financial Statements",
        "items": [
          "Liabilities Liability is a present obligation of the entity to transfer an economic resource as a result of past events",
          "Obligation",
          "• An obligation is a duty or responsibility that an entity has no practical ability to avoid. These may be legal or constructive",
          "• A constructive obligation is an obligation which is the result of expected practice rather than required by law or legal contract",
          "Transfer of economic resource",
          "• This could be a transfer of cash, of other property or the provision of a service."
        ]
      },
      {
        "title": "Elements of Financial Statements",
        "items": [
          "Present obligation as a result of past events",
          "• A present obligation exists as a result of past events only if:",
          "– the entity has already obtained economic benefits or taken an action and,",
          "– as a consequence, the entity may have to transfer an economic resource that it would not otherwise have had to transfer. e.g. acceptance of a loan into an entity’s bank account creates the right to demand repayment of the balance and, as such, a liability exists."
        ]
      },
      {
        "title": "Elements of Financial Statements",
        "items": [
          "Equity Equity is the residual interest in the assets of the entity after deducting all its liabilities",
          "Income Incomes are increases in assets or decreases in liabilities that result in increases in equity, other than those relating to contributions from equity participants",
          "Expenses Expenses are decreases in assets or increases in liabilities that result in decreases in equity, other than those relating to distributions to equity participants"
        ]
      },
      {
        "title": "Recognition",
        "items": [
          "To be recognised in the financial statements, items must:",
          "– meet the definitions of one of the elements of the financial statements",
          "– provides relevant information regarding the particular element",
          "– provides a faithful representation of the particular element",
          "Relevance Indications that the information regarding an element is not relevant include:",
          "• it is uncertain whether an asset or liability exists or",
          "• an asset or liability exists, but the probability of an inflow or outflow of economic benefits is low",
          "Faithful representation Whether the information regarding an element would provide a faithful representation is linked to the ability to measure the element. If there is very high measurement uncertainty (e.g. an exceptionally wide range of possible outcomes with probabilities that are exceptionally difficult to estimate) then it could be argued that the inclusion of the element would not provide a faithful representation."
        ]
      },
      {
        "title": "Recognition",
        "items": [
          "• Judgement is required in deciding if recognition of an element is appropriate. This is why specific recognition criteria vary from one IFRS Standard to another.",
          "• If an asset or liability is not recognised, disclosures may be required to ensure users fully understand the reporting entity’s economic transactions and the implications that these may have on future earnings and future cash flows."
        ]
      },
      {
        "title": "Derecognition",
        "items": [
          "• Derecognition is the removal of all or part of a recognised asset or liability from an entity’s statement of financial position. Derecognition normally occurs when that item no longer meets the definition of an asset or of a liability",
          "• Asset - Derecognition normally occurs when the entity loses control of all or part of the recognised asset.",
          "• Liability - Derecognition normally occurs when the entity no longer has a present obligation for all or part of the recognised liability",
          "• Accounting for derecognition should faithfully represent the changes in an entity’s net assets, as well as any assets or liabilities retained.",
          "• This is achieved by:",
          "• derecognising any transferred, expired or consumed component",
          "• recognising a gain or loss on the above, and",
          "• recognising any retained component.",
          "• Sometimes an entity might appear to have transferred an asset or liability. However, derecognition would not be appropriate if exposure to variations in the element’s economic benefits is retained."
        ]
      },
      {
        "title": "Measurement of Elements of Financial Statements",
        "items": [
          "• When recognised in the financial statements, elements must be quantified in monetary terms.",
          "• The Conceptual Framework outlines two broad measurement bases:",
          "• Historical cost",
          "• Current value (this includes fair value, value-in-use, and current cost)",
          "Selecting a measurement base",
          "• The information provided to users by the measurement base must be useful. In other words it must be relevant and offer a faithful representation of the transactions that have occurred.",
          "• When selecting a measurement basis, the Conceptual Framework states that relevance is maximised if the following are considered:",
          "• The characteristics of the asset and/or liability",
          "• The ways in which the asset and/or liability contribute to future cash flows.",
          "• This applies to the Board when developing or revising an IFRS Standard. It also applies to preparers of financial statements when applying an IFRS Standard that permits a choice of measurement bases."
        ]
      },
      {
        "title": "Presentation and Disclosure",
        "items": [
          "Effective presentation and disclosure",
          "• Effective presentation and disclosure is a balance between allowing entities to flexibly report relevant information about their financial performance and position, and requiring information that enables comparisons to be drawn year-on- year and with other entities.",
          "• The Board believes that:",
          "• entity specific information is more useful than standardised descriptions",
          "• duplication makes financial information less understandable.",
          "Classification",
          "• Classification of an asset or liability into separate components may provide relevant information if the components have different characteristics."
        ]
      },
      {
        "title": "Presentation and Disclosure",
        "items": [
          "• Offsetting classifies dissimilar items together and is therefore generally not appropriate."
        ]
      },
      {
        "title": "Presentation and Disclosure",
        "items": [
          "Aggregation",
          "• Aggregation refers to the adding together of items that have shared characteristics.",
          "• Aggregation is useful because it summarises information that would otherwise be too detailed. However, too much aggregation obscures relevant information.",
          "• Different levels of aggregation will be required throughout the financial statements. For example, the statement of profit or loss may be heavily aggregated, but accompanying disclosure notes will disaggregate the information."
        ]
      },
      {
        "title": "Presentation and Disclosure",
        "items": [
          "Profit or loss and other comprehensive income",
          "• The Conceptual Framework states that the statement of profit or loss is the primary source of information about an entity’s financial performance. As such, income and expenses should normally be recognised in this statement.",
          "• When developing or revising standards, the Board notes that it might require an income or expense to be presented in other comprehensive income if it results from remeasuring an item to current value and if this means that:",
          "• profit or loss provides more relevant information, or",
          "• a more faithful representation is provided of an entity’s performance.",
          "• Income and expenditure included in other comprehensive income should be reclassified to profit or loss when doing so results in profit or loss providing more relevant information. However, the Board may decide that reclassification is not appropriate if there is no clear basis for identifying the amount or timing of the reclassification."
        ]
      },
      {
        "title": "Criticisms of financial reporting",
        "items": [
          "• The Conceptual Framework provides a principles-based approach to financial reporting. However, users are increasingly critical of the very nature of financial reporting. As a result, new forms of non-financial reporting have emerged, which are discussed later.",
          "• Some of the criticisms of financial reporting are discussed below. Historical information",
          "• The statement of profit or loss shows the performance of the entity over the past reporting period. However, investors are more interested in future profits. Moreover by the time financial statements are published, the information presented will be several months out of date. Unrecognised assets and liabilities",
          "• Some assets and liabilities are not recognised in financial statements prepared using IFRS Standards, such as internally generated goodwill. A company’s reputation and its employee’s skills play a pivotal role in its success but these are unrepresented on the statement of financial position.",
          "Clutter",
          "• Financial reports have been criticised in recent years for becoming increasingly cluttered as a result of extensive disclosure requirements. These disclosures can be very generic and they make it harder for the users to find relevant information."
        ]
      },
      {
        "title": "Criticisms of financial reporting",
        "items": [
          "Financial/non-financial information",
          "• Current and past profits and cash flows are not the only determinate of future success. Long-term success is also dependent on how an entity is governed, the risks to which it is exposed and how well these are managed, and whether its business activities are sustainable into the medium and long-term. Financial statements prepared in accordance with IFRS Standards say little about these areas.",
          "Estimates",
          "• Financial reporting uses many estimates (e.g. depreciation rates). Estimates are subjective and could be manipulated in order to achieve particular profit targets. The subjective nature of estimates reduces comparability between companies. The statement of cash flows somewhat compensates for the impact of accounting estimates. However, the cash position of an entity can also be window-dressed (such as by delaying payments to suppliers).",
          "Professional judgement",
          "• Financial reporting requires judgement. For example, judgement is required by lessors when classifying a lease as a finance lease or an operating lease. Subjective decisions reduce comparability and increase the risk of bias."
        ]
      },
      {
        "title": "Criticisms of financial reporting",
        "items": [
          "Use of historical cost",
          "• Some accounting standards, such as IAS 16 Property, Plant and Equipment, permit assets to be measured at historical cost. In times of rising prices, the statement of profit or loss will not show a sustainable level of profit.",
          "Policy choices",
          "• Some standards, such as IAS 16 Property, Plant and Equipment and IAS 40 Investment Properties, allow entities to choose between cost and fair value models. This makes it harder to investors to compare financial statements on a like-for-like basis."
        ]
      },
      {
        "title": "IFRS 13 Fair Value Measurement",
        "items": [
          "Fair value is the price that would be",
          "✓ Received to sell an asset or",
          "✓ Paid to transfer a liability in an orderly transaction between market participants at the measurement date",
          "Buyers and sellers who are",
          "• independent (not related to each other as per IAS 24)",
          "• knowledgeable about the asset/ liability",
          "• willing (not forced) and able to buy/sell",
          "• Fair Value is an Exit Price (price at which you get rid of an asset or a liability)"
        ]
      },
      {
        "title": "Orderly Transaction",
        "items": [
          "• It is generally assumed that the asset or liability was exchanged between market participants is an orderly",
          "transaction. However, there are circumstances in which an         For certain types of assets, such as",
          "entity needs to assess whether a transaction is orderly.          liquid financial instruments (e.g.",
          "• Circumstances that may indicate that a transaction is not         actively traded shares), the usual",
          "orderly include the following.                                    and customary market exposure",
          "may be short.",
          "• There was inadequate exposure to the market to",
          "allow usual and customary marketing activities.               In other situations (e.g. real estate",
          "• The seller marketed the asset or liability to a single        assets), a longer market exposure",
          "market participant.                                           would be required to generate",
          "interest, contact potential buyers,",
          "• The seller is in distress/ The seller was forced to sell to conduct negotiations, complete due",
          "meet regulatory or legal requirements.                        diligence and complete legal",
          "• The transaction price is an outlier compared with             agreements",
          "other recent transactions for identical or similar items."
        ]
      },
      {
        "title": "Fair Value: Approaches",
        "items": [
          "• IFRS 13 notes that there are various approaches to determining the fair value of an asset or liability:",
          "1. Market approaches (valuations based on recent sales prices)",
          "2. Cost approaches (valuations based on replacement cost)",
          "3. Income approaches (valuations based on financial forecasts).",
          "• Whatever approach is taken, the aim is always the same – to estimate the price that would be transferred in a transaction with a market participant."
        ]
      },
      {
        "title": "Measurement",
        "items": [
          "• Fair value is a market-based measurement, not an entity-specific measurement. Therefore, fair value is measured using the assumptions that market participants would use when pricing the asset under current market conditions taking into account any relevant characteristics of the asset",
          "• For example, the fact that an entity asserts that prices in orderly transactions are too low relative to its own value expectations, and accordingly that it would be unwilling to sell at such prices, is not relevant",
          "• When measuring fair value an entity shall take into account any relevant characteristics of the asset or liability. Such characteristics include, for example, the following:",
          "✓ The condition and location of the asset; and",
          "✓ Restrictions, if any, on the sale or use of the asset",
          "• It is important to distinguish a characteristic of an asset or liability from a characteristic arising from an entity's holding of the asset or liability, which is an entity-specific characteristic."
        ]
      },
      {
        "title": "Measurement",
        "items": [
          "• Company B acquired a plot of land currently used as storage space for its factory in a business combination. As a condition of the acquisition, B is not allowed to change the use of the land for five years. However, the area in which the property is located has recently been re-zoned, and other land nearby has been redeveloped as residential property.",
          "• B has received legal advice that although it is restricted under the terms of the acquisition from changing the current use of the land, the land could be sold to a third party who would not be bound by the restriction. For this reason, B concludes that the restriction is a characteristic of the current holder rather than of the asset itself, and would not be considered in measuring the fair value of the land."
        ]
      },
      {
        "title": "Measurement",
        "items": [
          "• Fair value of non-financial assets are determined based on the highest and best use of the asset from the perspective of a market participant",
          "• The highest and best use should take into account uses that are:",
          "1. physically possible",
          "2. legally permissible",
          "3. financially feasible",
          "• IFRS 13 says a use can be legally permissible even if it is not legally approved.",
          "• Company X acquired a brewery that is located in an area that has recently been re-zoned to allow both residential and industrial use. X determines that market participants would take into account the potential to develop the brewery site for residential use in pricing the land on which the brewery is currently located.",
          "• Therefore, X measures the fair value of the land based on the higher of:",
          "1. the value of the land as currently developed as a brewery; and",
          "2. the value of the land as a vacant site for residential use, taking into account the costs of demolishing the brewery and other costs necessary to convert the land to a vacant site."
        ]
      },
      {
        "title": "Markets",
        "items": [
          "• The 'principal market' is the market with the greatest volume and level of activity for the asset or liability. A fair value measurement assumes that the transaction to sell the asset or to transfer the liability takes place in the principal market for the asset or liability.",
          "• The entity must be able to access the principal market at the measurement date. This means that the principal market for the same asset can differ between entities.",
          "• In the absence of a principal market, the transaction is assumed to take place in the most advantageous market for the asset or liability - one that maximises the net amount received from selling an asset (or minimises the amount paid to transfer a liability).",
          "• Transaction costs (such as legal and broker fees) will play a role in deciding which market is most advantageous. However, fair value is not adjusted for transaction costs because they are a characteristic of the market, rather than the asset",
          "• Transaction costs will be accounted for in accordance with other IFRSs"
        ]
      },
      {
        "title": "Markets",
        "items": [
          "• Fair value is however adjusted for transportation cost",
          "• Here transport cost is the cost of transporting an asset from its current location to the principal/ most advantageous market - For example, the fair value of crude oil held in the Arctic Circle would be adjusted for the cost of transporting the oil from the Arctic Circle to the principle market appropriate market"
        ]
      },
      {
        "title": "Fair Value Hierarchy",
        "items": [
          "• Inputs to valuation techniques are the assumptions that market participants would use in pricing the asset or liability.",
          "• To increase consistency and comparability, IFRS 13 establishes a fair value hierarchy based on the inputs to valuation techniques used to measure fair value",
          "• Level 1 inputs are preferred to Level 2 and Level 2 inputs are preferred to Level 3 inputs",
          "Level 1",
          "• Quoted prices (‘observable’) in active markets for identical assets and liabilities at the measurement date",
          "• This is regarded as providing the most reliable evidence of fair value and is likely to be used without adjustment",
          "• E.g. - To obtain the fair value of shares of a listed company, the market price of a share on the stock exchange at the measurement date can be used"
        ]
      },
      {
        "title": "Fair Value Hierarchy",
        "items": [
          "Level 2",
          "• Observable inputs (publicly available information), other than those included within Level 1 above, which are observable directly or indirectly",
          "✓ Quoted prices for similar (not identical) assets or liabilities in active markets",
          "✓ Prices for identical or similar assets and liabilities in inactive markets",
          "✓ Observable inputs that are not prices (such as interest rates).",
          "• Typically, they are likely to require some degree of adjustment to arrive at a fair value measurement"
        ]
      },
      {
        "title": "Fair Value Hierarchy",
        "items": [
          "Level 3",
          "• Unobservable inputs for an asset or liability, based upon the best information available, including information that may be reasonably available relating to market participants",
          "• An asset or liability is regarded as having been measured using the lowest level of inputs that is significant to its valuation",
          "• This include financial forecasts developed by the business – estimates of future cash flows"
        ]
      },
      {
        "title": "Fair Value Hierarchy",
        "items": [
          "TUU 5, TUU 6 - Homework"
        ]
      },
      {
        "title": "Fair Value",
        "items": [
          "TUU 3. TUU 5"
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "A conceptual framework is a set of theoretical principles and concepts that underlie the preparation and presentation of financial statements.",
          "The Framework covers the following topics:",
          "The objectives of general purpose financial reporting",
          "Qualitative characteristics of useful financial information"
        ],
        "answer": 0
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "The objectives of general purpose financial reporting",
          "Qualitative characteristics of useful financial information",
          "Financial statements and the reporting entity",
          "The Framework covers the following topics:"
        ],
        "answer": 3
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Financial statements and the reporting entity",
          "The elements of the financial statements",
          "The objectives of general purpose financial reporting",
          "Qualitative characteristics of useful financial information"
        ],
        "answer": 2
      }
    ],
    "practice": []
  },
  {
    "slug": "property-plant-equipment",
    "title": "Property, Plant and Equipment",
    "standard": "IAS 16",
    "blocks": [
      {
        "title": "Property, Plant and Equipment (PPE)",
        "items": [
          "1                                       2",
          "Property, plant and equipment are tangible assets held by an entity for more than one period (approx. more than 12 months) for use in the:",
          "1) Production or supply of goods or services,",
          "2) For rental to others, or                                  3",
          "3) For administrative purposes"
        ]
      },
      {
        "title": "Recognition",
        "items": [
          "• An item of property, plant and equipment should be recognized as an asset when:",
          "1. It is probable that future economic benefits associated with the asset will flow to the entity",
          "2. The cost of the asset can be measured reliably"
        ]
      },
      {
        "title": "Initial Measurement",
        "items": [
          "• An item of property, plant and equipment should Initially be measured at its Cost",
          "• Cost could include the following:",
          "11. Purchase price + Import duties + Non-refundable purchase taxes - Trade discounts and rebates",
          "22. All expenditure directly attributable to bringing the asset to the location and condition necessary for its intended use. 'Intended use' means being capable of operating in the manner intended by management",
          "i. Cost of site preparation ii. Initial delivery and handling costs iii. Installation costs iv. Professional fees such lawyers fees",
          "v.     Borrowing Costs"
        ]
      },
      {
        "title": "Initial Measurement",
        "items": [
          "As a result of testing recently purchased or constructed PPE, product samples might be produced that are sold. IAS 16 has been amended to require proceeds from such sales, as well cost of producing those items, to be recognised in the statement of profit or loss",
          "Previously IAS 16 required these proceeds to be deduced from the carrying amount of the PPE",
          "Other testing costs can still be capitalized",
          "33. The initial estimate of the cost of dismantling and removing the item and restoring the site, where there is an obligation to incur such costs The present value of these costs should be capitalized, with an equivalent liability set up The discount on this liability would then be unwound over the period until the costs are paid. This means that the liability increases by the interest rate each year, with the increase taken to finance costs in the statement of profit or loss"
        ]
      },
      {
        "title": "Dismantling Cost",
        "items": [
          "Following details relate to an oil rig built in the sea:",
          "● Cost of construction - $ 10 million ● Cost of dismantling - $4 million in 3 years",
          "● The relevant interest rate is 10% What is the cost to be capitalized?",
          "Year 1                        Year 2                     Year 3",
          "Dismantling Date/ Construction End of the Useful Date Life",
          "Present Value of the               4, 000,000",
          "=",
          "Dismantling Cost on                (1 + 0.1)3               Dismantling Cost",
          "the Construction Date                                          $4,000,000",
          "= 3,005,259"
        ]
      },
      {
        "title": "Dismantling Cost",
        "items": [
          "At the start of year 1",
          "• Double entry for the construction cost",
          "Dr Cost – Oil Rig              10,000,000",
          "Cr Cash                        10,000,000",
          "• Double entry for the dismantling cost:",
          "Dr Cost – Oil Rig              3,005,259",
          "Cr Dismantling Liability       3,005,259",
          "• Total cost of the oil rig = 10,000,000 + 3,005,259 = 13,005,259"
        ]
      },
      {
        "title": "Dismantling Cost",
        "items": [
          "At the end of year 1",
          "Year 1                    Year 2    Year 3",
          "Construction                                      Dismantling Date/ End of",
          "Date                                               the Useful Life",
          "Value of the Dismantling",
          "Liability               = 3,005,259 × (1 + 0.1)1",
          "1 year                  = 3,305,785",
          "Finance Cost       = 3,305,785 − 3,005,259",
          "= 300,526"
        ]
      },
      {
        "title": "Dismantling Cost",
        "items": [
          "At the end of year 1",
          "• Double entry to adjust the dismantling liability:",
          "Dr Finance Cost                                 300,526",
          "Cr Dismantling Liability                        300,526",
          "• Value of the dismantling liability: 3,305,785 (3,005,259 + 300,526)",
          "• Depreciation for year 1              13,005,259",
          "=                   = 4,335,086"
        ]
      },
      {
        "title": "Dismantling Cost",
        "items": [
          "Value of the dismantling liability",
          "At the beginning of year 1                       3,005,259",
          "At the end of year 1         (3,005,259 * 1.1)   3,305,785",
          "At the end of year 2         (3,305,785 * 1.1)   3,636,364",
          "At the end of year 3         (3,636,364 * 1.1)   4,000,000"
        ]
      },
      {
        "title": "Initial Measurement",
        "items": [
          "Examples of costs that are NOT Capitalized (no included in the cost of PPE) in relation to an item of PPE are:",
          "• Costs of opening a new facility",
          "• Costs of introducing a new product or service (including costs of advertising and promotional activities)",
          "• Costs of conducting business in a new location or with a new class of customer (including costs of staff training)",
          "• Costs incurred in the initial operating period (such as initial operating losses and any further costs incurred before a machine is used at its full capacity)",
          "• Costs of relocating/reorganising an entity’s operations",
          "• Administration and other general overhead costs",
          "• Abnormal waste"
        ]
      },
      {
        "title": "Subsequent Expenditure",
        "items": [
          "Subsequent expenditure on PPE should only be capitalized IF:",
          "1. It increases the economic benefits provided by the asset more than initially assessed amount This could be extending the asset's life, an expansion or increasing the productivity of the asset",
          "New amount of economic benefits",
          "Capitalize Initially assessed amount of economic benefits"
        ]
      },
      {
        "title": "Subsequent Expenditure",
        "items": [
          "Subsequent expenditure on PPE should only be capitalized IF:",
          "2. It is Replacing a component of a Complex asset Cost of the new component can be capitalized after the carrying amount of the current component has been written off as depreciation",
          "3. It relates to an Overhaul or required Major inspection of the asset The costs associated with this should be capitalized and depreciated over the time until the next overhaul or inspection",
          "• All other subsequent expenditure should be recognized in the P&L, because it merely maintains the economic benefits originally expected",
          "E.g. the cost of general repairs should be written off immediately (revenue expenditure)"
        ]
      },
      {
        "title": "Complex Assets – Component Accounting",
        "items": [
          "• Some assets are complex assets – made up of several components, and these components have different useful lives",
          "• Each separate component of the asset should be depreciated over that component’s useful life. The entire asset will still be shown as one asset",
          "• An item of property, plant and equipment is separated into parts (components) when those parts are significant in relation to the total cost of the item",
          "• If a component of a complex asset is replaced, the cost of the new component can be capitalized after the carrying amount of the current component has been written off as depreciation",
          "• A separate component may be either a physical component or a non-physical component like - a major inspection or overhaul",
          "• If the carrying amount of the replaced part is not known then the cost of the new replacement part can be used to estimate the cost of the replaced part when it was originally acquired."
        ]
      },
      {
        "title": "Complex Assets",
        "items": [
          "5 years 10 years",
          "20 years        Non-Physical Component",
          "Major Inspection/ Overhaul 3 years 10 years 5 years"
        ]
      },
      {
        "title": "Major Inspections and Overhauls",
        "items": [
          "• Inspection and overhaul costs are generally expensed as they are incurred when the benefits of such inspection and overhauls are limited to an year",
          "• However, Routine major inspections and overhauls are identified and accounted for as a separate component (capitalized) if that component is used over more than one period",
          "• Component accounting for inspection or overhaul costs is intended to be used only for Major expenditure that occurs at regular intervals over the life of an asset.",
          "• Costs associated with normal repairs and maintenance are expensed as they are incurred."
        ]
      },
      {
        "title": "Major Inspections and Overhauls - Example",
        "items": [
          "• Company X has just purchased a new ship for 800.",
          "• The useful life of the ship is 30 years, but it will be dry-docked every three years and a major overhaul carried out.",
          "• At the date of acquisition, the dry-docking costs for similar ships that are three years old are approximately 80.",
          "• Therefore, the cost of the dry-docking component for accounting purposes is 80 and this amount would be depreciated over the three years to the next dry-docking.",
          "• The remaining carrying amount, which may need to be split into further components, is",
          "720. Any additional components will be depreciated over their own estimated useful lives."
        ]
      },
      {
        "title": "Depreciation",
        "items": [
          "• When an item of PPE is purchased, that expenditure is capitalized as economic benefits from the PPE is expected to flow to the entity over a number of years. It would be inappropriate to charge the entire expenditure to the P&L in the year the asset is purchased",
          "• Instead the cost of the asset should be charged to the P&L over the period asset is expected to be used. This is called depreciation",
          "• Depreciation is the systematic allocation of the depreciable amount of an asset over its useful life",
          "Cost of an asset",
          "Depreciable Amount = (or other amount                   -   Residual Value.",
          "substituted for cost)"
        ]
      },
      {
        "title": "Residual Value and Useful Life",
        "items": [
          "• Useful life The period over which the asset is expected to be available for use by the entity or the volume of output expected from the asset",
          "• Residual Value The residual value of an asset is the amount that the entity would currently obtain from disposal of the asset, after deducting the estimated costs of disposal, assuming that the asset was already at the point where it would be disposed of (using the age and condition that would be assumed to apply at the time of disposal)",
          "Company C buys a machine costing 800. C plans to use the machine for three years and then to sell it on the secondhand market. At the date of acquisition, a machine that is three years old is traded for 150 on the second- hand market. Therefore, the residual value of the machine at the date of acquisition is 150. In this example, the depreciable amount of the machine to be recognised over the three-year holding period is 650."
        ]
      },
      {
        "title": "Depreciation",
        "items": [
          "• Depreciation must be charged from the date the asset is Available for Use, i.e. it is capable of operating in the manner intended by management",
          "✓ This may be earlier than the date it is actually brought into use, e.g., when staff need to be trained to use it",
          "• Depreciation is continued even if the asset is idle/ not being used"
        ]
      },
      {
        "title": "Depreciation Methods",
        "items": [
          "• Depreciation method should reflect the pattern in which asset’s economic benefits are consumed/ used by the entity. Methods of depreciation include :",
          "• Straight line method Cost − Residual Value Depreciation Charge = Useful Life",
          "• Reducing balance method",
          "Depriciation Charge = Net Carrying Value ∗ Depeciation Rate (At the beginning of the period)"
        ]
      },
      {
        "title": "Depreciation Methods",
        "items": [
          "• Machine hours/ Units Cost - Residual Value",
          "Depreciation Charge =                                                × No. of Machine",
          "Estimated Total No. of             Hours Used/",
          "Machine Hours/ Units               Units",
          "Depreciation methods based on the revenue generated by an activity are not appropriate. This is because revenue reflects many factors, such as inflation, sales prices and sales volumes, rather than the economic consumption of an asset."
        ]
      },
      {
        "title": "Review of Estimates",
        "items": [
          "Accounting estimates",
          "• Useful life, residual value and depreciation method should be reviewed at the end of each reporting period and revised if expectations are significantly different from previous estimates",
          "• The carrying amount of the asset at the date of review less any residual value should be depreciated over the revised remaining useful life",
          "Carrying amount − Revised Residual Value Depreciation Charge = Revised Remaining Useful Life",
          "Carrying amount just before the estimates are changed"
        ]
      },
      {
        "title": "Review of Estimates: Depreciation Method",
        "items": [
          "• Depreciation method can be changed if the new method will give a fairer presentation of the results and of the financial position",
          "• Change in depreciation method is NOT a Change of Accounting Policy",
          "• Change in depreciation method is A Change in Accounting Estimate, therefore adjusted prospectively - only current year and future year depreciation are changed",
          "• The carrying amount as at the date of change in depreciation method should be depreciated over the remaining useful life based on the new depreciation method"
        ]
      },
      {
        "title": "Subsequent Measurement",
        "items": [
          "Subsequent Measurement of PPE",
          "Cost Model                                    Revaluation Model",
          "Carrying Amount                                  Carrying amount",
          "=                                               =",
          "Acc. Depreciation                 Revalued          Subsequent Acc.",
          "Cost -                                     Amount/       -   Depreciation and",
          "Acc. Impairment",
          "Fair Value        Acc. Impairment",
          "All the assets of a particular asset class should be under one model"
        ]
      },
      {
        "title": "Revaluation Model",
        "items": [
          "• If the revaluation alternative is adopted, two conditions must be complied with:",
          "✓ A revaluation does not have to be done every year. However, it should be done frequently enough so that carrying amount of an asset in accounts is not significantly different from its fair value",
          "✓ When an item of property, plant and equipment is revalued, the entire class of assets to which the item belongs must be revalued",
          "E.g. if a particular building is revalued, the entire asset class of buildings have to be revalued",
          "• Revalued assets are still depreciated",
          "Revaluation Gains                                   Revaluation Losses",
          "Revalued Amount > Carrying Amount                   Revalued Amount < Carrying Amount",
          "before revalution                                  before revaluation"
        ]
      },
      {
        "title": "Accounting for Revaluation",
        "items": [
          "1. Adjust (Dr or Cr) the cost account of the asset to the revalued amount",
          "2. Remove (Dr) the balance in the Acc. Depreciation account",
          "3. Assuming a revaluation gain - Include the increase in Other Comprehensive Income, at the bottom of the Statement of profit or loss. This would then be taken to the revaluation reserve in SOCE (much like the profit for the year gets taken to retained earnings)",
          "Dr Cost A/C                             X                (Revalued amount – Cost)",
          "Dr Accumulated Depreciation A/C         X                (Entire balance)",
          "Cr OCI – Revaluation Surplus            X                (Balancing figure)"
        ]
      },
      {
        "title": "Accounting for Revaluation",
        "items": [
          "Statement of Profit or Loss and Other Comprehensive Income for the year ended 31/12/20X0",
          "$     Taken to retained",
          "earnings in Statement P&L / Income Statement",
          "Revenue                                         XXX",
          "Cost of sales                                  (XXX)",
          "of Changes in Equity",
          "Gross profit                                    XXX",
          "Administrative expenses                         XXX",
          "Profit from Operations                          XXX",
          "Finance costs                                  (XXX)",
          "Profit before tax                               XXX",
          "Income tax expense                             (XXX)",
          "Profit for the year                             XXX    Taken to revaluation",
          "reserves/ surplus in",
          "Other comprehensive income                             Statement of Changes in",
          "OCI",
          "Gain on revaluation (IAS 16)                    XXX",
          "Equity",
          "Total Comprehensive Income                      XXX"
        ]
      },
      {
        "title": "Accounting for Revaluation: Revaluation Gain                                                               F7",
        "items": [
          "• If no revaluation losses have been recorded in previous years for the same asset or a gain was recorded in a previous year as well, the current year revaluation gain should be recorded as follows:",
          "Cr OCI – Revaluation Surplus                               Current year           A previous year",
          "Revaluation Gain      Not a Revaluation Loss",
          "Revaluation Gain         Revaluation Gain",
          "• If a revaluation loss has been recorded for the same asset in previous years, the current year gain should be recorded as follows:",
          "Current year           A previous year",
          "Cr P&L (to the extent of the previous loss)            Revaluation Gain         Revaluation Loss",
          "Cr OCI (balance of the revaluation gain)"
        ]
      },
      {
        "title": "Accounting for Revaluation: Revaluation Loss",
        "items": [
          "• If no revaluation gains have been recorded in previous years for the same asset or a revaluation loss recorded in previous year as well, the current year revaluation loss should be recorded as follows:",
          "Current year           A previous year",
          "Dr P&L",
          "Revaluation Loss     Not a Revaluation Gain",
          "Revaluation Loss         Revaluation Loss",
          "• If a revaluation gain has been recorded for the same asset in previous years, the current year loss should be recorded as follows:",
          "Current year            A previous year",
          "Dr OCI (to the extent of the previous gain)            Revaluation Loss        Revaluation Gain",
          "Dr P&L (balance of the revaluation loss)"
        ]
      },
      {
        "title": "Depreciation of Revalued Assets",
        "items": [
          "• When non-current assets are revalued, depreciation should be charged on the revalued amount",
          "Revalued Amount − Residual Value Depreciation Charge = Remaining Useful Life"
        ]
      },
      {
        "title": "Annual Reserve Transfer",
        "items": [
          "• Annual Reserves Transfer may be made for extra depreciation on the revalued amount compared to cost",
          "Depreciation Charge                  Depreciation",
          "Annual Reserve Transfer =                                    –",
          "based on Revalued                 Charge based on",
          "Amount                            Cost",
          "• Annual Reserve Transfer",
          "Dr Revaluation surplus/ Revaluation reserve             X",
          "Cr Retained earnings                                    X",
          "Note: This transfer does not get taken to OCI, it is done in the SOCIE only."
        ]
      },
      {
        "title": "Disposal of a Revalued Asset",
        "items": [
          "Gain/ (Loss) on Disposal =       Net Sales Proceeds     –    Carrying Amount",
          "• Gain or loss on disposal should be accounted for in P&L",
          "• Any balance in the Revaluation reserve relating to that asset should now be transferred to retained earnings.",
          "Dr Revaluation reserve                       X",
          "Cr Retained earnings                         X",
          "Note: This transfer does not get taken to OCI, it is done in the SOCIE only."
        ]
      },
      {
        "title": "Disclosures",
        "items": [
          "• IAS 16 Property, Plant and Equipment, requires the following disclosure requirements: ➢ For each class of property, plant and equipment",
          "✓ Measurement bases, i.e. cost or revaluation",
          "✓ Depreciation methods with useful life or depreciation rate",
          "✓ Gross carrying amount and accumulated depreciation at the beginning and end of the period",
          "✓ Reconciliation of additions, disposals, revaluations, impairments and depreciation",
          "➢ When assets have been revalued:",
          "✓ Basis of valuation and date of valuation",
          "✓ Whether an independent valuer was used",
          "✓ Carrying amount if no revaluation had taken place",
          "✓ Revaluation surplus TUU 1 38"
        ]
      },
      {
        "title": "Disclosures: PPE Notes",
        "items": [
          "Cost",
          "Acc. Depreciation",
          "Carrying Amount"
        ]
      },
      {
        "title": "IAS 20: Accounting for Government Grants and",
        "items": [
          "Disclosure of Government Assistance Malindu Udawatta"
        ]
      },
      {
        "title": "Definitions",
        "items": [
          "• Government refers to government, government agencies and similar bodies whether local, national or international",
          "• Government assistance is action by government designed to provide an economic benefit specific to an entity or range of entities qualifying under certain criteria.",
          "• Local operating licenses",
          "• Government subsidies",
          "• Free technical and marketing advice"
        ]
      },
      {
        "title": "Definitions",
        "items": [
          "• Government grants are assistance by government in the form of transfers of resources to an entity in return for past or future compliance with certain conditions relating to the operating activities of the entity",
          "1. Capital Grants - Grants related to assets are government grants whose primary condition is that an entity qualifying for them should purchase, construct or otherwise acquire certain long-term assets",
          "2. Revenue Grants - Grants related to income are government grants other than those related to assets",
          "– known as revenue grants"
        ]
      },
      {
        "title": "Recognition",
        "items": [
          "• Government grants are recognized when there is reasonable assurance that:",
          "1. the entity will comply with the relevant conditions and",
          "2. the grant will be received"
        ]
      },
      {
        "title": "Presentation: Capital Grants",
        "items": [
          "• IAS 20 permits two treatments:",
          "✓ Netting Off Method: Write off the grant against the cost of the non-current asset and depreciate the reduced cost",
          "Dr Asset cost a/c         (cost – capital grant)",
          "Cr Cash                   (cost – capital grant)"
        ]
      },
      {
        "title": "Presentation: Capital Grants",
        "items": [
          "✓ Deferred Income Method: Treat the grant as a deferred credit (liability) and transfer a portion to P&L as income each year over the useful life of the asset, so off setting the higher depreciation charge on the original cost Amount of the grant remaining in the Balance Sheet has to be broken down into current and non-current liabilities",
          "Dr Asset cost a/c                              (cost)",
          "Cr Cash                                        (cost)",
          "Dr Cash                                        (capital grant)",
          "Cr Deferred income – government grant          (capital grant)",
          "At the end of each year",
          "Dr Deferred income – government grant          (capital grant/ useful life)",
          "Cr Government grant income – P&L               (capital grant/ useful life)              45"
        ]
      },
      {
        "title": "Presentation: Revenue Grants",
        "items": [
          "• Recognition and presentation of revenue grants will depend on the situation:",
          "• If the grant is paid when evidence is produced that certain expenditure has been incurred, the grant should be matched with that expenditure",
          "• If the grant is paid on a different basis:",
          "E.g. achievement of a non-financial objective, such as the creation of a specified number of new jobs, the grant income for a period should be recognized based on the progress made to create the specified number of jobs in that period"
        ]
      },
      {
        "title": "Presentation: Revenue Grants",
        "items": [
          "• Presentation of revenue grants could be as follow:",
          "✓ Be presented as a income in the P&L, or",
          "✓ Be deducted from the related expense",
          "• Amount of the grant remaining in the Balance Sheet has to be broken down into current and non-current liabilities"
        ]
      },
      {
        "title": "Repayment of Grants",
        "items": [
          "• In some cases grants may need to be repaid if the conditions of the grant are breached. If there is an obligation to repay the grant and the repayment is probable, then a provision should be made in accordance with the requirements of IAS 37",
          "• Repayment of the grant is treated as a change in accounting estimate",
          "• If the deferred income method for capital grants has been used, then the remaining grant would be repaid to the government. Any amounts released to the profit or loss may also need to be reversed, depending on the level of repayment. A government grant of 1500 was received to",
          "Dr Deferred income           1,000",
          "acquire an asset with a useful life of three",
          "Dr P&L – Grant                 500    years beginning of last year. At the beginning",
          "Cr Grant repayable           1,500    of the current year the entire grant is",
          "repayable                                        4"
        ]
      },
      {
        "title": "Repayment of Grants",
        "items": [
          "• If the netting off method for capital grants has been used, then the cost of the asset must be increased to recognize the full cost of the asset without the grant. A liability will be set up for the grant repayment.",
          "Dr Asset cost a/c          1,500",
          "Cr Grant Repayable         1,500",
          "This will also increase the amount of depreciation",
          "• Income-based grants - Firstly, debit the repayment to any liability for deferred income. Any excess repayment must be charged to profits immediately. Dr Deferred income Cr P&L Cr Grant Repayable"
        ]
      },
      {
        "title": "Government Assistance",
        "items": [
          "• As implied in the definitions set out earlier, government assistance helps businesses through advice, procurement policies and similar methods. It is not possible to place reliable values on these forms of assistance, so they are not recognised in the financial statements."
        ]
      },
      {
        "title": "Disclosures",
        "items": [
          "• IAS 20 requires the following disclosures:",
          "1. the accounting policy and presentation methods adopted",
          "2. the nature of government grants recognised in the financial statements",
          "3. unfulfilled conditions relating to government grants that have been recognized"
        ]
      },
      {
        "title": "Borrowing Costs",
        "items": [
          "• Borrowing costs are finance costs (interest) on money borrowed (loans) to finance the acquisition/ construction of assets.",
          "• Borrowing costs must be capitalized as part of the cost of an asset if that asset is a Qualifying Asset",
          "✓ Qualifying Asset is one which necessarily takes a substantial time to get ready for its intended use or sale",
          "E.g. construction projects",
          "Substantial time is normally a period greater than 6 months"
        ]
      },
      {
        "title": "Commencement of Capitalization",
        "items": [
          "• Capitalization of borrowing costs should commence when all of the following conditions are met:",
          "1. Expenditure for the asset is being incurred",
          "E.g. expenditure in the form of payments for the material, associated labor cost and related overheads",
          "2. Borrowing costs are being incurred",
          "3. Activities that are necessary to prepare the asset for its intended use or sale are in progress: Activities that are necessary to get an asset ready may include technical and administrative work before construction begins, such as obtaining permits"
        ]
      },
      {
        "title": "Cessation of Capitalization",
        "items": [
          "• Capitalization of borrowing costs should cease when either:",
          "1. Substantially all the activities necessary to prepare the qualifying asset for its intended use or sale are complete Company V has constructed a chemical plant. Construction is complete but minor modifications to the plant are required to meet the user's specifications before it is brought into use. V concludes that substantially all of the activities to prepare the plant for its use are complete when the construction is complete and stops capitalisation at that point.",
          "Or",
          "2. Construction is suspended for a extended period: e.g. due to industrial disputes or waiting for cement"
        ]
      },
      {
        "title": "Rate of Interest",
        "items": [
          "• Where borrowings are made Specifically to acquire a qualifying asset:",
          "Investment income from",
          "Borrowing costs actually         temporary investment of the",
          "Borrowing Cost to be                            –",
          "=     incurred during",
          "Capitalized                                         funds during capitalization",
          "capitalization period period",
          "• Where funds for the project are taken from General borrowings:",
          "Borrowing Cost to be =   Amount of general     ×         Weighted Average",
          "Capitalized       borrowings used for the             Interest rate",
          "asset"
        ]
      },
      {
        "title": "Investment Property",
        "items": [
          "Investment property is Land or a Building held",
          "a) To earn rentals, or",
          "b) For capital appreciation or",
          "c) For both",
          "Rather than for use in production/ supply of goods or services or administrative purposes (PPE) or for sale in the ordinary course of business (Inventory)",
          "• Owner occupied property is excluded from the definition of investment property, so these are properties not used by the company in general operations",
          "• These could be spare properties rented out to third parties, or specifically bought in order to profit from a gain in value"
        ]
      },
      {
        "title": "Investment Property",
        "items": [
          "Examples of investment property are:",
          "• land held for capital appreciation",
          "• land held for undecided future use",
          "• buildings leased out under an operating lease",
          "• vacant buildings held to be leased out under an operating lease.",
          "The following are not investment property:",
          "• property held for use in the production or supply of goods or services or for administrative purposes (IAS 16 Property, Plant and Equipment applies)",
          "• property held for sale in the ordinary course of business or in the process of construction of development for such sale (IAS 2 Inventories applies)",
          "• property being constructed or developed on behalf of third parties (IFRS 15 Revenue from Contracts with Customers applies)",
          "• owner-occupied property (IAS 16 applies)",
          "• property leased to another entity under a finance lease (IFRS 16 Leases applies).",
          "• Property that is rented out to employees is deemed to be owneroccupied and therefore cannot be classified as",
          "investment property                                                                             59"
        ]
      },
      {
        "title": "Investment Property",
        "items": [
          "• There could be a situation where a building can be accounted for in two different ways. If a company occupies a premises but rents out certain floors to other companies, then the part occupied will be classed as PPE as per IAS 16 with the floors rented out classed as Investment property per IAS 40",
          "3rd loor - Rented to a third party Investment Property – IAS 40",
          "G, 1st, 2nd floors – Used as head office PPE – IAS 16"
        ]
      },
      {
        "title": "Consolidated Accounts : Investment Property                                                                   F7",
        "items": [
          "• If a building is rented to a subsidiary by the parent, then the building will be classed as an investment property in the separate financial statements of the parent, but will be classed as property, plant and equipment per IAS 16 in the consolidated financial statements",
          "Company A",
          "Parent                                             Separate Financial Statements",
          "Company A                                            Investment Property – IAS 40",
          "70%",
          "Company B",
          "Subsidiary                                          AB Group",
          "Consolidated Financial Statements Group",
          "PPE – IAS 16               61"
        ]
      },
      {
        "title": "Initial Measurement",
        "items": [
          "• Investment properties should initially be measured at Cost",
          "• Cost is calculated much in the same way as cost was calculated for initial measurement of PPE"
        ]
      },
      {
        "title": "Subsequent Measurement",
        "items": [
          "• Subsequent measurement should be using one of the following models:",
          "✓ Cost model (same as under PPE)",
          "✓ Fair value model (not the same as the revaluation model in PPE)",
          "• Once a model is chosen it must be used for all investment properties"
        ]
      },
      {
        "title": "Cost Model",
        "items": [
          "• Under the cost model the asset should be accounted for in line with the cost model laid out in IAS 16.",
          "• Therefore, should be depreciated",
          "• Carrying amount = Cost – Acc. Depreciation and Impairment"
        ]
      },
      {
        "title": "Fair Value Model",
        "items": [
          "• The asset is valued to fair value at the end of each year (under revaluation model, revaluation is not mandatory at the end of each year)",
          "• The gain or loss is shown directly in the P&L (gains are not in OCI like under revaluation model in PPE)",
          "• No depreciation is charged on the asset (depreciation is always charged for PPE, whether revaluation model or cost model)",
          "• No impairment recognized"
        ]
      },
      {
        "title": "Change in Use",
        "items": [
          "Investment Property (Fair value model)",
          "PPE",
          "(Cost model or Revaluation model)",
          "Investment Property (Cost model)"
        ]
      },
      {
        "title": "Change in Use",
        "items": [
          "Investment Property",
          "(Fair value model)           PPE",
          "(Cost model or Revaluation model)",
          "Investment Property (Cost model)",
          "Illustration 1 & 2         67"
        ]
      },
      {
        "title": "Disclosures",
        "items": [
          "• In respect of investment properties, IAS 40 says that an entity must disclose:",
          "1. whether the cost or fair value model is used",
          "2. amounts recognised in profit or loss for the period",
          "3. a reconciliation between the carrying amounts of investment property at",
          "4. the beginning and end of the period",
          "5. the fair value of investment property if the entity uses the cost model."
        ]
      },
      {
        "title": "Investor Perspective",
        "items": [
          "TUU 4 – Homework Revisit after going through the conceptual framework"
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Property, plant and equipment are tangible assets held by an entity for more than one accounting period for use in the;",
          "production or supply of goods or services,",
          "An item of property, plant and equipment should be recognised as an asset when:",
          "it is probable that future economic benefits associated with the asset will flow to the entity; and"
        ],
        "answer": 0
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "An item of property, plant and equipment should be recognised as an asset when:",
          "it is probable that future economic benefits associated with the asset will flow to the entity; and",
          "the cost of the asset can be measured reliably",
          "production or supply of goods or services,"
        ],
        "answer": 3
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "the cost of the asset can be measured reliably",
          "An item of property, plant and equipment should Initially be measured at its Cost • Cost could include the following:",
          "An item of property, plant and equipment should be recognised as an asset when:",
          "it is probable that future economic benefits associated with the asset will flow to the entity; and"
        ],
        "answer": 2
      }
    ],
    "practice": [
      {
        "title": "Practice set",
        "question": "OTQ (1) An entity purchased a property 15 years ago at a cost of $100,000 and have been depreciating it at a rate of 2% per annum, on the straight line basis. The entity have had the property professionally revalued at $500,000. What is the revaluation surplus that will be recorded in the financial statements in respect of this property? A. $400,000 B. $500,000 C. $530,000 D. $430,000 (2) An entity owns two buildings, A and B, which are currently recorded in the books at carrying amounts of $170,000 and $330,000 respectively. Both buildings have recently been valued as follows: Building A $400,000 Building B $250,000 The entity currently has a balance on the revaluation surplus of $50,000 which arose when building A was revalued several years ago. Building B has not previously been revalued. What double entry will need to be made to record the revaluations of buildings A and B? A. Dr Non-current assets $150,000 Dr Statement of profit or loss $80,000 Cr Other comprehensive income (revaluation surplus) $230,000 B. Dr Non-current assets $150,000 Dr Statement of profit or loss $30,000 Cr Other comprehensive income (revaluation surplus) $180,000 C. Dr Non-current assets $150,000 Cr Other comprehensive income (revaluation surplus) $150,000 D. Dr Non-current assets $150,000 Dr Statement of profit or loss $50,000 Cr Other comprehensive income (revaluation surplus) $200,000 (3) On 1 April 20X0 Slow and Steady Co held non-current assets that cost $312,000 and had accumulated depreciation of $66,000 at this date. During the year ended 31 March 20X1, Slow and Steady Co disposed of non-current assets which had originally cost $28,000 and had a carrying amount of $11,200. Slow and Steady Co’s policy is to charge depreciation of 40% on the reducing balance basis, with no depreciation charged in the year of disposal. What is the depreciation charge to the statement of profit or loss for the year ended 31 March 20X1? $ _________ OTQ (4) A building contractor decides to construct an office building to be occupied by his/her own staff. Tangible non-current assets are initially measured at cost. Which TWO of the following expenses incurred by the building contractor cannot be included as a part of the cost of the office building? A. Interest incurred on a specific loan taken out to pay for the construction of the new offices B. Direct building labour costs C. A proportion of the contractor’s general administration costs D. Hire of plant and machinery for use on the office building site E. Additional design work caused by initial design errors F. Delivery costs in getting the raw materials onto site (5) The purpose of depreciation is to: A. Allocate the cost less residual value on a systematic basis over the asset’s useful life B. Write the asset down to its realisable value each period C. Accumulate a fund for asset replacement D. Recognise that assets lose value over time (6) An entity uses funds from its general borrowings to build a new production facility. Details of the entity's borrowings are shown below: – $10 million 6% loan – $6 million 8% loan The entity used $12 million of these funds to construct the facility, which was under construction for the entire year. How much interest should be capitalised as part of the cost of the asset? $ _________ (7) A manufacturing entity is entitled to a grant of $3 million for creating 50 jobs and maintaining them for three years. $1.5m is received when the jobs are created and the remaining $1.5m is receivable after three years, provided that the 50 jobs are still in existence. The entity creates 50 jobs at the beginning of year one and there is reasonable assurance that this level of employment will be maintained. What is the deferred income balance at the end of the first year? $ _________ OTQ (8) On 1 January 20X1, Sly received $2m from the local government on the condition that they employ at least 100 staff each year for the next 4 years. On this date, it was virtually certain that Sly would meet these requirements. However, on 1 January 20X2, due to an economic downturn and reduced consumer demand, Sly no longer needed to employ 100 staff. The conditions of the grant required full repayment. What should be recorded in the financial statements? A. Reduce deferred income balance by $1,500,000 B. Reduce deferred income by $1,500,000 and recognise a loss in the financial statements of $500,000 C. Reduce deferred income by $2,000,000 D. Reduce deferred income by $2,000,000 and recognise a gain in the financial statements of $500,000 (9) An entity purchased an investment property on 1 January 20X3 for a cost of $3.5m. The property had an estimated useful life of 50 years, with no residual value, and at 31 December 20X5 had a fair value of $4.2m. On 1 January 20X6 the property was sold for net proceeds of $4m. Calculate the profit or (loss) on disposal under both the cost and fair value (FV) model. A. Cost: $0.71m FV: ($0.2m) B. Cost: $0.2m FV: $0.2m C. Cost $0.5m FV: ($0.2m) D. Cost $0.71m FV: $0.5m (10) An investment property with a useful life of 10 years was purchased by Akorn on 1 January 20X9 for $200,000. By 31 December 20X9 the fair value of the property had risen to $300,000. Akorn measures its investment properties under the fair value model. What values would go through the statement of profit or loss in the year? A. Gain: $100,000 and Depreciation $30,000 B. Gain: $0 and Depreciation of $30,000 C. Gain: $100,000 and Depreciation of 0 D. Gain: $120,000 and Depreciation of $20,000 OTQ (11) With regards to borrowing costs relating to specific borrowings used for the construction of a qualifying asset, match the description to the correct accounting treatment in the table below",
        "answer": "OTQ ANS OTQ ANS"
      }
    ]
  },
  {
    "slug": "intangible-assets",
    "title": "Intangible Assets",
    "standard": "IAS 38",
    "blocks": [
      {
        "title": "IAS 38: Intangible Assets",
        "items": [
          "An intangible asset is an identifiable non-monetary asset without physical substance.",
          "Examples:",
          "• Licenses and quotas                                     • Brands",
          "• Intellectual property, e.g. patents and copyrights      • Trademarks",
          "Can not be",
          "Therefore to meet the definition of an intangible asset, an item must be                touched",
          "1. A present economic resource controlled by the entity and expected to provide future economic benefits to the entity. i.e. it meets the definition of an asset",
          "2. Identifiable",
          "3. Non-monetary",
          "4. Lacks physical substance"
        ]
      },
      {
        "title": "Identifiable",
        "items": [
          "For an asset to be identifiable, it must fall into one of two categories:",
          "• It is separable: the asset can be bought or sold separately from the rest of the business OR",
          "• It arises from contractual or other legal rights, regardless of whether those rights are transferable or separable from the entity or from other rights and obligations.",
          "Therefore, separability is not a necessary condition for an item to be identifiable.",
          "E.g. a business license of a radio station that the station requires in order to operate is identifiable because it arises from legal rights, even though the license is usually not separable from the station operator."
        ]
      },
      {
        "title": "Identifiable - Examples",
        "items": [
          "• Company X is a successful ICT business. In past years, X has achieved a 35% market share for its products and it is thinking of recognising an intangible asset for this market share. Market share does not meet the definition of an intangible asset because it is not separable and it does not arise from legal rights.",
          "• Brand names are also likely to be separable. A company may operate many different product lines and may be willing to sell one of those brands, which could be done without selling the entire company.",
          "However, It is important to note that internally generated brands cannot be capitalized (i.e. recognised on the statement of financial position), which will be covered later"
        ]
      },
      {
        "title": "Non-Monetary",
        "items": [
          "• Monetary assets are:",
          "• units of currency held (Cash), and",
          "• assets to be received, in a fixed or determinable number of units of currency (Cash) Examples: Receivables, Investment in a Fixed Deposit, Investment in Debentures",
          "Q: Are trade receivables an intangible asset? A: NO!, because it’s a monetary asset"
        ]
      },
      {
        "title": "Control",
        "items": [
          "• To demonstrate control, an entity needs to have the power to obtain the future economic benefits arising from the item and be able to restrict the access of others to those benefits.",
          "Illustration 1: Control Company Y has two resources: A software that it developed internally and for which a patent is registered; and the know-how of the staff that operate the software. Staff members are required to give one month's notice of their resignation It is clear that Y controls the software. However, although it obtains economic benefits from the work performed by the staff, Y does not have control over their know-how because staff could choose to resign at any time. Therefore, the know-how does not meet the definition of an intangible asset."
        ]
      },
      {
        "title": "Ways of Acquiring an Intangible Asset",
        "items": [
          "• An intangible asset can be acquired in the following ways:",
          "✓ Acquired separately",
          "✓ Acquired in a business combination",
          "✓ Generated internally",
          "Company A                                                         Company B",
          "Note: Operating system of a computer More likely to be accounted for under IAS 16 PPE, as it is an integral part of the computer itself, whereas additional software is accounted for under IAS 38"
        ]
      },
      {
        "title": "Recognition",
        "items": [
          "• To be recognized in the financial statements, an intangible asset must:",
          "1. Meet the definition of an intangible asset, and",
          "2. Meet the recognition criteria of the framework:",
          "a. It is probable that future economic benefits attributable to the asset will flow to the entity",
          "b. The cost of the asset can be measured reliably"
        ]
      },
      {
        "title": "Initial Measurement",
        "items": [
          "• An intangible asset should be initially measured at Cost",
          "Intangible assets         Cost = Purchase price + Directly attributable costs of preparing the asset for",
          "acquired separately       its intended use like professional fees (lawyer fees)",
          "Identifiable Intangible Cost = Fair value of the asset at acquisition assets acquired in a If the fair value of an intangible asset purchased as part of an acquisition of business combination a business cannot be measured reliably, or the intangible asset is not identifiable the intangible asset should not be recognized and will be included within goodwill",
          "Internally generated      Internally generated intangible assets are not normally recognized in the",
          "intangible assets         financial statements, except for development expenditure that meets",
          "certain conditions Cost = Development expenditure incurred after meeting the relevant recognition criteria"
        ]
      },
      {
        "title": "Internally Generated Intangible Assets",
        "items": [
          "• Generally, internally generated intangibles are not Capitalized, because cost of internally generated intangible assets can not be measured reliably, as the costs associated with these cannot be separated from the costs associated with running the business",
          "• The following internally generated items may not be recognized:",
          "• Internally developed brands",
          "• Mastheads – title of newspapers",
          "• Publishing titles and customer lists",
          "• Internally generated goodwill (\"inherent goodwill\")",
          "• However, some development expenditure incurred internally can be capitalized if certain conditions are met"
        ]
      },
      {
        "title": "Internally Generated Intangible Assets",
        "items": [
          "• Internally generated brands and similar assets are not recognized",
          "• When a brand name is acquired separately or through a business combination and can be measured reliably - It should be separately recognised as an intangible non-current asset",
          "Company A                                           Company B"
        ]
      },
      {
        "title": "Internally Generated Intangible Assets",
        "items": [
          "• In 2018, X Company entered into negotiations to acquire the Techno brand from Y Ltd for $3.0 million. This would give X Company the ability to sell products under the Techno brand. X Company did not acquire any other assets of the Y Ltd business, nor the entire company of Y Ltd",
          "• In this example, the Techno brand is clearly separable as only the brand is acquired not the rest of the Y Ltd business. It would be recognised as an intangible asset in the individual statement of financial position of X Company at the cost of $3.0m",
          "Dr Intangible Asset               3.0 Mn",
          "Cr Cash                           3.0 Mn"
        ]
      },
      {
        "title": "Subsequent Measurement",
        "items": [
          "• There is a choice between:",
          "✓ Cost model (same as cost model in PPE)",
          "✓ Revaluation model (same as revaluation model in PPE)"
        ]
      },
      {
        "title": "Cost Model",
        "items": [
          "• Carrying Amount = Cost - Acc. Amortization and Acc. Impairment",
          "• Amortisation works the same as depreciation.",
          "• The intangible asset is amortised over the useful economic life, with the annual expense being shown in the P&L",
          "An intangible asset with a           • Must be amortised over that life, normally using the straight-line",
          "finite useful life                     method with a zero residual value",
          "• Test for impairment, when there is an indicator",
          "An intangible asset with an",
          "Indefinite useful life – no          • Should not be amortized",
          "foreseeable limit to its useful      • Should be tested for impairment annually (impairment review),",
          "life, not difficulty in accurately     and more often if there is an actual indicators of possible",
          "estimating the useful life             impairment"
        ]
      },
      {
        "title": "Amortization",
        "items": [
          "• Amortization should start from the date the asset is available for use",
          "• The useful life of an intangible asset should take account of such things as:",
          "• the expected use of the asset",
          "• possible obsolescence and expected actions by competitors",
          "• the stability of the industry",
          "• market demand for the products and services that the asset is generating.",
          "• The method of amortising the asset should reflect the pattern in which the assets’ economic benefits are expected to be consumed by the entity. If that proves difficult to determine, then the straight-line method is acceptable."
        ]
      },
      {
        "title": "Amortization",
        "items": [
          "• The residual value of the intangible should be assumed to be zero unless:",
          "• there is a commitment from a third party to purchase the asset or",
          "• the entity intends to sell the asset and a readily available active market exists.",
          "• The useful life, residual value and method of amortisation should be reviewed at least at each financial year-end. Changes to useful life or method of amortization should be effective as soon as they are identified and should be accounted for as changes in accounting estimates"
        ]
      },
      {
        "title": "Revaluation Model",
        "items": [
          "Carrying Amount = Revalued Amount - Subsequent Acc. Amortization and Acc. Impairment",
          "(FV of the asset at revaluation date)",
          "• Same Revaluation model as IAS 16 PPE",
          "• For intangible assets, revaluation model can not be used unless there is an Active Market. So fair value should be determined by reference to an active market",
          "• Features of an Active Market are that:",
          "– The items traded within the market are homogeneous (identical)",
          "– Willing buyers and sellers can normally be found at any time",
          "– Prices are available to the public",
          "• In practice such active markets are rare, so revaluation model is rarely used TUU 5 & 6"
        ]
      },
      {
        "title": "Research and Development",
        "items": [
          "• Research is original and planned investigation undertaken with the prospect of gaining new scientific knowledge and understanding",
          "• Development is the application of research findings or other knowledge to a plan or design for the production of new or substantially improved:",
          "• Materials,",
          "• Devices,",
          "• Products,",
          "• Processes,",
          "• Systems or Services before the start of commercial production or use"
        ]
      },
      {
        "title": "Research and Development",
        "items": [
          "• Research expenditure: expensed to the P&L as incurred",
          "• Development expenditure: recognize as an intangible asset if, and only if, an entity can demonstrate all of the following:",
          "• Probable future economic benefits from the asset, whether through sale or internal cost savings",
          "• Intention to complete the intangible asset and use or sell it",
          "• Resources available to complete the development and to use or sell the intangible asset",
          "• Ability to use or sell the intangible asset",
          "• Technical feasibility of completing the intangible asset",
          "• Expenses attributable to the intangible asset can be measured"
        ]
      },
      {
        "title": "Research and Development",
        "items": [
          "• It is only expenditure incurred after the all recognition criteria have been met which should be recognized as an asset",
          "• Development expenditure recognized as an expense in P&L can not subsequently be reinstated as an asset",
          "• Development expenditure should be amortized over its useful life when its available for use, i.e. when it is in the location and condition necessary for it to be capable of operating in the manner intended by management.",
          "Company X develops new software for its finance department. The software is completed in December 2018 and could be implemented at that date. However, management decides not to implement the software until January in 2020. In this example, X should amortize the development cost of the software from December 2018, because it is available for use from this date."
        ]
      },
      {
        "title": "Research and Development",
        "items": [
          "Commercial",
          "Research                                Development                                      Production",
          "Clinical trials prove",
          "All Development Expenditure capitalization              technical",
          "criteria satisfied except technical feasibility feasibility of the vaccine",
          "Capitalize",
          "Expense to P&L                 Expense to P&L                                              Amortize",
          "Expenditure"
        ]
      },
      {
        "title": "Disclosures",
        "items": [
          "• IAS 38 states that an entity must disclose:",
          "• The amount of research and development expenditure expensed in the period",
          "1. The amortisation methods used",
          "2. For intangible assets assessed as having an indefinite useful life, the reasons supporting that assessment",
          "3. The date of any revaluations, if applicable, as well as the methods and assumptions used",
          "4. A reconciliation of the carrying amount of intangibles at the beginning and end of the reporting period."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "An intangible asset is an identifiable non-monetary asset without physical substance.",
          "Intellectual property, e.g. patents and copyrights • Trademarks",
          "Therefore to meet the definition of an intangible asset, an item must be",
          "A present economic resource controlled by the entity and expected to provide future economic benefits to the entity. i.e. it meets the definition of an asset"
        ],
        "answer": 0
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Therefore to meet the definition of an intangible asset, an item must be",
          "A present economic resource controlled by the entity and expected to provide future economic benefits to the entity. i.e. it meets the definition of an asset",
          "Lacks physical substance Can not be touched",
          "Intellectual property, e.g. patents and copyrights • Trademarks"
        ],
        "answer": 3
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Lacks physical substance Can not be touched",
          "To demonstrate control, an entity needs to have the power to obtain the future economic benefits arising from the item and be able to restrict the access of others to those benefits.",
          "Therefore to meet the definition of an intangible asset, an item must be",
          "A present economic resource controlled by the entity and expected to provide future economic benefits to the entity. i.e. it meets the definition of an asset"
        ],
        "answer": 2
      }
    ],
    "practice": [
      {
        "title": "Practice set",
        "question": "OTQ 1. Cowper plc has spent $20,000 researching new cleaning chemicals in the year ended 31 December 20X0. They have also spent $40,000 developing a new cleaning product which will not go into commercial production until next year. The development project meets the criteria laid down in IAS 38 Intangible Assets. How should these costs be treated in the financial statements of Cowper plc for the year ended 31 December 20X0? A. $60,000 should be capitalised as an intangible asset on the statement of financial position. B. $40,000 should be capitalised as an intangible asset and should be amortised; $20,000 should be written off to the statement of profit or loss. C. $40,000 should be capitalised as an intangible asset and should not be amortised; $20,000 should be written off to the statement of profit or loss. D. $60,000 should be written off to the statement of profit or loss 2. Which TWO of the following items below could potentially be classified as intangible assets? A. purchased brand name B. training of staff C. internally generated brand D. licences and quotas 3. Sam Co has provided the following information as at 31 December 20X6: (i) Project A – $50,000 has been spent on the research phase of this project during the year. (ii) Project B – $80,000 had been spent on this project in the previous year and $20,000 this year. The project was capitalised in the previous year however, it has been decided to abandon this project at the end of the year. (iii) Project C – $100,000 was spent on this project this year. The project meets the criteria of IAS 38 and is to be capitalised. Which of the following adjustments will be made in the financial statements as at 31 December 20X6? A. Reduce profit by $70,000 and increase non-current assets by $100,000 B. Reduce profit by $150,000 and increase non-current assets by $20,000 C. Reduce profit by $130,000 and increase non-current assets by $180,000 D. Reduce profit by $150,000 and increase non-current assets by $100,000 4. Which of the following statements concerning the accounting treatment of research and development expenditure are true, according to IAS 38 Intangible Assets? (i) Research is original and planned investigation undertaken with the prospect of gaining new knowledge and understanding. (ii) Development is the application of research findings. (iii) Depreciation of plant used specifically on developing a new product can be capitalised as part of development costs. (iv) Expenditure once treated as an expense cannot be reinstated as an asset. A. (i), (ii) and (iii) C. (ii), (iii) and (iv) B. (i), (ii) and (iv) D. All of the above OTQ 5. Which of the following should be included in a company’s statement of financial position as an intangible asset under IAS 38 Intangible Assets? A. Internally developed brands B. Internally generated goodwill C. Expenditure on completed research D. Payments made on the successful registration of a patent 6. During the year to 31 December 20X8 X Co incurred $200,000 of development costs for a new product. In addition, X Co spent $60,000 on 1 January 20X8 on machinery specifically used to help develop the new product and $40,000 on building the brand identity. Commercial production is expected to start during 20X9. The machinery is expected to last 4 years with no residual value. What value should be included within Intangible Assets in respect of the above in X Co’s Statement of Financial Position as at 31 December 20X8? $ ____________________ 7. Which TWO of the following criteria must be met before development expenditure is capitalised according to IAS 38 Intangible Assets? A. the technical feasibility of completing the intangible asset B. future revenue is expected C. the intention to complete and use or sell the intangible asset D. there is no need for reliable measurement of expenditure 8. For each issue, identify the correct accounting treatment in Madeira's financial statements: [please tick] Capitalize as intangible Expense $400,000 developing a new process which will bring in no revenue but is expected to bring significant cost savings $400,000 developing a new product. During development a competitor launched a rival product and now Madeira is hesitant to commit further funds to the process $400,000 spent on marketing a new product which has led to increased sales of $800,000 $400,000 spent on designing a new corporate logo for the business",
        "answer": "OTQ ANS"
      }
    ]
  },
  {
    "slug": "impairment-of-assets",
    "title": "Impairment of Assets",
    "standard": "IAS 36",
    "blocks": [
      {
        "title": "Scope of IAS 36",
        "items": [
          "• IAS 36 applies to all assets except:",
          "1. Inventories (see IAS 2)",
          "2. Assets arising from construction contracts (see IAS 11)",
          "3. Deferred tax assets (see IAS 12)",
          "4. Assets arising from employee benefits (see IAS 19)",
          "5. Financial assets (see IAS 39)",
          "6. Investment property carried at fair value (see IAS 40)",
          "7. Agricultural assets carried at fair value (see IAS 41)",
          "8. Insurance contract assets (see IFRS 4)",
          "9. Non-current assets held for sale (see IFRS 5)"
        ]
      },
      {
        "title": "When is an Asset Impaired?",
        "items": [
          "• An asset is impaired if its Recoverable Amount is less than the Carrying Amount",
          "Recoverable Amount < Carrying Amount",
          "• Carrying amount of an asset is the amount at which an asset is recognized in the balance sheet after deducting accumulated depreciation and accumulated impairment losses",
          "• Recoverable amount is taken as the HIGHER of:",
          "✓ Fair Value less costs of disposal* and",
          "✓ Value in Use",
          "* AKA Fair value less costs to sell            94"
        ]
      },
      {
        "title": "Value in Use",
        "items": [
          "• Value in use is determined by discounting future cash inflows and outflows from the use of the asset and its ultimate disposal",
          "• Cash flows relating to financing activities or income taxes should not be included",
          "• With regards to estimates of cash flows, IAS 36 stipulates that:",
          "• The cash flow projections should be based on reasonable assumptions and the most recent budgets and forecasts",
          "• The cash flow projections should relate to the asset’s current condition and should exclude expenditure to improve or enhance it",
          "• For periods in excess of five years, management should extrapolate from earlier budgets using a steady, declining or zero growth rate",
          "• Management should assess the accuracy of their budgets by investigating the reasons for any differences between forecast and actual cash flows."
        ]
      },
      {
        "title": "Value in Use",
        "items": [
          "• The discount rate used to calculate value in use should reflect:",
          "1. the time value of money, and",
          "2. the risks specific to the asset for which the future cash flow estimates have not been adjusted"
        ]
      },
      {
        "title": "Value in Use Example",
        "items": [
          "Company X owns an asset. Below are the cash inflows and outflows expected from the asset for the next five years. X expects to dispose the asset at the end of the 5 years for $5,000. Relevant interest rate is 10%",
          "Year 1         Year 2         Year 3          Year 4          Year 5",
          "Cash inflow (Rent)                   10,000         12,000         14,000          16,000          18,000",
          "Disposal proceeds                                                                                    5,000",
          "Cash outflow (Maintenance)          (2,000)        (2,500)         (3,000)         (3,500)         (4,000)",
          "Net cash flow                         8,000          9,500         11,000          12,500          19,000",
          "Present Value                     8,000/(1.1)1   9,500/(1.1)2   11000/(1.1)3   12,500/(1.1)4   19,000/(1.1)5",
          "Present Value                         7,273          7,851           8,264           8,538         11,798",
          "Value in Use                         43,724"
        ]
      },
      {
        "title": "Impairment Testing",
        "items": [
          "• At each reporting date, entity must assess whether there are indicators that an asset or a CGU may be impaired",
          "• If there are indicators of impairment, then an impairment review/ test is conducted",
          "• If there are no indicators of impairment, no further action is taken",
          "• Indicators of impairment may be from",
          "• External environment (external sources)",
          "• Within the entity itself (internal sources)"
        ]
      },
      {
        "title": "External Indicators of Impairment",
        "items": [
          "1. The asset’s market value has declined significantly unexpectedly",
          "2. Changes in the technological, market, economic or legal environment have had an adverse effect on the entity",
          "3. Interest rates have changed, thus increasing the discount rate used in calculating the asset’s Value in use"
        ]
      },
      {
        "title": "Internal Indicators of Impairment",
        "items": [
          "1. There is evidence of obsolescence of or damage to the asset",
          "2. Changes in the way the asset is used",
          "3. Evidence is available from internal reporting indicating that the economic performance of an asset is, or will be, worse than expected.",
          "TUU 8 – Pg. 123"
        ]
      },
      {
        "title": "Exception",
        "items": [
          "• Generally an impairment review is only conducted when there is an indicator of impairment",
          "• However, for the following assets an impairment review is conducted annually irrespective of whether there is an indicator of impairment or not",
          "1. Goodwill acquired in a business combination",
          "2. An intangible asset with an indefinite useful life",
          "3. An intangible asset not yet available for use"
        ]
      },
      {
        "title": "Impairment Review/ Test",
        "items": [
          "• Where there is an indicator of impairment, an Impairment Review should be carried out:",
          "1. The recoverable amount should be calculated",
          "2. If the recoverable amount is less than the carrying amount, the asset should be written down to recoverable amount Impairment loss = Carrying amount – Recoverable amount",
          "3. The impairment loss should be immediately recognized in the P&L",
          "Dr Impairment loss - P&L                X",
          "Cr Asset Cost A/C                       X",
          "4. If the recoverable amount is more than the carrying amount, no more action"
        ]
      },
      {
        "title": "Impairment Review",
        "items": [
          "• An impairment loss is normally charged to the P&L, except when it can be used to reverse a previous revaluation surplus related to the same asset",
          "Current year        A previous year",
          "Impairment Loss      Revaluation Gain",
          "• If impairment reverses a previous revaluation gain taken to OCI (then revaluation reserve), the impairment will be taken first to OCI (from there revaluation reserve) until the previous revaluation gain is reversed and then to the P&L",
          "Dr OCI – Revaluation reserve (To the extent of the previous revaluation gain)",
          "Dr P&L                          (Balance Amount)",
          "Cr Asset Cost A/C               (Impairment loss amount )"
        ]
      },
      {
        "title": "Reversal of Impairment Loss",
        "items": [
          "• The calculation of impairment losses is based on predictions of what may happen in the future. Sometimes, actual events turn out to be better than predicted. If this happens, the recoverable amount is re-calculated and the previous write-down is reversed",
          "• Impaired assets should be reviewed at each reporting date to see whether there are indications that the impairment has reversed",
          "• A reversal of an impairment loss is recognized immediately as income in P&L (as an income) Dr Asset Cost A/C Cr Impairment reversal – P&L"
        ]
      },
      {
        "title": "Reversal of Impairment Loss",
        "items": [
          "• If the original impairment was charged against the OCI (revaluation surplus), the reversal is recognized as a credit to OCI and credited to the Revaluation Reserve Dr Asset Cost A/C Cr OCI – Revaluation Reserve Cr Impairment reversal - P&L"
        ]
      },
      {
        "title": "Reversal of Impairment Loss",
        "items": [
          "Maximum amount of the reversal is the lower of:",
          "• The amount necessary to bring the current carrying amount of the asset to its recoverable amount",
          "• The amount necessary to restore the current carrying amount of the asset to its pre- impairment carrying amounts less subsequent depreciation/amortization that would have been recognized",
          "• The depreciation charge for future periods should be based on the changed carrying amount after reversal of impairment",
          "TUU 9 - Homework"
        ]
      },
      {
        "title": "Impairment Reversal of Goodwill",
        "items": [
          "• An impairment loss recognized for goodwill cannot be reversed in a subsequent period",
          "• The reason for this is that once purchased goodwill has become impaired, any subsequent increase in its recoverable amount is likely to be an increase in internally generated goodwill, rather than a reversal of the impairment loss recognised for the original purchased goodwill.",
          "• Internally generated goodwill cannot be recognized",
          "TUU 12 – Pg. 128"
        ]
      },
      {
        "title": "Cash Generating Units (CGU)",
        "items": [
          "• When assessing the impairment of assets it will not always be possible to base the impairment review on individual assets",
          "• The Value in use calculation will be impossible on a single asset because the asset does not generate distinguishable cash flows",
          "• In this case, the impairment calculation should be based on a CGU",
          "• A CGU is the smallest identifiable group of assets which generates cash inflows independent of those of other assets",
          "• In a restaurant chain like McDonalds or KFC, a CGU would mean all the assets in particular outlet"
        ]
      },
      {
        "title": "Cash Generating Units (CGU)",
        "items": [
          "• The carrying amount of a cash-generating unit includes the carrying amount of assets that can be attributed to the cash-generating unit and will generate the future cash inflows used in determining the cash-generating unit’s value in use.",
          "• There are two problem areas:",
          "• Corporate assets: assets that are used by several cash-generating units (e.g. a head office building or a research centre). They do not generate their own cash inflows, so do not themselves qualify as cash-generating units.",
          "• Goodwill, which does not generate cash flows independently of other assets and often relates to a whole business.",
          "• Corporate assets and goodwill should be allocated to cash-generating units on a reasonable and consistent basis. A cash-generating unit to which goodwill has been allocated must be tested for impairment annually."
        ]
      },
      {
        "title": "CGU : Impairment",
        "items": [
          "• The impairment calculation is done by:",
          "✓ Assuming the cash generating unit is one asset",
          "✓ Comparing the carrying amount of the CGU to the recoverable amount of the CGU",
          "Carrying Amount of Recoverable Amount of",
          "the CGU                      >              the CGU",
          "(carrying amount of all assets in the CGU added together)",
          "• As previously, an impairment exists where the carrying amount exceeds the recoverable amount."
        ]
      },
      {
        "title": "CGU : Impairment",
        "items": [
          "As a CGU is a collection of assets, CGU’s impairment loss should be shared among the assets in the CGU in the following order:",
          "1. Obviously impaired assets – damaged assets",
          "2. Purchased goodwill",
          "3. The other assets (including other intangible assets) in the CGU on a pro rata basis based on the carrying amount of each asset in the CGU.",
          "No individual asset should be written down below its recoverable amount Recoverable amount of cash? Recoverable amount of cash is its carrying amount",
          "Illustration 3, TUU 11 - Homework, TUU 13"
        ]
      },
      {
        "title": "Disclosures",
        "items": [
          "IAS 36 requires disclosure of the following:",
          "• impairment losses recognised during the period",
          "• impairment reversals recognised during the period.",
          "For each material loss or reversal:",
          "• the amount of loss or reversal and the events causing it",
          "• the recoverable amount of the asset (or cash generating unit)",
          "• the level of fair value hierarchy (per IFRS 13) used in determining fair value less costs to sell the discount rate(s) used."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "IAS 36 applies to all assets other than:",
          "Construction contracts (IFRS 15)",
          "Assets arising from employee benefits (IAS 19 is excluded from FR)",
          "Financial assets included within the scope of IFRS 9"
        ],
        "answer": 0
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Assets arising from employee benefits (IAS 19 is excluded from FR)",
          "Financial assets included within the scope of IFRS 9",
          "Investment property measured at fair value (IAS 40)",
          "Construction contracts (IFRS 15)"
        ],
        "answer": 3
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Investment property measured at fair value (IAS 40)",
          "Non-current assets classified as held for sale (IFRS 5).",
          "Assets arising from employee benefits (IAS 19 is excluded from FR)",
          "Financial assets included within the scope of IFRS 9"
        ],
        "answer": 2
      }
    ],
    "practice": []
  },
  {
    "slug": "non-current-assets-held-for-sale",
    "title": "Non-current Assets Held for Sale",
    "standard": "IFRS 5",
    "blocks": [
      {
        "title": "IFRS 5 Non-current Assets Held for Sale and",
        "items": [
          "Discontinued Operations     Malindu Udawatta"
        ]
      },
      {
        "title": "IFRS 5 Non-current Assets Held for Sale and Discontinued Operations",
        "items": [
          "CGU/ A group of CGUs",
          "A discontinued operation is a component of an entity that has either been disposed of, or is classified as held for sale, and:",
          "• Represents a separate major line of business or geographical area of operations, or",
          "• Is part of a single coordinated plan to dispose of a separate major line of business, or geographical area of operations, or",
          "• Is a subsidiary acquired exclusively with a view to resale",
          "* A CGU is the smallest identifiable group of assets which generates cash inflows independent of those of other assets"
        ]
      },
      {
        "title": "Company X",
        "items": [
          "Company Y",
          "Ice Cream   Chocolates     Beverages",
          "Chocolates with nuts",
          "America        China     India",
          "Chocolates",
          "with fruits               New York",
          "California White Chocolate LA"
        ]
      },
      {
        "title": "IFRS 5 Non-current Assets Held for Sale and Discontinued Operations",
        "items": [
          "An operation is held for sale if its carrying amount will not be recovered principally by continuing use. To be classified as held for sale (and therefore to be a discontinued operation) at the reporting date, it must meet the following criteria.",
          "• The asset must be available for immediate sale in its present condition",
          "• The sale must be highly probable, meaning that:",
          "✓ Appropriate level of management is committed to a plan to sell the asset",
          "✓ An active programme to locate a buyer has started, and",
          "✓ The asset is being actively marketed at a reasonable price in relation to its fair value",
          "• The sale is expected to be completed within 12 months of its classification",
          "• It is unlikely that the plan will be significantly changed or will be withdrawn"
        ]
      },
      {
        "title": "IFRS 5 Presentation",
        "items": [
          "IFRS 5 requires information about discontinued operations to be presented in the financial statements.",
          "• Classifying an operation as discontinued will result in non-current assets and related liabilities of the operation being classified as held for sale",
          "• A single amount should be presented on the face of the statement of profit or loss and other comprehensive income that is comprised of:",
          "– the total of the post-tax profit or loss of discontinued operations",
          "– the post-tax gain or loss on the measurement to fair value less costs to sell or on the disposal of the assets and liabilities in the discontinued operation.",
          "• An analysis of the single amount described above should be provided on the face of the statement of profit or loss and other comprehensive income or in the notes to the financial statements.",
          "• Non-current assets in discontinued operation will be classified as Held for Sale and presented separately on the face of Balance Sheet under Current Assets"
        ]
      },
      {
        "title": "IFRS 5 Presentation",
        "items": [
          "• If a decision to sell an operation is taken after the year-end but before the accounts are approved, this is a non-adjusting event after the reporting date and disclosed in the notes. The operation does not qualify as a discontinued operation at the reporting date and separate presentation is not appropriate.",
          "• In the comparative figures the operations are also shown as discontinued (even though they were not classified as such at the end of the previous year)."
        ]
      },
      {
        "title": "Statement of Financial Position as at 31/12/20X0   Statement of Profit or Loss for the year ended",
        "items": [
          "$       $                  31st December 20X0",
          "Non-current assets:                                                                                      $",
          "Property, plant and equipment      XXX     XXX",
          "Continuing Operations",
          "Current assets:                                    Revenue                                              XXX",
          "Inventories                        XXX             Cost of sales                                        (XXX)",
          "Cash and cash equivalents          XXX             Gross profit                                         XXX",
          "Non-current assets held for sale   XXX     XXX",
          "Total Assets                               XXX",
          "Distribution costs                                   (XXX)",
          "Share capital                      XXX             Administration expenses                              (XXX)",
          "Retained earnings                  XXX             Profit from operations                               XXX",
          "Total Equity                               XXX",
          "Finance cost                                         (XXX)",
          "Non-current liabilities                            Profit before tax                                    XXX",
          "Long-term borrowings               XXX             Income tax expense                                   (XXX)",
          "XXX     Profit from continuing operations                    XXX",
          "Current liabilities:",
          "Trade and other payables           XXX",
          "XXX     Discontinued Operations",
          "Total Equity and Liabilities               XXX     Profit for the period from discontinued operations   XXX",
          "Total profit for the period                          XXX     20"
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "A non-current asset or a disposal group should be classified as ‘held for sale’ if its carrying amount will be recovered principally through a sale transaction rather than through continuing use",
          "A disposal group is a group of assets (and possibly liabilities) that the entity intends to dispose of in a single transaction.",
          "For the definition of Non-Current Assets Held for Sale to be met, the following conditions must be satisfied:",
          "The asset must be available for immediate sale in its present condition"
        ],
        "answer": 0
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "For the definition of Non-Current Assets Held for Sale to be met, the following conditions must be satisfied:",
          "The asset must be available for immediate sale in its present condition",
          "The sale must be highly probable, meaning that:",
          "A disposal group is a group of assets (and possibly liabilities) that the entity intends to dispose of in a single transaction."
        ],
        "answer": 3
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "The sale must be highly probable, meaning that:",
          "Appropriate level of management is committed to a plan to sell the asset",
          "For the definition of Non-Current Assets Held for Sale to be met, the following conditions must be satisfied:",
          "The asset must be available for immediate sale in its present condition"
        ],
        "answer": 2
      }
    ],
    "practice": []
  },
  {
    "slug": "revenue",
    "title": "Revenue",
    "standard": "IFRS 15",
    "blocks": [
      {
        "title": "Revenue",
        "items": [
          "• Revenue is income arising in the course of an entity's normal trading or operating activities",
          "• ‘Revenue’ presented in the statement of profit or loss should not include proceeds from the sale of non- current assets or sales tax",
          "• The applicable accounting standard for recognition and measurement of revenue is IFRS 15 Revenue from Contracts with Customers",
          "• As per IFRS 15, an entity should follow a five step process in recognizing revenue",
          "1 Identify the contract",
          "2 Identify the separate performance obligations within a contract",
          "3 Determine the transaction price",
          "4 Allocate the transaction price to the performance obligations in the contract",
          "5 Recognize revenue when (or as) a performance obligation is satisfied"
        ]
      },
      {
        "title": "Illustration",
        "items": [
          "On 1 December 2000, Y Ltd receives an order from a customer for a machine as well as 12 months of technical support. Y Ltd delivers the machine (and transfers its legal title) to the customer on the same day. The customer paid $840 upfront. The machine sells for $600 and the technical support sells for $240.",
          "How much revenue should be recognized in respect of this contract in the year ended 31st Dec 2000 ?"
        ]
      },
      {
        "title": "1     Identify the contract",
        "items": [
          "• A contract is an agreement between two or more parties that creates enforceable rights and obligations.",
          "• A contract can be agreed in writing, orally, or through other customary business practices.",
          "• An entity can only account for revenue from contract that meet all of the following criteria:",
          "1. The parties to the contract have approved the contract and are committed to perform their respective obligations",
          "2. The entity can identify each party’s rights regarding the goods or services to be transferred",
          "3. The entity can identify the payment terms for the goods or services to be transferred",
          "4. The contract has commercial substance",
          "5. It is probable that the entity will collect the consideration to which it will be entitled in exchange for the goods or services that will be transferred to the customer"
        ]
      },
      {
        "title": "1     Identify the contract: Example 1",
        "items": [
          "• X Ltd has a year end of 31 March 2005.",
          "• On 1 January 2005, X Ltd signed a contract with a customer to supply them with an asset on 31 March 2005 in return for payment of $720,000 on 30 September 2005. Control of the asset would pass to the customer on 31 March 2005.",
          "• By 31 March 2005, X Ltd did not believe that it would probably be paid the $720,000. Therefore, the contract cannot be accounted for and no revenue should be recognised."
        ]
      },
      {
        "title": "2 Identify the Separate Performance Obligations within a Contract                                                    FR",
        "items": [
          "• Performance obligations are promises to transfer distinct goods or services to a customer.",
          "• Some contracts contain more than one performance obligation.",
          "E.g. An entity may enter into a contract with a customer to sell a car, which includes one year’s free servicing and maintenance",
          "E.g. An entity might enter into a contract with a customer to provide 5 lectures, as well as to provide a textbook on the first day of the course.",
          "• The distinct performance obligations within a contract must be identified",
          "• Distinct performance obligations within a contract must be identified. A promised good or service is distinct if:",
          "1. the customer can benefit from the good or service on its own or by using resources that are readily available, and",
          "2. the promise to provide the good or service is separately identifiable from other contractual promises"
        ]
      },
      {
        "title": "2 Identify the Separate Performance Obligations: Example",
        "items": [
          "• Starling entered into a contract to build a school for one of its customers. To fulfil the contract, Starling must provide various services, such as clearing the site, laying foundations, procuring the materials, construction, wiring of the building, installation of equipment, and decoration.",
          "• The customer can benefit from each of these services individually, evidenced by the fact that these services could be purchased separately from a range of entities. However the services are not separately identifiable because Starling is being contracted to significantly integrate them into an identified output (a school).",
          "• As such, Starling accounts for all of the promised services as a single performance obligation."
        ]
      },
      {
        "title": "2 Identify the Separate Performance Obligations: Warranties                                                SBR New",
        "items": [
          "• Most of the time, a warranty is assurance that a product will function as intended. If this is the case, then the warranty will be accounted for in accordance with lAS 37 Provisions, Contingent Liabilities and Contingent Assets.",
          "• If the customer has the option to purchase the warranty separately, then it should be treated as a distinct performance obligation. This means that a portion of the transaction price must be allocated to it (see step",
          "4)."
        ]
      },
      {
        "title": "2 Identify the Separate Performance Obligations",
        "items": [
          "• Performance obligations may not be limited to the goods or services that are explicitly stated in the contract",
          "• An entity’s customary business practices, published policies or specific statements may create an expectation that the entity will transfer a good or service to the customer.",
          "• An entity must decide if the nature of a performance obligation is:",
          "• To provide the specified goods or services itself (i.e. it is the principal), or",
          "• To arrange for another party to provide the goods or service (i.e. it is an agent)",
          "• An entity is the principal if it controls the good or service before it is transferred to the buyer",
          "• If an entity is an agent, then revenue is recognized based on the fee or commission to which it is entitled."
        ]
      },
      {
        "title": "2 Identify the Separate Performance Obligations: Example",
        "items": [
          "• X Ltd’s sales include $90,000 for goods it sold acting as an agent for Y Ltd. X Ltd earned a commission of 10% on these sales and remitted the difference of $81,000 (included in cost of sales) to Y Ltd.",
          "• How should the agency sale be treated in Hadrian's statement of profit or loss?",
          "What has been recorded          What should have been recorded",
          "Dr Cash           90,000        Dr Cash            90,000",
          "Cr Sales          90,000        Cr Sales            9,000",
          "Dr Payable to Y 81,000 Dr Cost of sales 81,000",
          "Cr Cash          81,000         Dr Payable to Y    81,000",
          "Cr Cash            81,000"
        ]
      },
      {
        "title": "3       Determine the transaction price",
        "items": [
          "• The transaction price is the amount of consideration to which an entity expects to be entitled in exchange for transferring promised goods or services to a customer.",
          "• Amounts collected on behalf of third parties (such as sales tax) are excluded.",
          "• When determining the transaction price, an entity shall consider the effects of all of the following:",
          "• Variable consideration",
          "• The existence of a significant financing component in the contract",
          "• Non-cash consideration",
          "• Consideration payable to a customer"
        ]
      },
      {
        "title": "Determine the transaction price",
        "items": [
          "3 Variable Consideration                                                                       SBR New Knowledge",
          "• If a contract with a customer can include variable consideration like in the following situation: Construction Company C enters into a contract with Customer E to build a factory. Company C will get 110,000 (fixed consideration) for constructing the factory and an additional 30,000 (variable consideration) if the factory is finished within 2 years.",
          "• Variable consideration should be included within the transaction price if it is highly probable that a significant reversal in the amount of cumulative revenue will not occur when the uncertainty is resolved"
        ]
      },
      {
        "title": "Determine the transaction price",
        "items": [
          "3 Variable Consideration: Example 3                                                           SBR New Knowledge",
          "• On 1 December 2005, Company M provides a service to a customer for the next 12 months. The consideration is $24 million. Company M is entitled to an extra $6 million if, after twelve months, the number of mistakes made falls below a certain level. Required: Discuss the accounting treatment of the above in Company M’s financial statements for the year ended 31 December 2005 if:",
          "1.     Company M has experience of providing identical services in the past and it is highly probable that",
          "the number of mistakes made will fall below the acceptable level.",
          "2.     Company M has no experience of providing this service and is unsure if the number of mistakes",
          "made will fall below the level."
        ]
      },
      {
        "title": "Determine the transaction price",
        "items": [
          "3 Variable Consideration: Example 3                                                             SBR New Knowledge",
          "a) Based on past experience, it seems highly probable that a significant reversal in revenue recognised would not occur. This means that the transaction price is $30 million ($24m + $6m). As a service, it is likely that the performance obligation would be satisfied over time. The revenue recognised in the year ended 31 December 2005 would therefore be 2.50 million ($30m × 1/12).",
          "b) The estimated variable consideration cannot be included in the transaction price because it is not highly probable that a significant reversal in revenue would not occur. This is because Company M has no experience of providing this service. Therefore, the transaction price is $24 million As a service, it is likely that the performance obligation would be satisfied over time. The revenue recognised in the year ended 31 December 2005 would be $2 million ($24m × 1/12)."
        ]
      },
      {
        "title": "Determine the transaction price",
        "items": [
          "3 Variable Consideration                                                                     SBR New Knowledge",
          "• When products are sold with the right to return, then also the consideration is variable. Retailer B sells 100 products at a price of 100 each and receives a payment of 10,000. The sales contract allows the customer to return any undamaged products within 30 days and receive a full refund in cash.",
          "• The entity must estimate the likelihood of any returns and record revenue only up to the amount that is highly likely not to be returned.",
          "• For the consideration received, but likely to be returned a refund liability should be recorded."
        ]
      },
      {
        "title": "Determine the transaction price",
        "items": [
          "3 Variable Consideration: Example 4                                                         SBR New Knowledge",
          "• Company X enters into 50 contracts with customers. Each contract includes the sale of one product for $2,000. Cash is received upfront and control of the product transfers on delivery. Customers can return the product within 30 days to receive a full refund. Company X can sell the returned products at a profit.",
          "• Company X has significant experience in estimating returns for this product. It estimates that 48 products will not be returned. Required: How should the above transaction be accounted for?",
          "Dr Cash                    100,000",
          "Cr Revenue                  96,000",
          "Cr Refund liability          4,000"
        ]
      },
      {
        "title": "Determine the transaction price",
        "items": [
          "3 Financing                                                                                        FR Knowledge",
          "• In determining the transaction price, an entity must consider whether terms of the contract provide the customer or the entity with a significant financing benefit.",
          "• The following may indicate the existence of a significant financing component:",
          "• The significant difference between the amount of promised consideration and the cash selling price of the promised goods or services",
          "• The long length of time (> 1 year) between the transfer of the promised goods or services to the customer and the payment date",
          "• If there is a significant financing component, then the consideration receivable needs to be discounted to present value using the rate at which the customer would borrow.",
          "• The discount on the receivable balance is then unwound over the relevant period up to the date of receipt of cash from the customer and the interest is recognized as finance income."
        ]
      },
      {
        "title": "Determine the transaction price",
        "items": [
          "3 Financing: Example 5                                                                                 FR Knowledge",
          "A retailer of electrical goods offers three year 0% finance on items offered for sale at $3,000. The cash price of the goods is $2,500. The rate of interest on available to the borrower is 10%.",
          "Year 1                        Year 2                     Year 3",
          "Sale Date                                                             Payment of $3,000",
          "by customer",
          "Present value of the                 3, 000",
          "=",
          "payment                            (1 + 0.1)3",
          "= 2,254"
        ]
      },
      {
        "title": "Determine the transaction price",
        "items": [
          "3 Financing: Example 5                                                                       FR Knowledge",
          "At the start of year 1 Dr Receivable 2,253",
          "Cr Sales         2,253",
          "At the end of year 1",
          "Year 1                  Year 2               Year 3",
          "Sale Date                                                  Payment of $3,000 by",
          "customer",
          "Value of the receivable = 2,254 × (1 + 0.1)1 Finance income = 2,479 − 2,253",
          "= 2,479                                 = 226"
        ]
      },
      {
        "title": "Determine the transaction price",
        "items": [
          "3 Financing: Example 5                                          FR Knowledge",
          "At the end of year 1",
          "• Double entry to adjust to unwind the discount:",
          "Dr Receivable                        225",
          "Cr Finance income                    225",
          "Value of the receivable",
          "At the beginning of year 1                               2,254",
          "At the end of year 1      (2,254 * 1.1)                  2,479",
          "At the end of year 2      (2,479 * 1.1)                  2,727",
          "At the end of year 3      (2,727 * 1.1)                  3,000"
        ]
      },
      {
        "title": "Determine the transaction price",
        "items": [
          "3 Non-Cash Consideration                                                                       SBR New Knowledge",
          "• Customers do not always pay using cash or credit. The customer may pay using shares in their entity, share options or using other assets.",
          "• Any non-cash consideration should be valued at fair value.",
          "X sells a good to Y. Control over the good is transferred on 1 January 2011. The consideration received by X is 2,000 shares in Y with a fair value of $4 each. By 31 December 2011, the shares in Y have a fair value of $5 each",
          "Consideration for the transaction is non-cash. Non-cash consideration is measured at fair value. Revenue should be recognised at $8,000 (2,000 shares × $4) on 1 January 2011. Any subsequent change in the fair value of the shares received is not recognised within revenue but instead accounted for in accordance with IFRS 9 Financial Instruments."
        ]
      },
      {
        "title": "Determine the transaction price",
        "items": [
          "3 Consideration payable to a customer                                                                    FR Knowledge",
          "• Consideration payable to a customer includes cash amounts that a business expects to pay to a customer who buys goods from the business",
          "• How this consideration payable to a customer is treated depends on:",
          "1. If consideration is paid to a customer in exchange for a distinct good or service, then it is essentially a purchase transaction and should be accounted for in the same way as other purchases from suppliers. A car dealer sells several cars to a company that provides cleaning services (customer) – Payment by the customer to the entity The same cleaning company provides cleaning services to the car dealer – payment by the entity to the customer",
          "2. Assuming that the consideration paid to a customer is not in exchange for a distinct good or service, an entity should account for it as a reduction of the transaction price"
        ]
      },
      {
        "title": "Allocate the transaction price to the",
        "items": [
          "4     performance obligations in the contract",
          "• The total transaction price should be allocated to each performance obligation in proportion to standalone selling prices.",
          "• The best evidence of a standalone selling price is the observable price of a good or service when the entity sells that good or service separately in similar circumstances and to similar customers.",
          "• If a standalone selling price is not directly observable, then the entity estimates the standalone selling price.",
          "Total Transaction Price",
          "Performance                      Performance                      Performance",
          "Obligation 1                     Obligation 2                     Obligation 3"
        ]
      },
      {
        "title": "Allocate the transaction",
        "items": [
          "4 Discounts                                                                                           FR Knowledge",
          "• In relation to a bundled sale, any discount should generally be allocated across each performance obligation in the transaction.",
          "• A discount should only be allocated to a specific component of the transaction if that performance obligation (component) is regularly sold separately at a discount"
        ]
      },
      {
        "title": "Recognize revenue when (or as)",
        "items": [
          "4     a performance obligation is satisfied",
          "• An entity recognises revenue when or as it satisfies a performance obligation by transferring a good or service to a customer, either at a point in time or over time",
          "A good or service is ‘transferred’ when or as the customer obtains control of it.",
          "• Simply, revenue is recognized when/ as control of the good or service is transferred to the customer",
          "• For each performance obligation identified, an entity must determine at contract inception whether it",
          "• Satisfies the performance obligation over time,",
          "• Satisfies the performance obligation at a point in time"
        ]
      },
      {
        "title": "Recognize revenue",
        "items": [
          "4 Performance obligation satisfied over time                                                          FR Knowledge",
          "• An entity satisfies a performance obligation and recognises revenue over time, if one of the following criteria is met:",
          "Criterion                                                       Example",
          "1 The customer simultaneously receives and consumes the            Routine or recurring services –",
          "benefits provided by the entity’s performance as the entity      e.g. cleaning services",
          "performs",
          "2 The entity’s performance creates or enhances an asset that       Building an asset on a",
          "the customer controls as the asset is created or enhanced        customer’s site",
          "3 The entity’s performance does not create an asset with an        Building a specialised asset that",
          "alternative use to the entity and the entity has an              only the customer can use or",
          "enforceable right to payment for performance completed to        building an asset to a",
          "date                                                             customer’s specifications",
          "• If a performance obligation is satisfied over time, then revenue is recognized over time based on progress towards the satisfaction of that performance obligation."
        ]
      },
      {
        "title": "Recognize revenue",
        "items": [
          "4 Performance obligation satisfied over time",
          "• TUU 8 & TUU 9"
        ]
      },
      {
        "title": "Recognize revenue",
        "items": [
          "4 Performance obligation satisfied at a point in time                                                 FR Knowledge",
          "• If a performance obligation is not satisfied over time by meeting one of the criteria discussed before, then the performance obligation is satisfied at a point in time",
          "• For such performance obligations the entity must determine the point in time at which the performance obligation is satisfied. This is the point at which the control of the good or service is transferred to the customer and revenue should be recognized",
          "Point at which the                Point at which control of the               Point at which",
          "performance              =     promised good or service is         =         revenue is",
          "obligation is satisfied            transferred to the customer                  recognized"
        ]
      },
      {
        "title": "Recognize revenue",
        "items": [
          "4 Performance obligation satisfied at a point in time                                                FR Knowledge",
          "• ‘Control’ refers to the customer’s ability to direct the use of, and obtain substantially all of the remaining benefits from, an asset.",
          "• Benefits are potential cash flows are obtained either directly or indirectly – e.g. from the use, consumption, sale or exchange of an asset – are benefits of an asset.",
          "• Control also includes the ability to prevent other entities from directing the use of, and obtaining the benefits from, an asset.",
          "• The following are indicators that control has passed to the customer:",
          "1. The business has a present right to payment for the good or service from the customer",
          "2. The customer has legal title to the good or service",
          "3. The customer physical possession of the good",
          "4. The customer has the significant risks and rewards of ownership of the good or service",
          "5. The customer has accepted the good or service"
        ]
      },
      {
        "title": "Contract Modifications",
        "items": [
          "• A contract modification is a change in the scope or price of a contract.",
          "• The modification is accounted for as a separate contract if:",
          "1. The scope of the contract increases because of the addition of distinct goods or services, and",
          "2. The price increases by an amount that reflects the stand-alone selling prices of the additional goods or services.",
          "• If not accounted for as a separate contract, the modification will be accounted for as:",
          "1. If the remaining goods are distinct from those transferred before the modification – account as the termination of the existing contract and the creation of a new contract The transaction price for this new contract is the total of",
          "– the original consideration unrecognised, and",
          "– the additional consideration promised from the modification."
        ]
      },
      {
        "title": "Contract Modifications",
        "items": [
          "2. If the remaining goods and services are not distinct from those transferred before the modification and so form part of a single performance obligation – account for as part of the original contract, This modification will impact the contract price and the stage of contract completion. It is dealt with by adjusting the amount of cumulative revenue recognized at the modification date (cumulative catchup adjustment) Example The reporting entity, a construction company, enters into a contract to construct a commercial building for another company. One year later, both companies agree to modify the contract by changing the floor plan of the building. This results in an increase to the contract price. The remaining goods and services to be provided under the modified contract are not distinct from the services transferred before the date of contract modification. This is because the contract still contains one performance obligation (i.e. to construct a commercial building). Consequently, the reporting entity accounts for the contract modification as if it was part of the original contract. A cumulative catchup adjustment will be required."
        ]
      },
      {
        "title": "Contract Modifications",
        "items": [
          "Part of the original contract"
        ]
      },
      {
        "title": "Contract Costs",
        "items": [
          "• As per IFRS 15 the following costs must be capitalized in respect of each contract with customers:",
          "• The incremental costs of obtaining a contract that are expected to be recoverable - This must exclude costs that would have been incurred regardless of whether the contract was obtained or not (such as some legal fees, or the costs of travelling to a tender)",
          "• The costs of fulfilling a contract if they do not fall within the scope of another standard (such as IAS 2) and the entity expects them to be recovered.",
          "• The capitalised costs will be amortised as revenue is recognised. This means that they will be expensed to cost of sales as the contract progresses.",
          "• These will be matched to revenue based on either the input or output method of measuring progress.",
          "• This means cost of sales will be measured as % progress made × total costs.",
          "• General costs, and costs of wasted labour and materials, are expensed to profit or loss as incurred."
        ]
      },
      {
        "title": "Performance obligation satisfied over time",
        "items": [
          "• For a contract with a customer where revenue is recognised over time, expected outcome of the contract should be calculated at the beginning",
          "• Expected outcome = Expected Total Revenue – (Cost to date + Costs to complete)",
          "1. If the expected outcome is a profit",
          "• revenue and costs should be recognised according to the progress of the contract",
          "2. If the expected outcome is a loss",
          "• the whole loss should be recognised immediately, recording a provision as an onerous contract",
          "3. If the expected outcome or progress is unknown (often due to it being in the very early stages of the contract):",
          "• Revenue should be recognised to the level of recoverable costs - usually costs spent to date",
          "• Contract costs should be recognised as an expense in the period in which they are incurred",
          "• In the majority of cases, this will mean that revenue and cost of sales will both be stated at costs incurred to date, with no profit or loss recorded."
        ]
      },
      {
        "title": "Construction Contracts",
        "items": [
          "• A common situation in which revenue is recognized overtime is when a building company constructs an asset for a customer.",
          "• As long as the building company is not able to use the asset or sell the asset to another party, and has a right to payment for work to date, revenue would be recognised over time – Third type of performance obligation satisfied over time",
          "• For each performance obligation satisfied over time, the entity must measure the progress towards complete satisfaction of the performance obligation and that progress is used to calculate the revenue to be recognized each year",
          "• Appropriate methods of measuring progress include:",
          "• Output methods  Surveys of performance - the value of the work certified as completed so far compared to the overall contract price  Time elapsed - time spent on the contract compared to total duration expected for the project",
          "• Input methods - such as costs incurred to date as a proportion of total expected costs"
        ]
      },
      {
        "title": "Presentation in Financial Statements",
        "items": [
          "• Contracts with customers are presented in an entity's statement of financial position as a contract liability, a contract asset or a receivable, depending on the relationship between the entity's performance and the customer's payment.",
          "• A contract liability is recognised and presented in the statement of financial position where a customer has paid an amount of consideration prior to the entity performing by transferring control of the related good or service to the customer.",
          "• When the entity has performed but the customer has not yet paid the related consideration, this will give rise to either a contract asset or a receivable.",
          "1. A contract asset is recognised when the entity's right to consideration is conditional on something other than the passage of time, for instance future performance.",
          "2. A receivable is recognised when the entity's right to consideration is unconditional except for the passage of time."
        ]
      },
      {
        "title": "Disclosures",
        "items": [
          "• IFRS 15 requires an entity to disclose",
          "• revenue recognised from contracts with customers",
          "• contract balances and assets recognised from costs incurred obtaining or fulfilling contracts",
          "• significant judgements used, and any changes in judgements."
        ]
      },
      {
        "title": "Judgement",
        "items": [
          "• Management judgement is required throughout the revenue recognition process. For example:",
          "• Contracts with customers do not need to be in writing but may arise through customary business practice. An entity must therefore ascertain whether it has a constructive obligation to deliver a good or service to a customer.",
          "• A contract can only be accounted for if it is probable that the entity will collect the consideration that it is entitled to. Whether benefits are probable is, ultimately, a judgement.",
          "• The entity must identify distinct performance obligations in a contract. However, past performance may give rise to expectations in a customer that goods or services not specified in the contract will be transferred. The identification of distinct performance obligations thus relies on management judgement about both contract terms, and the impact of the entity’s past behaviour on customer expectations.",
          "• Variable consideration should be included in the transaction price if it is highly probable that a significant reversal in the amount of cumulative revenue recognised to date will not occur. This may involve making judgements about whether performance related targets will be met."
        ]
      },
      {
        "title": "Judgement",
        "items": [
          "• The transaction price must be allocated to distinct performance obligations, based on observable, standalone selling prices. However, estimation techniques must be used if observable prices are not available.",
          "• If a performance obligation is satisfied over time, revenue is recognized based on progress towards the completion of the performance obligation. There are various ways to measure completion, using either input or output methods, and the entity must determine which one most faithfully represents the transaction.",
          "• If a performance obligation is satisfied at a point in time, the entity must use judgement to ascertain the date at which control of the asset passes to the customer.",
          "• These judgements increase the risk that the management of an entity could manipulate its profits. Adherence to the ACCA ethical code is, therefore, vital."
        ]
      },
      {
        "title": "Recognize revenue",
        "items": [
          "4 Consignment Inventory                                                                              FR Knowledge",
          "• An entity may deliver goods to another party but retain control of the goods – e.g. it may deliver a product to a dealer or distributor for sale to an end customer. These types of arrangements are called ‘consignment arrangements",
          "• In such an arrangement the key issue is to identify who has the majority of indicators of control, the customer or the business?"
        ]
      },
      {
        "title": "Recognize revenue",
        "items": [
          "4 Consignment Inventory: Example 8                                                           FR Knowledge",
          "• On 1 January 2007 MotorPet, a car manufacturer, entered into an agreement to provide AMB, a car retailer, with cars for resale.",
          "• The terms of the agreement were as follows:",
          "1. AMB pays the cost of insuring and maintaining the cars.",
          "2. AMB shows the cars in its showrooms",
          "3. When a car is sold, AMB pays MotorPet the factory price prevailing at the time the car was originally delivered.",
          "4. All cars remaining unsold 180 days after their delivery should be bought by AMB at the factory price prevailing at the time of delivery.",
          "5. MotorPet can require AMB to return the cars at any time within the 180-day period. In practice, this has never happened.",
          "6. AMB can return unsold cars to MotorPet at any time during the 180-day period, without penalty. In practice, this has never happened.",
          "• At 31 December 2007 the agreement is still in force and AMB holds several cars which were delivered less than 180 days earlier."
        ]
      },
      {
        "title": "Recognize revenue",
        "items": [
          "4 Consignment machine: Example 8                                                                      FR Knowledge",
          "• How should these cars be treated in the financial statements of AMB for the year ended 31 December 2007?",
          "• The key issue to answer is whether control of the cars has been transferred to AMB or not",
          "1. AMB has to pay the cost of insurance and maintenance - costs of ownership",
          "2. When a car is sold, AMB pays to MotorPet the factory price at the date of delivery – suggests that after delivery AMB is exposed to costs and benefits of price fluctuations of the car",
          "3. Within the 180 days period, MotorPet can demand the return of the cars and AMB is able to return them without paying a penalty. This suggests that AMB does not have the automatic right to retain or to use them. However, although the agreement provides for the return of the cars at either party’s request, in practice this has never happened.",
          "• Conclusion: when cars are delivered to AMB, control of the cars are transferred to AMB by MotorPet – performance obligation is satisfied and revenue should be recognized",
          "• The cars are assets of AMB and should be included in its statement of financial position as machine ."
        ]
      },
      {
        "title": "Recognize revenue",
        "items": [
          "4 Repurchase Agreement                                                                       FR Knowledge",
          "• A repurchase agreement is where an entity sells an asset but retains a right to repurchase the asset.",
          "• This is often not recognised as a sale, but as a secured loan against the asset.",
          "• Indicators that a repurchase agreement is not a real sale may include:",
          "• Sale price is below the fair value of the asset",
          "• Option to repurchase is below the expected fair value of the asset",
          "• Entity that sold the asset continues to use the asset",
          "• Entity continues to hold the majority of risks and rewards associated with ownership of the asset",
          "• Sale is to a bank or financing company"
        ]
      },
      {
        "title": "Recognize revenue",
        "items": [
          "4 Repurchase Agreement: Example 9                                                                     FR Knowledge",
          "• GQ Ltd sells a machine, with a cost of $1 million, to ComB, a bank, for its fair value of $1.5 million on 1 January 2000.",
          "• GQ Ltd has the option to repurchase the machine on 31 December 2007 for $2.2 million. GQ Ltd will continue to hold the machine within its warehouse as normal throughout the period, and so is responsible for its maintenance and insurance.",
          "• At 31 December 2007 (date of repurchase ) the machine is expected to have a fair value of $4 million. Giving reasons, show how GQ Ltd should record the above transaction during the year ended 31 December",
          "2000."
        ]
      },
      {
        "title": "Recognize revenue",
        "items": [
          "4 Repurchase Agreement: Example 9                                                                   FR Knowledge",
          "• The question is whether this transaction is an actual sale or a secured loan against the asset",
          "• Repurchase price of 2.2 Mn is below the expected fair value of 4 Mn and GQ Ltd continues to use/ hold the asset",
          "• GQ Ltd continues to maintain and insure the asset and will benefit from increase in its value and Sale is to ComB, a bank",
          "• Above points indicate that this transaction is not actual sale but rather a loan taken by GQ Ltd using machine is security",
          "• GQ Ltd should continue to recognize the machine in its balance sheet and record the loan proceeds of 1.5 Mn as a loan",
          "Dr Cash                 1.5",
          "Cr Loan                 1.5",
          "• The annual effective interest rate on this loan is",
          "1.5 * (1+ EIR)^8 = 2.2 (2.2/1.5)^1/8-1 = 4.9%"
        ]
      },
      {
        "title": "Recognize revenue",
        "items": [
          "4 Bill and Hold Arrangements                                                                       FR Knowledge",
          "• A bill and hold arrangement is a contract under which a business bills (raises an invoice) a customer for a product but the product remains physical with the business until it is taken by the customer in the future",
          "• For revenue to be recognized, the customer must have obtained control of the product, despite it physically remaining with the business",
          "• The business may recognize revenue under a bill and hold arrangement before the goods are delivered to the customer when all of the following conditions are met:",
          "1. The customer must have requested the arrangement",
          "2. The product must be identified as belonging to the customer",
          "3. The product must be ready for physical transfer to the customer",
          "4. The entity cannot have the ability to use the product or sell it to someone else",
          "• If the cost of the custodial service (service of safekeeping/ warehousing) provided by the business to the customer is significant, then custodial service can be a separate performance obligation that would be satisfied over time. So part of the transaction price should be allocated to this performance obligation"
        ]
      },
      {
        "title": "Recognize revenue",
        "items": [
          "4 Bill and Hold Arrangements : Example 10                                                           FR Knowledge",
          "• Company C enters into a contract to sell equipment to Customer D, who is awaiting completion of a factory and requests that C hold the equipment until the manufacturing facility is completed. C bills and collects the non-refundable transaction price from D and agrees to hold the equipment until D requests delivery.",
          "• The equipment is complete and segregated from C’s inventory and is ready for shipment. C cannot use the equipment or sell it to another customer.",
          "• C concludes that control of the equipment has transferred to D and that it will recognise revenue on a bill-and-hold basis even though the machine is still physically in Company C’s premises",
          "• If the cost of warehousing the goods is significant, the custodial service provided by the company C is a separate performance obligation to which part of the transaction price should be allocated and recognized over the time of providing the warehousing service"
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Revenue is income arising in the course of an entity's normal trading or operating activities",
          "‘Revenue’ presented in the statement of profit or loss should not include proceeds from the sale of non-current assets or sales tax",
          "The applicable accounting standard for recognition and measurement of revenue is IFRS 15 Revenue from Contracts with Customers",
          "As per IFRS 15, an entity should follow a five step process in recognizing revenue"
        ],
        "answer": 0
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "The applicable accounting standard for recognition and measurement of revenue is IFRS 15 Revenue from Contracts with Customers",
          "As per IFRS 15, an entity should follow a five step process in recognizing revenue",
          "Identify the separate performance obligations within a contract",
          "‘Revenue’ presented in the statement of profit or loss should not include proceeds from the sale of non-current assets or sales tax"
        ],
        "answer": 3
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Identify the separate performance obligations within a contract",
          "Determine the transaction price",
          "The applicable accounting standard for recognition and measurement of revenue is IFRS 15 Revenue from Contracts with Customers",
          "As per IFRS 15, an entity should follow a five step process in recognizing revenue"
        ],
        "answer": 2
      }
    ],
    "practice": [
      {
        "title": "Practice set",
        "question": "QUESTIONS Q1. Johan entered into the following sale transactions during the year: (a) On 1 April 20X6, Johan sold its factory to Cruyff, a finance company, for $800,000. Johan continued to use the factory and was responsible for the insurance and maintenance of the building. Johan has the right to repurchase the factory for $980,000 on 1 April 20X9, representing a 7% growth in value each year. At 1 April 20X6 the factory had a fair value of $1.5 million, with a carrying amount of $600,000. The fair value is expected to increase by April 20X9. (b) On 31 March 20X7, Johan sells an oven plus spare parts to Marco for $220,000. The price was split between $200,000 for the oven and $20,000 for the spare parts. Johan delivered the machine on 31 March 20X7 but was asked to hold the spare parts by Marco, because Marco’s factory was very close to Johan's warehouse. Johan expects to hold the spare parts for 2-4 years. The parts are kept separately in the warehouse, cannot be used or sold by Johan, and are ready for immediate delivery or collection at Marco's request. Johan agreed to the transaction as it decided that holding costs would be insignificant. Required: Explain the financial reporting treatment for the issues for the year ended 31 March 20X7 Q2 On 1 January 20X1, Baker entered into a contract with a customer to construct a specialised building for consideration of $2m plus a bonus of $0.4m if the building is completed within 18 months. Estimated costs to construct the building were $1.5m. If the contract is terminated by the customer, Baker can demand payment for the costs incurred to date plus a mark-up of 30%. On 1 January 20X1, as a result of factors outside of its control, Baker was not sure whether the bonus would be achieved. At 31 December 20X1 Baker had incurred costs of $1m. They were still unsure as to whether the bonus target would be met. Baker measures progress towards completion based on costs incurred. At 31 December 20X1 Baker had received $1 million from the customer. Required: How should this transaction be accounted for in the year ended 31 December 20X1? QUESTIONS Q3 On 1 January 20X1, Castle entered into a contract with a customer to construct a specialised building for consideration of $10m. Castle is not able to use the building themselves at any point during the construction. At 31 December 20X1, Castle had incurred costs of $6m. Costs to complete are estimated at $6m. Castle measures progress towards completion based on costs incurred. At 31 December 20X1 Castle had received $3 million from the customer. Required: How should this transaction be accounted for in the year ended 31 December 20X1? Q4 On 1 January 20X1 Amir entered into a contract with a customer to construct a stadium for consideration of $100m. The contract was expected to take 2 years to complete. At 31 December 20X1 Amir had incurred costs of $24m. Costs to complete are estimated at $20m. In addition to these costs, Amir purchased plant to be used on the contract at a cost of $16m. This plant was purchased on 1 January 20X1 and will have no residual value at the end of the 2 year contract. Depreciation on the plant is to be allocated on a straight-line basis across the contract. Amir measures progress on contracts using an output method, based on the value of work certified to date. At 31 December 20X1, the value of the work certified was $45 million, and the customer had paid $11.4m. Required: How should this transaction be accounted for in the year ended 31 December 20X1? Q5 Hardfloor Co fits out nightclubs. The projects generally take a number of months to complete. The company had three contracts in progress at the year ended 30 April 20X7, and details are as follows: Hardfloor Co accounts for revenue on its construction contracts using the percentage of completion derived from the sales earned as work certified compared to the total sales value. Calculate the effects of the above contracts upon the financial statements of Hardfloor Co for the year ended 30 April 20X7 QUESTIONS Q6 Merryview specialises in long-term contracts. In each contract Merryview is entitled to receive payments reflecting the progress of the work, so revenue should be recognised over time. One of its contracts, with Better Homes, is to build a complex of luxury flats. The price agreed for the contract is $40 million and its scheduled date of completion is 31 December 20X2. Details of the contract to 31 March 20X1 are: Plant and machinery used exclusively on the contract cost $3,600,000 on 1 July 20X0. At the end of the contract it is expected to be transferred to a different contract at a value of $600,000. Depreciation is to be based on a time-apportioned basis. Better Homes made a progress payment of $12,800,000 to Merryview on 31 March 20X1. At 31 March 20X2 the details for the construction contract have been summarised as: A further progress payment of $16,200,000 was received from Better Homes on 31 March 20X2. Merryview accounts for profit on its construction contracts using the input method, measured using the percentage of the cost to date compared to the total estimated contract cost. Required: Prepare extracts from the financial statements of Merryview reflecting the impact of the contract with Better Homes for: (i) the year to 31 March 20X1 (ii) the year to 31 March 20X2.",
        "answer": ""
      }
    ]
  },
  {
    "slug": "agriculture-inventories",
    "title": "Agriculture & Inventories",
    "standard": "IAS 41 / IAS 2",
    "blocks": [
      {
        "title": "Assets in Agriculture",
        "items": [
          "Biological Assets | IAS 41 Agriculture",
          "Bearer Plants | IAS 16 PPE",
          "Agricultural Produce | IAS 41 Agriculture at the point of harvest; IAS 2 Inventories thereafter",
          "Agricultural Land | IAS 16 PPE",
          "IAS 41 Agriculture applies to biological assets and to agricultural produce at the point of harvest."
        ]
      },
      {
        "title": "Biological Assets, Agricultural Produce and Products Resulting from Processing After Harvest",
        "items": [
          "Biological assets | Agricultural produce | Products resulting from processing after harvest",
          "Sheep | Wool | Yarn, carpet",
          "Trees in a timber Plantation | Felled trees | Logs, lumber",
          "Dairy cattle | Milk | Cheese",
          "Pigs | Carcass | Sausages, cured hams",
          "Cotton plants | Harvested cotton | Thread, clothing",
          "Sugarcane | Harvested cane | Sugar",
          "Tea bushes | Picked leaves | Tea",
          "Grape vines | Picked grapes | Wine",
          "Fruit trees | Picked fruit | Processed fruit",
          "Rubber trees | Harvested latex | Rubber products"
        ]
      },
      {
        "title": "Biological Assets",
        "items": [
          "• A biological asset is a living animal or plant",
          "Recognition",
          "• A biological asset should be recognized if:",
          "✓ It is probable that economic benefits will flow to the entity",
          "✓ The cost or fair value of the asset can be reliably measured",
          "✓ The entity controls the asset"
        ]
      },
      {
        "title": "Biological Assets: Initial Measurement",
        "items": [
          "• Initial Measurement of biological assets should be at Fair value less costs to sell",
          "• If there is no fair value, then use the cost model – this can only be done on initial recognition",
          "• Gains and losses may arise in profit or loss when a biological asset is first recognised. For example:",
          "1. A loss can arise because estimated selling costs are deducted from fair value.",
          "2. A gain can arise when a new biological asset (such as a lamb or a calf) is born."
        ]
      },
      {
        "title": "Biological Assets: Subsequent Measurement",
        "items": [
          "• Revalue to Fair value less costs to sell at year end, taking any gain or loss to P&L",
          "• The fair value of a biological asset may change because of its age, or because prices in the market have changed. IAS 41 recommends separate disclosure of physical and price changes because this information is likely to be of interest to users of the financial statements. However, this is not mandatory.",
          "• Biological assets are presented separately on the face of the statement of financial position within non- current assets.",
          "• If there is no active market for the asset then it may be possible to estimate fair value by using:",
          "1. The most recent market price",
          "2. The market price for a similar asset",
          "3. The discounted cash flows from the asset",
          "4. Net realizable value"
        ]
      },
      {
        "title": "Biological Assets: Subsequent Measurement",
        "items": [
          "• If there is no active market and the alternative methods of estimating fair value are clearly unreliable, then a biological asset is measured at cost less depreciation on initial recognition until a reliable fair value can be established. E.g. seedlings being grown on a plantation will not have any market value until they are a few years old",
          "• If fair value subsequently becomes reliably measurable, then the asset is measured at fair value less costs to sell."
        ]
      },
      {
        "title": "Agricultural produce",
        "items": [
          "Agricultural produce is the harvested product from biological assets Harvest is 'the detachment of produce from a biological asset or the cessation of a biological asset’s life processes'",
          "• At the date of harvest the agricultural produce should be recognized and measured at Fair Value less costs to sell",
          "• Gains and losses on initial recognition are included in profit or loss (profit from operations) for the period",
          "• After produce has been harvested, IAS 41 does not apply. Agricultural produce becomes an item of inventory.",
          "• Fair value less costs to sell at the point of harvest is taken as cost for the purpose of IAS 2 Inventories, which is applied from then onwards"
        ]
      },
      {
        "title": "Bearer plants",
        "items": [
          "• A bearer plant is a living plant that:",
          "✓ Is used in the production or supply of agricultural produce;",
          "✓ Is expected to bear fruit for more than one period; and",
          "✓ Has a remote likelihood of being sold as agricultural produce, except for incidental scrap sales",
          "• Bearer plants are accounted for under IAS 16 PPE, rather than IAS 41 Agriculture",
          "• Therefore items such as vines, tea bushes and fruit trees may be classed as bearer plants and treated as PPE rather than being accounted for under the provisions of IAS 41 Agriculture",
          "• However, any unharvested produce growing on a bearer plant, such as grapes on a grape vine, is a biological asset and so is accounted for in accordance with IAS 41."
        ]
      },
      {
        "title": "Assets Outside the Scope of IAS 41",
        "items": [
          "• IAS 41 does not apply to intangible assets (e.g. production quotas), bearer plants or to land related to agricultural activity",
          "• Intangible assets are measured at cost less amortization or fair value less amortization (if an active market exists) (IAS 38 Intangible Assets )",
          "• Land is not a biological asset. It is treated as a tangible non-current asset and IAS 16 PPE applies. This means that when a forest is valued, the trees must be valued separately from the land that they grow on"
        ]
      },
      {
        "title": "Government Grants & Biological Assets",
        "items": [
          "1. IAS 41 applies to government grants related to a biological asset measured as fair value less costs to sell",
          "• Unconditional government grants received in respect of biological assets measured at fair value are reported as income when the grant becomes receivable",
          "• If such a grant is conditional (including where the grant requires an entity not to engage in certain agricultural activity), the entity recognizes it as income only when the conditions have been met.",
          "2. IAS 20 applies to government grants related to biological assets to which the cost model applies - Government grants are recognized when there is reasonable assurance that the entity will comply with the relevant conditions and the grant will be received (i.e. under IAS 20 Accounting for Government Grants and Disclosure of Government Assistance)"
        ]
      },
      {
        "title": "Example",
        "items": [
          "Company X receives $100 as a government grant under the condition that it grow and harvest fruit trees in a certain location for at least the next 10 years. If X stops these activities at any time during the 10 years, then the full amount of the grant is repayable to the government. Accordingly, the 100 is deferred in the statement of financial position and will be recognised in profit or loss once the 10-year period has expired.",
          "If the facts were different and X became entitled to retain the grant on a pro rata basis as time passed, on a straight-line basis over the 10 years, then X would recognise 10 in profit or loss as each year of activity is completed",
          "When grant is received, but the conditions have not been satisfied Dr Cash Cr Government grant – deferred income (liability)",
          "When the conditions are satisfied Dr Government grant – deferred income (liability) Cr Government grant income – P&L"
        ]
      },
      {
        "title": "Disclosures",
        "items": [
          "IAS 41 says that an entity must disclose:",
          "• A description of each group of biological assets",
          "• Methods and significant assumptions used when determining fair value",
          "• A reconciliation of the carrying amounts of biological assets between the beginning and the end of the reporting period."
        ]
      },
      {
        "title": "What is Inventory?",
        "items": [
          "• Applicable accounting standard for inventory is IAS 2: Inventory",
          "• Inventories are assets:",
          "• Held for sale in the ordinary course of business – Finished goods",
          "• In the process of production for such sale – Work in Progress",
          "• In the form of materials or supplies to be consumed in the production process or in the rendering of services – Raw materials"
        ]
      },
      {
        "title": "IAS 2 Inventories",
        "items": [
          "Inventory shall be measured at the lower of cost and net realizable value",
          "Pick the lower one",
          "Cost                               NRV"
        ]
      },
      {
        "title": "Definition of Cost",
        "items": [
          "1. Cost of purchase",
          "✓ Purchase price including import duties, transport and handling costs",
          "✓ Any other directly attributable costs, less trade discounts, rebates and subsidies",
          "2. Cost of conversion",
          "✓ Costs which are specifically attributable to units of production, E.g. direct labor, direct expenses and subcontracted work",
          "✓ Production overheads, which must be based on the normal level of activity, E.g. Factory rent and electricity",
          "3. Other costs of bringing items of inventory to their present location and condition",
          "✓ E.g. - Cost incurred (payment to designer) in designing a product for a specific customer"
        ]
      },
      {
        "title": "Costs to Exclude",
        "items": [
          "• The following costs should be excluded and charged as expenses of the period in which they are incurred:",
          "✓ Abnormal waste - costs due to unexpected and abnormal conditions like low quality material, carelessness of staff and accidents",
          "✓ Storage costs of finished goods",
          "✓ Administrative overheads which do not contribute to bringing inventories to their present location and condition",
          "✓ Selling costs"
        ]
      },
      {
        "title": "Net Realizable Value",
        "items": [
          "NRV is the estimated selling price in the ordinary course of business, less the estimated cost of completion and the estimated costs necessary to make the sale",
          "Estimated                                          Estimated",
          "Selling Price in             Estimated                  Cost",
          "NRV",
          "=         the Ordinary",
          "Course of          -       Cost of",
          "Completion        -     Necessary to",
          "Make the",
          "Business                                             Sale"
        ]
      },
      {
        "title": "Net Realizable Value",
        "items": [
          "• The NRV of inventory held to satisfy a sales contract is normally evidenced by that contract. However, in other cases, NRV must be estimated.",
          "• Sales of inventory after the reporting date provide strong evidence about its NRV as at the reporting date.",
          "• When measuring NRV, the standard permits similar items to be grouped together, assuming they are sold in the same market.",
          "• Raw materials are not written down below cost if the finished good they will form a part of will be sold at a profit."
        ]
      },
      {
        "title": "NRV vs. Cost",
        "items": [
          "Value the following items of inventory. (a) Raw materials with a cost of $3,000 was bought to be used in the production of a finished goods for a profitable order by a customer. Since purchase of the raw material, the cost of the material has fallen $ 2,000 (b) A finished good was made for a customer for an agreed price of $15,000 at a cost of 13,000. However, changes in government rules now require the finished good to be changed slightly at a cost of $8,000. The customer has graciously agreed to bear half of that extra cost",
          "Solution",
          "(a) Value at $ 3,000. $ 2,000 is the replacement cost of the raw material. The rule is lower of cost and NRV, not lower of cost or replacement cost. NRV can be expected to be above cost as it is a profitable order (b) Value at NRV of $ 11,000 (15,000 – 4,000). Cost is 15,000"
        ]
      },
      {
        "title": "Method",
        "items": [
          "Specific Identification / Unit Cost | Uses the cost of the actual unit of inventory sold and remaining in the warehouse | Used when inventory is not ordinarily interchangeable or is produced and separated for specific projects.",
          "FIFO – First In, First Out | First item of inventory received is assumed to be the first item sold/used | Used when closing inventory is from the latest purchase; perishable goods.",
          "AVCO – Average Cost / Weighted Average Cost | Cost is calculated by taking an average cost of all inventory held | Used when inventory is identical; can be calculated periodically or continuously.",
          "LIFO – Last In, First Out | Last items received are assumed to be the first sold | LIFO is not allowed under IAS 2."
        ]
      },
      {
        "title": "Inventory Valuation Method/ Cost Formula",
        "items": [
          "• The same method of arriving at cost should be used for all inventories having similar nature and use to the entity.",
          "• For inventories with a different nature or use, different cost methods may be justified"
        ]
      },
      {
        "title": "Disclosure",
        "items": [
          "The main disclosure requirements of IAS 2 are:",
          "• Accounting policy adopted, including the cost formula used",
          "• Total carrying amount, classified appropriately",
          "• Amount of inventories carried at NRV",
          "• Amount of inventories recognized as an expense during the period",
          "• Details of any circumstances that have led to the write-down of inventories to their NRV."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "During 20X1 a company discovered that certain items had been included in inventory at 31 December 20X0 at a value of $2.5 million but they had in fact been sold before the year end.",
          "The original figures reported for the year ending 31 December 20X0 and the figures for the current year 20X1 are given below:",
          "Cost of sales (33,500) (30,200)",
          "The retained earnings at 1 January 20X0 were $11.2 million. The cost of goods sold in 20X1 includes the $2.5 million error in opening inventory."
        ],
        "answer": 0
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Cost of sales (33,500) (30,200)",
          "The retained earnings at 1 January 20X0 were $11.2 million. The cost of goods sold in 20X1 includes the $2.5 million error in opening inventory.",
          "Held for sale in the ordinary course of business – Finished goods",
          "The original figures reported for the year ending 31 December 20X0 and the figures for the current year 20X1 are given below:"
        ],
        "answer": 3
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Held for sale in the ordinary course of business – Finished goods",
          "In the process of production for such sale – Work in Progress",
          "Cost of sales (33,500) (30,200)",
          "The retained earnings at 1 January 20X0 were $11.2 million. The cost of goods sold in 20X1 includes the $2.5 million error in opening inventory."
        ],
        "answer": 2
      }
    ],
    "practice": []
  },
  {
    "slug": "foreign-currency",
    "title": "Foreign Currency",
    "standard": "IAS 21",
    "blocks": [
      {
        "title": "IAS 21 : The Effects of Changes in",
        "items": [
          "Foreign Exchange Rates     Malindu Udawatta"
        ]
      },
      {
        "title": "China",
        "items": [
          "1,000 Kgs of Tuna",
          "40,000 Yuan"
        ]
      },
      {
        "title": "IAS 21 : The Effects of Changes in Foreign Exchange Rates",
        "items": [
          "• IAS 21 addresses two accounting issues arising from foreign exchange rates:",
          "1. Foreign currency business transactions",
          "2. The situation where one company owns a foreign company and has to incorporate its financial statements in the group financial statements"
        ]
      },
      {
        "title": "Functional Currency",
        "items": [
          "• Each entity should determine its functional currency and record its transactions in that functional currency",
          "• The functional currency is the currency of the primary economic environment in which the entity operates",
          "• For most individual entities, the functional currency will be the currency of the country in which they are located and in which they carry out most of their transactions"
        ]
      },
      {
        "title": "Determining the Functional Currency",
        "items": [
          "• IAS 21 states that an entity should consider the following factors in determining its functional currency:",
          "1. The currency that mainly influences sales prices for goods and services (often the currency in which prices are denominated and settled)",
          "2. The currency of the country whose competitive forces and regulations mainly determine the sales prices of its goods and services",
          "3. The currency that mainly influences labour, material and other costs of providing goods or services (often the currency in which prices are denominated and settled)"
        ]
      },
      {
        "title": "Determining the Functional Currency",
        "items": [
          "• Sometimes the functional currency of an entity is not immediately obvious. Management must then exercise judgement and may also need to consider:",
          "1. The currency in which funds from financing activities (raising loans and issuing equity) are generated",
          "2. The currency in which receipts from operating activities are usually retained"
        ]
      },
      {
        "title": "Determining the Functional Currency",
        "items": [
          "• In determining the functional currency of a foreign operation within a group, a number of additional factors are considered:",
          "1. Whether the activities of the foreign operation are carried out as an extension of the parent, rather than being carried out with a significant degree of autonomy",
          "2. Whether transactions with the parent are a high or a low proportion of the foreign operation's activities",
          "3. Whether cash flows from the activities of the foreign operation directly affect the cash flows of the parent and are readily available for remittance to it",
          "4. Whether the activities of the foreign operation are financed from its own cash flows or by borrowing from the parent",
          "A 'foreign operation’ of an entity is a subsidiary, associate, joint arrangement or branch that a company maintains in a foreign country"
        ]
      },
      {
        "title": "Determining the Functional Currency",
        "items": [
          "• To sum up: in order to determine the functional currency of a foreign operation it is necessary to consider the relationship between the foreign operation and its parent:",
          "• If the foreign operation carries out its business as though it were an extension of the parent’s operations, it almost certainly has the same functional currency as the parent",
          "• If the foreign operation is semi-autonomous it almost certainly has a different functional currency from the parent"
        ]
      },
      {
        "title": "Presentation Currency",
        "items": [
          "• The presentation currency is the currency in which the financial statements are presented",
          "• An entity can present its financial statements in any currency it chooses",
          "• For most individual entities, the presentation currency is the same as the functional currency"
        ]
      },
      {
        "title": "Other Definitions",
        "items": [
          "• A foreign currency is a currency other than the functional currency of the entity",
          "• The closing rate is the spot exchange rate at the year-end date",
          "• The spot exchange rate is the exchange rate for immediate delivery/ exchange rate on the day of the transaction",
          "• Monetary items are units of currency held and assets and liabilities to be received or paid in a fixed or determinable number of units of currency",
          "E.g – Trade receivable, Trade Payables, Cash and Fixed deposits",
          "• Non-Monetary Items – assets and liabilities that are not monetary items",
          "E.g. – PPE, Investment property, Prepaid expenses, income received in advance and investments in equity securities"
        ]
      },
      {
        "title": "Accounting for Foreign Currency Transactions",
        "items": [
          "Initial recognition",
          "• IAS 21 states that a foreign currency transaction should be recorded, on initial recognition in the functional currency",
          "• Foreign currency should be converted to functional currency based on the spot exchange rate on the date of the transaction",
          "• An average rate for a period may be used if exchange rates do not fluctuate significantly"
        ]
      },
      {
        "title": "Accounting for Foreign Currency Transactions",
        "items": [
          "Settlement before reporting date Through a foreign currency transaction, if a receivable or payable arises and that amount is settled before the reporting date, the following procedure applies.",
          "1. The amount paid/received is translated using the spot rate at the settlement date and recorded as a cash transaction",
          "2. The receivable/payable is derecognised at the amount at which it was recognised",
          "3. Any difference is recognized as a foreign exchange gain or loss in the P&L",
          "IAS 21 is not definitive in stating where in profit or loss any such gains or losses are classified. It would seem reasonable to regard them as items of operating expense or income. However, other profit or loss headings may also be appropriate."
        ]
      },
      {
        "title": "Example",
        "items": [
          "A Sri Lankan company sells goods to a Chinese company in June 20X4, and agrees to invoice in Chinese yuan. The price is Y116,000 and the exchange rate at the time of sale is Y1 to Rs. 20, but when the debt is eventually paid in July 20X4, the rate has altered to Y1 to Rs. 19.5. The Sri Lankan company has a 31 December year end.",
          "Initial recognition",
          "Dr        Trade receivables (116,000 * 20)       Rs. 2,320,000",
          "Cr        Sales revenue                          Rs. 2,320,000",
          "Settlement",
          "Dr     Cash (116,000 * 19.5)                     Rs. 2,262,000",
          "Dr     Exchange loss                             Rs.    58,000",
          "Cr     Trade receivables                         Rs. 2,320,000"
        ]
      },
      {
        "title": "Accounting for Foreign Currency Transactions",
        "items": [
          "Settlement after reporting date",
          "• Where cash is not paid/received in the same accounting period as the initial foreign currency transaction, there are 'foreign' assets or liabilities in the balance sheet at the end of the year",
          "• The following rules apply to such foreign assets and liabilities: Monetary items Retranslated using the closing rate (e.g. loans, receivables and payables) Not retranslated Non-monetary items carried at",
          "historical cost                               i.e. they remain in the financial statements translated at",
          "(e.g. PPE under cost model and inventories) the rate that applied when they were purchased (historical rate) Non-monetary items which are carried",
          "at fair value                                 Retranslated each time that an up-to-date fair value is",
          "(PPE under revaluation model and              established, using the spot rate on the date of valuation",
          "Investment property under fair value model)"
        ]
      },
      {
        "title": "Example",
        "items": [
          "TG Imports (Pvt) Ltd has bought goods from Australia, priced in Australian dollars, for many years. On 18 November 20X3, the company buys goods for AUD 80,000, receiving three months' credit from the supplier. TG Imports paid the supplier on 12 February 20X4. TG Imports has a 31 December year end, and the goods remained in stock at this date.",
          "Relevant exchange rates are:",
          "• 18 November 20X3 AUD 1:Rs. 116",
          "• 31 December 20X3 AUD 1:Rs. 120",
          "• 12 February 20X4 AUD 1:Rs. 119"
        ]
      },
      {
        "title": "Example",
        "items": [
          "Initial recognition",
          "Dr        Purchases                (80,000 * 116)           Rs. 9,280,000",
          "Cr        Trade payables                                    Rs. 9,280,000",
          "At reporting date – 31st Dec 2003 At the reporting date, there are two 'foreign' items in the statement of financial position:",
          "• The payable - A monetary item, therefore must be retranslated (80,000 * 120) = 9,600,000",
          "• The unsold inventory - A non-monetary item, therefore not retranslated",
          "Dr      Exchange loss      (9,600,00 – 9,280,000)   Rs. 320,000",
          "Cr      Trade payables                              Rs. 320,000"
        ]
      },
      {
        "title": "Example",
        "items": [
          "Therefore in the 20X3 financial statements:",
          "• The balance due to the Australian supplier is Rs. 9,600,000",
          "• Inventory acquired from the Australian supplier is Rs. 9,280,000",
          "• There is an exchange loss in the statement of profit or loss of Rs. 320,000",
          "14th Feb 20X4 At settlement, the cash payment is recorded, payable derecognised and exchange difference recognised by:",
          "Dr      Trade payables                                    Rs. 9,600,000",
          "Cr      Cash                     (80,000 * 119)           Rs. 9,520,000",
          "Cr      Exchange gain                                     Rs. 80,000"
        ]
      },
      {
        "title": "Exchange Difference/ Exchange gain or loss",
        "items": [
          "• As we have seen, exchange differences occur in relation to monetary items and non- monetary items (FV) when there is a change in the exchange rate between:",
          "• The transaction date and the reporting date or",
          "• The transaction date and the settlement date",
          "Where exchange gains/losses Item are recorded",
          "Monetary items                                                                 P&L",
          "Non-monetary items carried fair value with fair value gains and",
          "losses recorded in P&L                                                         P&L",
          "(e.g. Investment property under fair value model) Non-monetary items carried fair value with fair value gains and",
          "losses recorded in OCI                                                         OCI",
          "(e.g. Revaluation gains of PPE under the fair revaluation model)"
        ]
      },
      {
        "title": "Example",
        "items": [
          "An entity, Attendant, has a reporting date of 31 December and has the dollars (USD) as its functional currency. Attendant purchased a plot of land overseas on 1 March 20X0. The entity paid for the land in the currency of the Rials (R). The purchase cost of the land at 1 March 20X0 was R 60,000. The fair value of the land at the reporting date was R 80,000 Exchange rates were as follows:",
          "1 March 20X0 - R8: USD 1 31 December 20X0 - R10: USD 1",
          "Required: Describe how the above transaction should be accounted for in the financial statements of Attendant for the year ended 31 December 20X0 if the land is measured at",
          "• Cost",
          "• Fair value"
        ]
      },
      {
        "title": "Example",
        "items": [
          "On 1st March 2000",
          "Dr      Land                (60,000/8)                7,500",
          "Cr      Cash                                          7,500",
          "On 1st Dec 2000 Cost Land is not retranslated as it’s a non-monetary item, so carried at cost of 7,500 Fair Value – Revaluation model (PPE)",
          "Dr       Land             (80,000/10 – 7,500)         500",
          "Cr       OCI                                          500",
          "Fair Value – Fair value model (Investment property)",
          "Dr       Land              (80,000/10 – 7,500)      500",
          "Cr       P&L                                        500",
          "TUU 2&3 - Homework"
        ]
      },
      {
        "title": "Example",
        "items": [
          "Ribby has a building which it purchased on 1 June 20X7 for 40 million dinars and which is located overseas. The building is carried at cost and has been depreciated on the straight line basis over its life of 20 years. At 31 May 20X8 as a result of an impairment review, the recoverable amount of the building was estimated to be 36 million dinars",
          "Exchange rates were as follows:",
          "1 June 20X7                                       - USD 1: D10",
          "31 May 20X8                                       - USD 1: D12",
          "Average rate for the year to 31 May 20X8          - USD 1: D10.5",
          "Required: Describe how the above should be accounted for in the financial statements of Ribby for the year ended 31 May 20X8"
        ]
      },
      {
        "title": "Example",
        "items": [
          "1st June 2007 (40/10)                           4",
          "Depreciation (4/20)                          (0.2)",
          "31st May 2008                                 3.8",
          "31st May 2008 – Recoverable amount (36/12) 3.0",
          "Impairment loss                               0.8",
          "Dr P&L         USD 0.8 Mn",
          "Cr PPE         USD 0.8 Mn"
        ]
      },
      {
        "title": "Criticisms of IAS 21",
        "items": [
          "Lack of theoretical underpinning",
          "• It is not clear why foreign exchange gains and losses on monetary items are recorded in profit or loss, yet foreign exchange gains and losses arising on consolidation of a foreign operation (see Chapter 20) are reported in other comprehensive income (OCI).",
          "• It is argued that recording foreign exchange gains or losses on monetary items in profit or loss increases the volatility of reported profits. As such, it has been suggested that foreign exchange gains or losses should be recorded in OCI if there is a high chance of reversal.",
          "Long-term items It is argued that retranslating long-term monetary items using the closing rate does not reflect economic substance. This is because a current exchange rate is being used to translate amounts that will be repaid in the future. Foreign exchange gains and losses on long-term items are highly likely to reverse prior to repayment/receipt, suggesting that such gains and losses are unrealised. This provides further weight to the argument that foreign exchange gains and losses on at least some monetary items should be recorded in OCI."
        ]
      },
      {
        "title": "Criticisms of IAS 21",
        "items": [
          "The average rate IAS 21 does not stipulate how to determine the average exchange rate in the reporting period. This increases the potential for entities to manipulate their net assets or total comprehensive income. The use of different average rates will limit comparability between reporting entities.",
          "Monetary/non-monetary The distinction between monetary and non-monetary items can be ambiguous and would benefit from further clarification.",
          "Foreign operations IAS 21 uses a restrictive definition of a ‘foreign operation’ – a subsidiary, associate, joint venture or branch whose activities are based in a country or currency other than that of the reporting entity. It is argued that IAS 21 should instead use a definition of a foreign operation that is based on substance, rather than legal form."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "IAS 21 addresses two accounting issues arising from foreign exchange rates:",
          "Foreign currency business transactions",
          "The situation where one company owns a foreign company and has to incorporate its financial statements in the group financial statements",
          "Historic rate: rate in place at the date the transaction takes place, sometimes referred to as the spot rate."
        ],
        "answer": 0
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "The situation where one company owns a foreign company and has to incorporate its financial statements in the group financial statements",
          "Historic rate: rate in place at the date the transaction takes place, sometimes referred to as the spot rate.",
          "Closing rate: rate at the reporting date.",
          "Foreign currency business transactions"
        ],
        "answer": 3
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Closing rate: rate at the reporting date.",
          "Average rate: average rate throughout the accounting period.",
          "The situation where one company owns a foreign company and has to incorporate its financial statements in the group financial statements",
          "Historic rate: rate in place at the date the transaction takes place, sometimes referred to as the spot rate."
        ],
        "answer": 2
      }
    ],
    "practice": [
      {
        "title": "Practice set",
        "question": "Q1. On 1 April 20X8 Collins Co, a company that uses the dollar ($) as its functional currency, buys goods from an overseas supplier, who uses Kromits (Kr) as its functional currency. The goods are priced at Kr54,000. Payment is made 2 months later on 31 May 20X8. The prevailing exchange rates are: 1 April 20X8 Kr1.80 : $1 31 May 20X8 Kr1.75 : $1 Required: Record the journal entries for these transactions. Q2. On 1 January 20X6 Wilkie Co, a company that uses the dollar ($) as its functional currency, buys goods from an overseas supplier, who uses Dinar (D) as its functional currency. The goods are priced at D35,000. Payment is still outstanding at the reporting date of 31 March 20X6. The prevailing exchange rates are: 1 January 20X6 D1.75 : $1 31 March 20X6 D1.90 : $1 Required: Record the journal entries for these transactions. Q3. ABC Co has a year end of 31 December 20X1 and uses the dollar ($) as its functional currency. On 25 October 20X1 ABC Co buys goods from a Swedish supplier for Swedish Krona (SWK) 286,000. Rates of exchange: 25 October 20X1 $1 = SWK 11.16 16 November 20X1 $1 = SWK 10.87 31 December 20X1 $1 = SWK 11.02 Required: Show the accounting treatment for the above transactions if: (a) A payment of SWK286,000 is made on 16 November 20X1. (b) The amount owed remains outstanding at the year-end date. 1. Prepare the journal entries to record the sale of the goods by the US entity. 2. Show the journal entries to record the payment in April 20X3. 3. If the amount was outstanding at the year-end, what would the gain or loss in the statement of profit or loss be? 4. An entity based in the US purchased goods for Kr200,000 on 28 March 20X3 when the exchange rate was Kr0.65: $1. The exchange rate at the year ended 30 June 20X3 was Kr0.75:$1. If the goods were unsold at the year-end, what should be the value of inventory? $ ____________________",
        "answer": ""
      }
    ]
  },
  {
    "slug": "leases",
    "title": "Leases",
    "standard": "IFRS 16",
    "blocks": [
      {
        "title": "What is a Lease?",
        "items": [
          "• Lease is contract, or part of a contract, that conveys the right to use an asset, the underlying asset, for a period of time in exchange for consideration",
          "Consideration (Lease Payments)",
          "Lessee                                                         Lessor",
          "Right to use the van                     Underlying asset"
        ]
      },
      {
        "title": "Definitions",
        "items": [
          "• Lease. A contract, or part of a contract, that conveys the right to use an asset, the underlying asset, for a period of time in exchange for consideration",
          "• Underlying asset. An asset that is the subject of a lease, for which the right to use that asset has been provided by a lessor to a lessee",
          "• Lessor. The entity that transfers the right to use an underlying asset to the lessee in exchange for consideration (lease payments)",
          "• Lessee. The entity that obtains the right to use an underlying asset in exchange for consideration (lease payments)",
          "• Right-of-Use Asset represents the lessee’s rights to use an underlying asset for the lease term"
        ]
      },
      {
        "title": "Definitions",
        "items": [
          "• Lease term will comprise of the non-cancellable period for which the lessee has contracted to lease the asset together with both",
          "• Periods covered by an option to extend the lease if the lessee is reasonably certain to exercise the option",
          "• Periods covered by an option to terminate the lease if the lessee is reasonably certain not to exercise that option",
          "Period covered by the option to Non-cancellable period – 5 years extend the lease – 2 years",
          "Period covered by the option to Non-cancellable period – 5 years terminate the lease – 3 years"
        ]
      },
      {
        "title": "IFRS 16",
        "items": [
          "• IFRS 16 Leases is a new standard that supersedes IAS 17",
          "• It is effective for periods beginning on or after 1 January 2019",
          "• The previous standard, IAS 17, required lessees to classify their leases as either finance leases or operating leases and account for these two types of lease differently – this is no longer the case under IFRS 16"
        ]
      },
      {
        "title": "Identifying a Lease",
        "items": [
          "• IFRS 16 Leases requires lessees to recognise an asset and a liability for all leases, unless they are short-term or of a minimal value. As such, it is vital to assess whether a contract contains a lease, or whether it is simply a contract for a service.",
          "• A contract contains a lease if it conveys 'the right to control the use of an identified asset for a period of time in exchange for consideration’",
          "• The customer controls the asset’s use if it has:",
          "1. the right to substantially all of the identified asset's economic benefits, and",
          "2. the right to direct the identified asset's use."
        ]
      },
      {
        "title": "Identifying a Lease",
        "items": [
          "• The right to direct the use of the asset can still exist if the lessor puts restrictions on its use within a contract (such as by capping the maximum mileage of a vehicle, or limiting which countries an asset can be used in). These restrictions define the scope of a lessee's right of use, rather than preventing them from directing use.",
          "• IFRS 16 says that a customer does not have the right to use an identified asset if the supplier has the practical ability to substitute the asset for an alternative and if it would be economically beneficial for them to do so. TUU 1 & 2"
        ]
      },
      {
        "title": "Lessee Accounting",
        "items": [
          "• At commencement of the lease, lessee should recognizes:",
          "1. A Right-of-use asset (Asset)",
          "2. A Lease liability (Liability)",
          "• This is an application of substance over form i.e. the accounting treatment reflects commercial/ economic substance rather than legal form"
        ]
      },
      {
        "title": "Lessee Accounting : Lease Liability",
        "items": [
          "• At the commencement date the lease liability is measured at the present value of future lease payments that have not yet been paid, discounted at the interest rate implicit in the lease",
          "• If the implicit rate cannot be readily determined, the lessee's incremental borrowing rate should be used.",
          "• Future lease payments may include:",
          "• Fixed lease payments",
          "• Variable payments that depend on an index or rate, initially valued using the index or rate at the lease commencement date",
          "• The exercise price of a purchase option, if reasonably certain to be exercised",
          "• Penalties to terminate the lease, if the lessee expects to terminate the lease early",
          "• Amounts payable by lessee under residual lease guarantee"
        ]
      },
      {
        "title": "Variable Lease Payments",
        "items": [
          "• The treatment of variable lease payments depends on the type of variable payment. Payments that vary according to an index or rate are included in the lease liability based on the index or rate at the measurement date",
          "Company Y rents an office building. The initial annual rental payment is 2,500,000. Payments are made at the end of each year. The rent will be increased each year by the change in CPI over the preceding 12 months. Lease is for 5 years.",
          "This is an example of a variable lease payment that depends on an index. The initial measurement of the lease liability is based on the value of the CPI on lease commencement - i.e. an annual rental of 2,500,000 for each year of the lease – assume all 5 lease payments are at 2,500,000",
          "If during the first year of the lease the CPI increases from 100 to 105 (i.e. the rate of inflation over the preceding 12 months is 5%), then at the end of the first year the lease liability is recalculated assuming future annual rentals of 2,625,000 (2,500,000 x 1.05 ) – for the next 4 years"
        ]
      },
      {
        "title": "Lessee Accounting",
        "items": [
          "• Residual value guarantee is a guarantee made to a lessor by the lessee that the value of an underlying asset at the end of the lease will be at least a specified amount Lessee X has entered into a lease contract with Lessor Y to lease a delivery van. The lease term is six years. In addition, X and Y agree on a residual value guarantee - if the fair value of the delivery van at the end of the lease term is below 800, then X will pay to Y an amount equal to the difference between 800 and the fair value of the car At the start of the lease, if X expects the fair value of the car at the end of the lease term to be 780, then X includes 20 as a lease payment in the sixth year in respect of the residual value guarantee when calculating the lease liability"
        ]
      },
      {
        "title": "Lessee Accounting : Right-of-Use Asset",
        "items": [
          "• At the commencement date the right-of-use asset is measured at cost. This comprises:",
          "• The amount of the initial measurement of the lease liability",
          "• Any lease payments made before/ at the commencement date",
          "• Any initial direct costs incurred by the lessee (ie incremental costs of obtaining a lease that would not otherwise have been incurred, such as arrangement fees/ legal fees)",
          "• Any costs which the lessee will incur for dismantling and removing the underlying asset or restoring the site at the end of the lease term (measured in accordance with IAS 37)",
          "Any lease incentives received (e.g. reimbursed costs, assumption of costs by lessor or cash payments to the lessee) should be deducted"
        ]
      },
      {
        "title": "Lessee Accounting : Subsequent Measurement",
        "items": [
          "Lease Liability",
          "• To calculate the interest expense and year end liability, a lease liability table is often used. The format of the table will change depending on whether lease payments are made at",
          "● End of the year (in arrears)          ● Start of the year (in advance)"
        ]
      },
      {
        "title": "Lessee Accounting : Subsequent Measurement",
        "items": [
          "• Lease payments are made at the end of the year (in arrears)",
          "Lease                Interest Expense                                      Lease Liability",
          "Year         Liability     (based on the Implicit interest rate/      Lease Payment          Balance",
          "Balance b/f       incremental borrowing rate)                                      c/f",
          "A                        B=A*%                            C              D = A + B + (C)",
          "1           XXX                           XXX                         (XXX)                XXX",
          "2           XXX                           XXX                         (XXX)                XXX    NCL",
          "End of the year lease liability should be shown under:",
          "✓ Non-Current Liabilities - marked",
          "NCL in the table on the left              Taken to P&L as       Taken to Cash      Year end lease",
          "lease Interest      flow statement    liability. Taken to",
          "✓ Current Liabilities - Difference",
          "expense             as a cash     Balance Sheet split",
          "between NCL portion and the",
          "outflow        into CL and NCL",
          "Balance c/f"
        ]
      },
      {
        "title": "Lessee Accounting : Subsequent Measurement",
        "items": [
          "•       Lease payments are made at the beginning of the year (in advance)",
          "Interest Expense",
          "Lease                                                                       Lease Liability",
          "(based on the Implicit",
          "Year        Liability       Lease Payment         Subtotal                                   Balance",
          "interest rate/ incremental",
          "Balance b/f                                                                         c/f",
          "borrowing rate)",
          "A                  B             C = A + (B)           D=C*%                 E=C+D",
          "1          XXX                 0                XXX                   XXX                   XXX",
          "2          XXX               (XXX)              XXX NCL               XXX                   XXX",
          "End of the year lease liability should be shown under:",
          "✓ Non-Current Liabilities - marked",
          "Taken to P&L as        Year end lease",
          "NCL in the table on the left                 Taken to Cash        lease Interest      liability. Taken to",
          "✓ Current Liabilities - Difference            flow statement           expense         Balance Sheet split",
          "between NCL portion and the                    as a cash                               into CL and NCL",
          "Balance c/f                                     outflow"
        ]
      },
      {
        "title": "Lessee Accounting : Subsequent Measurement",
        "items": [
          "• Finance lease interest is charged to the P&L Dr Finance Cost (P& L) Cr Lease Liability (Balance Sheet)",
          "• Cash payments are recorded as follows: Dr Lease Liability Cr Cash"
        ]
      },
      {
        "title": "Lessee Accounting : Subsequent Measurement",
        "items": [
          "Right-of-Use Asset",
          "• After the commencement date the right-of-use asset should be measured using the cost model in IAS 16",
          "• Depreciation should be calculated as follows:",
          "• If the ownership of the underlying asset transfers to the lessee at the end of the lease or there is a purchase option likely to be used - Depreciate over the underlying asset’s useful life",
          "• If the ownership of the underlying asset doesn’t transfer to the lessee at the end of the lease - Depreciate over the shorter of the",
          "• Useful life of the underlying asset",
          "• Lease term"
        ]
      },
      {
        "title": "Lessee Accounting : Subsequent Measurement",
        "items": [
          "Right-of-Use Asset",
          "• If the lessee measures investment properties at fair value then IFRS 16 requires that right- of-use assets that meet the definition of investment property should also be measured using the fair value model (e.g. right-of-use assets that are sub-leased under operating leases in order to earn rental income).",
          "• Note that the relevant fair value is that of the right-of-use asset, not the underlying property",
          "• If the right-of-use asset belongs to a class of property, plant and equipment that is measured using the revaluation model, an entity may apply the IAS 16 Property, Plant and Equipment revaluation model to all right-of-use assets within that class."
        ]
      },
      {
        "title": "Separating Components",
        "items": [
          "• A contract may contain a lease component and a non-lease component.",
          "• Unless an entity chooses otherwise, the consideration in the contract should be allocated to each component based on the stand-alone selling price of each component.",
          "• Entities can, if they prefer, choose to account for the lease and non-lease component as a single lease. This decision must be made for each class of right-of-use asset. However this choice would increase the lease liability recorded at the inception of the lease, which may negatively impact perception of the entity's financial position.",
          "Illustration 1"
        ]
      },
      {
        "title": "Reassessing the Lease Liability",
        "items": [
          "• If any of the components of the calculation of lease liability change during the lease term, the lease liability is remeasured. This occurs, for example, if:",
          "a) The lease term is revised",
          "b) There is a reassessment of the probability of a purchase option being exercised",
          "c) Variable lease payments (future lease payments based on an index or rate) are revised",
          "d) There is a change in the amount expected to be paid under residual value guarantees",
          "• When remeasuring the lease liability:",
          "1. A revised discount rate (the interest rate implicit in the lease for the remainder of the term or the lessee's incremental borrowing rate at the date of remeasurement) is applied to future lease payments in the case of (a) and (b)",
          "2. The original discount rate is applied to future lease payments in the case of (c) and (d)",
          "3. A corresponding adjustment is made to the right-of-use asset."
        ]
      },
      {
        "title": "Lessee Accounting : Presentation",
        "items": [
          "• In the statement of financial position right-of-use assets can be presented on a separate line under non-current assets or they can be included in the total of corresponding underlying assets and disclosed in the notes",
          "• Lease liabilities should be either presented separately from other liabilities or disclosed in the notes",
          "• IFRS 16 does not specify that lease liabilities should be split between non-current and current liabilities, but this is required by IAS 1"
        ]
      },
      {
        "title": "Lessee Accounting : Simplified Accounting",
        "items": [
          "• Instead of applying the IFRS 16 lessee accounting model described above, a lessee may elect to apply simplified accounting to the following two types of lease:",
          "• Under simplified accounting no lease liability or right-of-use asset are recognized in the statement of financial position",
          "• Total lease payments are charged to the P&L on a straight-line basis, regardless of when they are paid",
          "1 Short-term leases",
          "• Leases with a term of 12 months or less",
          "• A lease that contains a purchase option cannot be a short-term lease"
        ]
      },
      {
        "title": "Lessee Accounting : Simplified Accounting",
        "items": [
          "2 Leases of low-value assets",
          "• These are leases for underlying assets with low values when new (such as tablet and personal computers or small items of office furniture and telephones)",
          "• Low value is not defined in the standard, however the Basis for Conclusions refers to individual assets with a value (when new) of US $5,000 or less",
          "• Following are examples of low value assets:",
          "• tablets",
          "• small personal computers",
          "• telephones",
          "• small items of furniture."
        ]
      },
      {
        "title": "Simplified Accounting: Question",
        "items": [
          "On 1st August 2018 XYZ Ltd entered into a lease contract to obtain the use of 7 laptops for 4 years. The tablets would have cost $ 7,950 to buy for cash. The terms of the lease agreement require an initial non-refundable deposit of $ 320 and then quarterly rentals of $ 280 paid in arrears",
          "Required Record the expense recognised in XYZ Ltd's financial statements in the year ended 31 December 2018 assuming that it elects to apply the recognition exemption."
        ]
      },
      {
        "title": "Question: Answer",
        "items": [
          "• The total lease payments over the term of the lease amount to $ 4,800 ((4 years * 4 quarters * $ 280) + $ 320)",
          "• Spread over the lease term, this gives an annual charge to profit or loss of $ 1,200 (4,800/4 years)",
          "• The expense in the year ended 31 December 2018 is therefore $ 500 ($ 1,200 * 5/12 months)",
          "• This is recorded by ($):",
          "Dr Rental expense                            500",
          "Dr Prepayment                                100",
          "Cr Cash (deposit and one instalment)         600"
        ]
      },
      {
        "title": "Lessee Disclosures",
        "items": [
          "• If right-of-use assets are not presented separately on the face of the statement of financial position then they should be included within the line item that would have been used if the assets were owned. The entity must disclose which line item includes right-of-use assets.",
          "• IFRS 16 requires lessees to disclose the following amounts:",
          "1. The depreciation charged on right-of-use assets",
          "2. Interest expenses on lease liabilities",
          "3. The expense relating to short-term leases and leases of low value assets",
          "4. Cash outflows for leased assets",
          "5. Right-of-use asset additions",
          "6. The carrying amount of right-of-use assets",
          "7. A maturity analysis of lease liabilities."
        ]
      },
      {
        "title": "Lessor Accounting",
        "items": [
          "• Lessor needs to classify each lease as either an operating lease or a finance lease in deciding how to account for it",
          "Lessor Accounting",
          "Operating lease. A lease that               Finance lease. A lease that",
          "does not transfer substantially           transfers substantially all the risks",
          "all the risks and rewards                 and rewards incidental to",
          "incidental to ownership of an            ownership of an underlying asset",
          "underlying asset"
        ]
      },
      {
        "title": "Lessor Accounting",
        "items": [
          "• The definitions of an operating and a finance lease both refer to the transfer of risks and rewards",
          "• When we talk of risks here, we specifically mean the risks of ownership, not other types of risk. Risks of ownership include the:",
          "• Possibility of losses from idle capacity",
          "• Technological obsolescence",
          "• Variations in return due to changing economic conditions",
          "• The rewards are represented by the expectation of profitable operation over the asset's economic life, and also any gain from appreciation in value or realisation of a residual value"
        ]
      },
      {
        "title": "Lessor Accounting",
        "items": [
          "• An assessment of whether risks and rewards have transferred may not be easy, and for this reason, IFRS 16 provides examples of situations that normally result in a lease being classified as a finance lease. These are:",
          "1. The lease transfers ownership of the asset to the lessee by the end of the lease term",
          "2. The lessee has the option to purchase the asset at a price that makes the option reasonably certain to be exercised",
          "3. The lease term is for the major part (75% or more) of the remaining economic life of the asset",
          "4. At the inception of the lease, the present value of the minimum lease payments (discounted at the interest rate implicit in the lease) amounts to at least substantially all (90% or more) of the fair value of the leased asset",
          "5. The leased asset is of such a specialised nature that only the lessee could use it without major modifications"
        ]
      },
      {
        "title": "Lessor Accounting",
        "items": [
          "• Additional factors indicating a lease is a finance lease:",
          "1. If the lessee can cancel the lease, the lessor's losses associated with the cancellation are borne by the lessee",
          "2. Gains or losses from the fluctuation in the fair value of the residual value accrue to the lessee",
          "3. The lessee has the ability to continue the lease for a secondary period at a rent that is substantially lower than market rent"
        ]
      },
      {
        "title": "Lessor Accounting : Definitions",
        "items": [
          "• Guaranteed residual value is included in lease payments differently by:",
          "• Lessee - that part of the residual value guarantee expected to be payable by the lessee",
          "• For a lessor - that part of the residual value which is guaranteed by:",
          "• the lessee",
          "• a party related to the lessee",
          "• a third party unrelated to the lessor who is financially capable of discharging the obligations under the guarantee",
          "• Unguaranteed residual value is that portion of the residual value of the underlying asset, the realisation of which by the lessor is not assured or is guaranteed solely by a party related to the lessor"
        ]
      },
      {
        "title": "Lessor Accounting : Definitions",
        "items": [
          "The lease payments            Any unguaranteed",
          "Gross investment =           receivable by the lessor   +       residual value",
          "under a finance lease         accruing to the lessor",
          "• Fixed payments",
          "• Variable payments that depend on an index or rate, valued using the index or rate at the lease commencement date",
          "• Residual value guarantees",
          "• Purchase options that are reasonably certain to be exercised",
          "• Termination penalties, if the lease term reflects the expectation that these will be incurred."
        ]
      },
      {
        "title": "Lessor Accounting : Definitions",
        "items": [
          "• Net investment in the lease is the gross investment in the lease discounted at the interest rate implicit in the lease",
          "• Interest rate implicit in the lease is the rate of interest that causes the:",
          "PV of the future lease       PV of unguaranteed         Fair value of the",
          "payments and          +      residual value    =     underlying asset    + Initial direct costs",
          "of the lessor",
          "• Unearned finance income = Gross investment in the lease - Net investment in the lease"
        ]
      },
      {
        "title": "Lessor Accounting : Finance Lease",
        "items": [
          "• Lessor has to derecognize the underlying asset that is leased out under a finance lease",
          "• Instead, lessor should recognize a receivable at an amount equal to the Net investment in the lease",
          "• Over the lease term, the receivable will:",
          "• Increase as interest accrues to it",
          "• Decrease as payments are received",
          "• Interest income is recognized, calculated based on the lease table.",
          "• Net investment in lease asset is shown as current and non-current assets"
        ]
      },
      {
        "title": "Lessor Accounting : Operating Leases",
        "items": [
          "• No net investment in the lease is recognized. Underlying asset is not derecognized",
          "• An asset held to be leased out under an operating lease should be recognised as a long- term asset by a lessor and depreciated over its useful life. The basis for depreciation should be consistent with the lessor's policy on similar non-leased assets and follow the guidance in IAS 16",
          "• Income from an operating lease, excluding charges for services such as insurance and maintenance, should be recognised on a straight-line basis over the period of the lease (even if the receipts are not on such a basis)",
          "• Initial direct costs incurred by lessors in negotiating and arranging an operating lease should be added to the carrying amount of the leased asset and recognized as an expense over the lease term on the same basis as lease income, i.e. capitalized and amortised over the lease term"
        ]
      },
      {
        "title": "Lessor Disclosures",
        "items": [
          "• The underlying asset should be presented in the statement of financial position according to its nature.",
          "• For finance leases, IFRS 16 requires lessors to disclose:",
          "• Profit or loss arising on the sale",
          "• Finance income",
          "• Data about changes in the carrying amount of the net investment in finance leases",
          "• A maturity analysis of lease payments receivable.",
          "• For operating leases, lessors should disclose a maturity analysis of undiscounted lease payments receivable."
        ]
      },
      {
        "title": "Sale and Leaseback Transaction",
        "items": [
          "• In a sale and leaseback transaction, an asset is transferred by a seller and then the same asset is leased back by the same seller",
          "• Sale and leaseback transactions are a common way for companies to raise cash whilst retaining use of their assets. The lease payment and sale price are normally interdependent because they are negotiated as part of the same package",
          "• IFRS 16 requires an initial assessment to be made regarding whether or not the transfer constitutes an actual sale.",
          "• A transfer constitutes a sale when the IFRS 15 Revenue from Contracts with Customers criteria for satisfying a performance obligation are met"
        ]
      },
      {
        "title": "Sale and Leaseback Transaction",
        "items": [
          "Transfer",
          "Lessor = Buyer Lessee = Seller Leases it back"
        ]
      },
      {
        "title": "Sale and Leaseback Transaction",
        "items": [
          "Transfer is a sale – Lessee Accounting",
          "• If the transfer satisfies the IFRS 15 requirement to be accounted for as a sale:",
          "• The seller/lessee:",
          "1. Records the cash received from the sale",
          "2. Derecognize the carrying amount of the asset",
          "3. Calculate the PV of the lease payments and recognize a lease liability",
          "4. Calculate the right of use asset as follows:",
          "𝐿𝑒𝑎𝑠𝑒 𝐿𝑖𝑎𝑏𝑖𝑙𝑖𝑡𝑦",
          "𝑅𝑖𝑔ℎ𝑡 𝑜𝑓 𝑈𝑠𝑒 𝐴𝑠𝑠𝑒𝑡 =                                       ∗ 𝐶𝑎𝑟𝑟𝑦𝑖𝑛𝑔 𝐴𝑚𝑜𝑢𝑛𝑡 𝑜𝑓 𝑡ℎ𝑒 𝑈𝑛𝑑𝑒𝑟𝑙𝑦𝑖𝑛𝑔 𝐴𝑠𝑠𝑒𝑡",
          "𝐹𝑎𝑖𝑟 𝑉𝑎𝑙𝑢𝑒 𝑜𝑓 𝑡ℎ𝑒 𝑈𝑛𝑑𝑒𝑟𝑙𝑦𝑖𝑛𝑔 𝐴𝑠𝑠𝑒𝑡",
          "Most of the time fair value of the underlying asset = sales proceeds",
          "5. Balancing entry is the gain or loss on sale"
        ]
      },
      {
        "title": "Sale and Leaseback Transaction",
        "items": [
          "Transfer is a sale – Lessor Accounting",
          "• The buyer-lessor accounts for the asset purchased (under the sale) using the most applicable accounting standard (such as IAS 16 Property, Plant and Equipment).",
          "• The lease is accounted for by applying lessor accounting requirements."
        ]
      },
      {
        "title": "Sale and Leaseback Transaction",
        "items": [
          "Transfer is not a sale",
          "• If the transfer does not satisfy the IFRS 15 requirements to be accounted for as a sale, the seller/lessee continues to recognise the transferred asset and the transfer proceeds are treated as a financial liability, accounted for in accordance with IFRS 9 Dr Cash Cr Loan",
          "• The transaction is more in the nature of a secured loan",
          "• The buyer-lessor will not recognise the transferred asset and will recognise a financial asset equal to the transfer proceeds."
        ]
      },
      {
        "title": "Sale and Leaseback Transaction",
        "items": [
          "Transactions not at fair value and it’s a sale If:",
          "• Fair value of the consideration ≠ Fair value of the asset",
          "• Lease payments are not at market rates",
          "• The following adjustments should be made:",
          "✓ Consideration for the sale < FV of the asset = Prepayment of the lease liability",
          "✓ Consideration for the sale > FV of the asset = Additional finance",
          "Illustration 2"
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "IFRS 16 Leases is a new standard that supersedes IAS 17",
          "It is effective for periods beginning on or after 1 January 2019",
          "The previous standard, IAS 17, required lessees to classify their leases as either finance leases or operating leases and account for these two types of lease differently – this is no longer the case under IFRS 16",
          "Lease is contract, or part of a contract, that conveys the right to use an asset, the underlying asset, for a period of time in exchange for consideration."
        ],
        "answer": 0
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "The previous standard, IAS 17, required lessees to classify their leases as either finance leases or operating leases and account for these two types of lease differently – this is no longer the case under IFRS 16",
          "Lease is contract, or part of a contract, that conveys the right to use an asset, the underlying asset, for a period of time in exchange for consideration.",
          "Lease: A contract, or part of a contract, that conveys the right to use an asset, the underlying asset, for a period of time in exchange for consideration",
          "It is effective for periods beginning on or after 1 January 2019"
        ],
        "answer": 3
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Lease: A contract, or part of a contract, that conveys the right to use an asset, the underlying asset, for a period of time in exchange for consideration",
          "Underlying asset: An asset that is the subject of a lease, for which the right to use that asset has been provided by a lessor to a lessee",
          "The previous standard, IAS 17, required lessees to classify their leases as either finance leases or operating leases and account for these two types of lease differently – this is no longer the case under IFRS 16",
          "Lease is contract, or part of a contract, that conveys the right to use an asset, the underlying asset, for a period of time in exchange for consideration."
        ],
        "answer": 2
      }
    ],
    "practice": [
      {
        "title": "Practice set",
        "question": "Leases | OTQ 1. During the year ended 30 September 20X9 Hyper entered into two lease transactions. On 1 October 20X8, Hyper made a payment of $90,000 being the first of five equal annual payments under a lease for an item of plant. The lease has an implicit interest rate of 10% and the present value of the total lease payments on 1 October 20X8 was $340,000. On 1 January 20X9, Hyper made a payment of $18,000 for a one‐year lease of an item of equipment. What amount in total would be charged to Hyper’s statement of profit or loss for the year ended 30 September 20X9 in respect of the above transactions? A. $108,000 B. $111,000 C. $106,500 D. $115,500 2. Z entered into a five year lease agreement on 1 November 20X2, paying $10,975 per annum, commencing on 31 October 20X3. The present value of the lease payments was $45,000 and the interest rate implicit in the lease was 7%. What is the amount to be shown within non‐current liabilities at 31 October 20X3? A. $26,200 B. $28,802 C. $37,175 D. $36,407 3. IFRS 16 Leases permits certain assets to be exempt from the recognition treatment for right‐ of‐use assets. Which of the following assets leased to an entity would be permitted to be exempt? A. A used motor vehicle with an original cost of $15,000 and a current fair value of $700, leased for 24 months B. A new motor vehicle with a cost of $15,000, leased for 24 months C. A new motor vehicle with a cost of $15,000, leased for 24 months, to be rented to customers on a daily rental basis D. A new motor vehicle with a cost of $15,000, leased for 12 months 4. On 1 January 20X3 Rabbit acquires a new machine with an estimated useful life of 6 years under the following agreement: An initial payment of $13,760 will be payable immediately 5 further annual payments of $20,000 will be due, commencing 1 January 20X3 The interest rate implicit in the lease is 8% The present value of the lease payments, excluding the initial payment, is $86,240 What will be recorded in Rabbit’s financial statements at 31 December 20X4 in respect of the lease liability? Finance cost Non‐current liability Current liability A. 4,123 35,662 20,000 B. 5,299 51,539 20,000 C. 5,312 51,712 20,000 D. 5,851 43,709 15,281 Leases | OTQ 5. On 1 April 20X7 Pigeon entered into a five‐year lease agreement for a machine with an estimated life of 7 years. Which of the following conditions would require the machine to be depreciated over 7 years? A. Pigeon has the option to extend the lease for two years at a market‐rate rental B. Pigeon has the option to purchase the asset at market value at the end of the lease C. Ownership of the asset passes to Pigeon at the end of the lease period D. Pigeon’s policy for purchased assets is to depreciate over 7 years 6. On 1 January 20X4 Badger entered into a lease agreement to lease an item of machinery for 4 years with rentals of $210,000 payable annually in arrears. The asset has a useful life of 5 years and at the end of the lease term legal ownership will pass to Badger. The present value of the lease payments at the inception of the lease was $635,000 and the interest rate implicit in the lease is 12.2%. For the year ended 31 December 20X4 Badger accounted for this lease by recording the payment of $210,000 as an operating expense. This treatment was discovered during 20X5, after the financial statements for 20X4 had been finalised. In the statement of changes in equity for the year ended 31 December 20X5 what adjustment will be necessary to retained earnings brought forward? A. $5,530 credit B. $132,530 credit C. $210,000 debit D. D $Nil 7. Owl leases an asset with an estimated useful life of 6 years for an initial period of 5 years, and an optional secondary period of 2 years during which a nominal rental will be payable. The present value of the initial period lease payments is $87,000. What will be the carrying amount of the right‐of‐use asset in Owl's statement of financial position at the end of the second year of the lease? $_________________ 8. On 1 January 20X6, Sideshow sold a property for its fair value of $2 million, transferring title to the property on that date. Sideshow then leased it back under a 5‐year lease, paying $150,000 per annum on 31 December each year. The present value of rentals payable was $599,000 and the interest rate implicit in the lease was 8%. The carrying amount of the property on 1 January 20X6 was $1.6 million and it had a remaining useful life of 20 years. What entries would be made in Sideshow’s statement of profit or loss for the year ended 31 December 20X6? A. Profit on disposal of $280,200, depreciation of $95,840, finance cost of $47,920 B. Profit on disposal of $400,000, rental expense of $150,000 C. Profit on disposal of $400,000, depreciation expense of $95,840, finance cost of $47,920 D. Profit on disposal of $280,200, depreciation of $119,800, finance cost of $47,920 Leases | OTQ 9. On 1 October 20X3, Fresco acquired an item of plant under a five‐year lease agreement. The agreement had an implicit interest rate of 10% and required annual rentals of $6 million to be paid on 30 September each year for five years. The present value of the annual rental payments was $23 million. What would be the current lease liability in Fresco’s statement of financial position as at 30 September 20X4? A. $19,300,000 B. $4,070,000 C. $5,000,000 D. $3,850,000 10. Which of the following would not be included within the initial cost of a right‐of‐use asset? A. Installation cost of the asset B. Estimated cost of dismantling the asset at the end of the lease period C. Payments made to the lessor before commencement of the lease D. Total lease rentals payable under the lease agreement 11. On 1 January 20X4, Stark entered into a sale and leaseback of its property. When it was sold, the asset had a carrying amount of $6 million and a remaining life of 10 years. Stark sold the asset for $7 million and leased it back on a 10 year lease, paying $1 million on 31 December each year. The lease carried an implicit interest rate of 7%. What is the total expense that should be recorded in the statement of profit or loss for the year ended 31 December 20X4? $________________ ,000",
        "answer": "Leases | OTQ ANS 1 C Depreciation of leased plant $68,000 ($340,000/5 years) Finance cost $25,000 (($340,000 – $90,000) × 10%) Rental of equipment $13,500 ($18,000 × 9/12) Total $106,500. 2 B B/f Interest 7% Payment c/f Year end $ $ $ $ 31 October 20X3 45,000 3,150 (10,975) 37,175 31 October 20X4 37,175 2,602 (10,975) 28,802 The figure to the right of the payment in the next year is the non‐current liability. Once 20X4’s payment has been made, $28,802 will still be owed, making this the non‐current liability. The current liability will be the difference between the total liability of $37,175 and the noncurrent liability of $28,802, which is $8,373. If you selected C, you chose the total year‐end liability rather than the non‐current liability. If you selected A, you deducted the payment of $10,975 from the total. If you selected D you recorded the payment in advance and chose the year end liability rather than the non‐current liability. 3 D Assets permitted to be exempted from recognition are low‐value assets and those with a lease term of 12 months or less. The use of the asset is irrelevant, and, although IFRS 16 Leases does not define low‐value, it is the cost when new that is considered rather than current fair value. 4 A Initial value of lease liability is the present value of lease payments, $86,240. The non‐current liability at 20X4 is the figure to the right of the payment in 20X5, $35,662. The current liability is the total liability of $55,662 less the non‐current liability of $35,662, which is $20,000. The finance cost is the figure in the interest column for 20X4, $4,123. If you chose B you have done the entries for year one. If you chose C or D, you have recorded the payments in arrears, not in advance. 5 C The transfer of ownership at the end of the lease indicates that Pigeon will have use of the asset for its entire life, and therefore 7 years is the appropriate depreciation period. Potential transactions at market rate would be ignored as they do not confer any benefit on Pigeon, and Pigeon’s depreciation policy for purchased assets is irrelevant. Leases | OTQ ANS 6 A Reverse incorrect treatment of rental: Dr Liability $210,000, Cr Retained Earnings $210,000 Charge asset depreciation ($635,000/5): Dr Retained earnings $127,000, Cr Property, plant and equipment $127,000 Charge finance cost ($635,000 × 12.2%): Dr Retained Earnings $77,470, Cr Liability $77,470 This gives a net adjustment of $5,530 to be credited to opening retained earnings. If you selected B, you have missed the depreciation. If you selected C you have simply reversed the rental payment. If you selected D you assumed that the entries were correct. 7 $58,000 The asset would initially be capitalised at $87,000. This is then depreciated over six years, being the shorter of the useful life and the lease term (including any secondary period). This would give a depreciation expense of $14,500 a year. After two years, accumulated depreciation would be $29,000 and therefore the carrying amount would be $58,000. 8 A Sideshow is only leasing the asset for 5 years out of its remaining life of 20 years, so control of the asset has been passed to the purchaser. The initial liability recognised will be the present value of lease rentals, $599,000, giving a finance cost for the year of $47,920 ($599,000 × 8%). The proportion of the right‐of‐use asset retained by Sideshow will be equal to the initial liability as a proportion of the proceeds. So the initial value of the right‐of‐use asset will be (599,000/2,000,000) × 1,600,000 = $479,200 Depreciation over 5 years would give an expense of $95,840. The profit to be recognised on disposal can be calculated in one of two ways. Create the initial recognition journal and calculate a balancing figure: Dr Cr $ $ Bank 2,000,000 Property, plant & equipment 479,200 Property plant & equipment 1,600,000 Lease liability 599,000 Profit on disposal (SPL) – balancing figure 280,200 Alternatively the profit to be recognised could be calculated by taking the proportion of the asset not retained by Sideshow (i.e. difference between sale proceeds and lease liability): ($2,000,000 – $599,000) × ($2,000,000 – $1,600,000) = $280,200 $2,000,000 If you chose B you have not capitalised the leased asset. If you chose C you recognised the full profit. If you chose D you capitalised the asset at the present value of the lease payments. Leases | OTQ ANS 9 B Interest b/f @ 10% Payment c/f Year end $000 $000 $000 $000 30 September 20X4 23,000 2,300 (6,000) 19,300 30 September 20X5 19,300 1,930 (6,000) 15,230 Current liability at 30 September 20X4 = 19,300,000 – 15,230,000 = $4,070,000 10 D The value recognised in respect of the lease payments will be the present value of future lease payments rather than the total value. 11 $1,090 As Stark has retained control of the asset, the asset cannot be treated as sold, and will be retained at its carrying amount, depreciated over the remaining life of 10 years. The sale proceeds will effectively be treated as a loan of $7 million, on which interest will be charged at 7%. Therefore the following items will be included in the statement of profit or loss, all figures in $000: Depreciation: $6,000/10 years = $600 Finance cost: $7,000 × 7% = $490 Total expense = $600 + $490 = $1,090"
      }
    ]
  },
  {
    "slug": "financial-instruments",
    "title": "Financial Assets & Financial Liabilities",
    "standard": "IFRS 9",
    "blocks": [
      {
        "title": "Accounting Standards",
        "items": [
          "Accounting standards relevant to financial instruments",
          "IAS 32 Financial Instruments: Presentation",
          "IFRS 7 Financial Instruments: Disclosures",
          "IFRS 9 Financial Instruments",
          "IAS 32 - classification of financial instruments and their presentation in financial statements",
          "IFRS 9 - how financial instruments are measured and when they should be recognised in financial statements.",
          "IFRS 7 - disclosure of financial instruments in financial statements"
        ]
      },
      {
        "title": "Financial Instruments",
        "items": [
          "A financial instrument is any contract that gives rise to a financial asset of one entity and a financial liability or equity instrument of another entity."
        ]
      },
      {
        "title": "Financial Assets",
        "items": [
          "A financial asset is any asset that is:",
          "Cash",
          "Eg. Cash-in-hand, Balances in current accounts",
          "A contractual right to receive cash or another financial asset from another entity",
          "Eg. Trade receivables, Purchased bonds, Loans given",
          "An equity instrument of another entity",
          "Eg. Invest in shares of another company",
          "A contractual right to exchange financial assets/ liabilities with another entity under conditions that are potentially favorable",
          "Eg. Purchased call and put options"
        ]
      },
      {
        "title": "Financial Liabilities",
        "items": [
          "A financial liability is any liability that is a contractual obligation:",
          "To deliver cash or another financial asset to another entity",
          "Eg. Trade payables, Loans taken, Issued bonds, redeemable preference shares",
          "To exchange financial instruments with another entity under conditions that are potentially unfavorable",
          "Eg. Written/sold call and put options",
          "That will or may be settled in a variable number of entity’s own equity instruments",
          "Eg. A bond issued settled in own shares"
        ]
      },
      {
        "title": "Equity Instruments",
        "items": [
          "An equity instrument is 'any contract that evidences a residual interest in the assets of an entity after deducting all of its liabilities’",
          "Eg. an entity’ own ordinary shares",
          "Issued equity instruments are not re-measured after initial recognition",
          "Issue of shares for cash",
          "Dr Cash",
          "Cr Share capital",
          "Cr Share premium"
        ]
      },
      {
        "title": "Financial Instruments",
        "items": [
          "Example",
          "Identify which of the following are financial instruments:",
          "(a) inventories",
          "(b) investment in ordinary shares",
          "(c) prepayments for goods or services",
          "(d) liability for income taxes",
          "(e) a share option (an entity’s obligation to issue its own shares)."
        ]
      },
      {
        "title": "Financial Instruments",
        "items": [
          "Solution",
          "Inventory (or any other physical asset such as non-current assets) is not a financial instrument since there is no present contractual right to receive cash or other financial instruments.",
          "An investment in ordinary shares is a financial asset since it is an equity instrument of another entity.",
          "Prepayments for goods or services are not financial instruments since the future economic benefit will be the receipt of goods or services rather than a financial asset.",
          "A liability for income taxes is not a financial instrument since the obligation is statutory rather than contractual.",
          "A share option is a financial instrument since a contractual obligation exists to deliver an equity instrument."
        ]
      },
      {
        "title": "Financial Assets: Initial Recognition",
        "items": [
          "Recognize a financial asset when the entity becomes party to the contractual provisions of the financial instrument",
          "Examples of this principle are as follows:",
          "A trading commitment to buy or sell goods is not recognised until one party has fulfilled its part of the contract. For example, a sales order will not be recognised as revenue and a receivable until the goods have been delivered.",
          "Forward contracts are accounted for as derivative financial assets and are recognised on the commitment date, not on the date when the item under contract is transferred from seller to buyer.",
          "Option contracts are accounted for as derivative financial assets and are recognised on the date the contract is entered into, not on the date when the item subject to the option is acquired."
        ]
      },
      {
        "title": "Financial Assets: Initial MEASUREMENT",
        "items": [
          "All financial assets are initially measured at fair value",
          "Fair value is likely to be the purchase consideration paid to acquire the financial asset",
          "Directly attributable transaction costs are added to fair value except for in FVTPL Assets",
          "Directly attributable transaction costs of financial assets FVTPL are charged to the P&L"
        ]
      },
      {
        "title": "Financial Assets: Subsequent Measurement",
        "items": [
          "Financial Assets",
          "Equity Instruments",
          "Debt Instruments",
          "Based on what the financial assets is to other party",
          "Fair value through Profit or Loss (FVTPL)",
          "Fair value through Other Comprehensive Income (FVOCI)",
          "(Eg. Investment in ordinary shares of another company)",
          "Fair value through Profit or Loss (FVTPL)",
          "Fair value through Other Comprehensive Income (FVOCI)",
          "Amortized Cost",
          "(Eg. Trade receivables, Purchased bonds, Loans given)"
        ]
      },
      {
        "title": "Financial Assets that are Equity Instruments",
        "items": [
          "These are investments made in equity instruments (shares) of another company. Not shares of your own company",
          "Investments in equity instruments are measured at either:",
          "1 Fair value through Profit or Loss (FVTPL)",
          "2 Fair value through Other Comprehensive Income (FVOCI)"
        ]
      },
      {
        "title": "Financial Assets that are Equity Instruments: FVTPL",
        "items": [
          "This is the default (normal) option for equity investments",
          "Any transaction costs associated with the purchase of these investments are expensed at initial measurement, not capitalized",
          "The investments are then revalued to fair value at each year end, with the gain/loss being shown in the P&L",
          "Any dividend received is shown in P&L",
          "Initial Measurement",
          "Dr Investment in Shares \t(Fair Value)",
          "Cr Cash \t\t\t(Fair Value)",
          "Subsequent Measurement",
          "Dr Investment in Shares \t(Increase in Fair Value)",
          "Cr P&L \t\t\t(Increase in Fair Value)",
          "Dr P&L \t\t\t\t(Decrease in Fair Value)",
          "Cr Investment in Shares \t(Decrease in Fair Value)",
          "Any transaction costs",
          "Dr P&L",
          "Cr Cash"
        ]
      },
      {
        "title": "Financial Assets that are Equity Instruments: FVOCI",
        "items": [
          "You can choose to classify an equity investment as FVOCI, instead of FVTPL",
          "This can only be chosen",
          "On initial recognition and",
          "If the investment is not Held for Trading (i.e. not to make short term profits)",
          "Once this option is chosen it cannot be changed to FVTPL (Irrevocable)",
          "FVOCI could be applied to strategic investments to be held on a continuing basis which are not held to take advantage of changes in fair value (i.e not held-for-trading)",
          "Under this method:",
          "Transaction costs are capitalized on initial measurement",
          "The investments are then revalued to fair value at each year end, with the gain/loss being shown in the OCI (not P&L) and taken to an Investment Reserve in Statement of Changes in Equity",
          "Fair value gains/ losses are not reclassified to P&L on derecognition",
          "Any dividend received is shown in P&L (not in OCI)"
        ]
      },
      {
        "title": "Financial Assets that are Equity Instruments: FVOCI",
        "items": [
          "Initial measurement",
          "Dr Investment in Shares (Fair Value + Transaction Cost)",
          "Cr Cash (Fair Value + Transaction Cost)",
          "Subsequent Measurement",
          "This is similar to a revaluation of PPE. The main difference is that there can be a negative investment reserve (Revaluation reserve is always positive, because any revaluation loss is charged to the P&L)",
          "If a FVOCI investment is sold, the investment reserve can be transferred into retained earnings or left in equity",
          "Dr Investment in Shares \t(Increase in Fair Value)",
          "Cr OCI \t\t\t\t(Increase in Fair Value)",
          "Dr OCI \t\t\t\t(Decrease in Fair Value)",
          "Cr Investment in Shares \t(Decrease in Fair Value)"
        ]
      },
      {
        "title": "Financial Assets that are DEBT INSTRUMENTS",
        "items": [
          "These are investments made in debt instruments (bond & debentures) of another company. Therefore, money lent to other companies",
          "How investments in debt instruments are classified and subsequently measured depends on:",
          "1 Contractual cash flow characteristics test",
          "2 Business model test"
        ]
      },
      {
        "title": "Financial Assets that are DEBT INSTRUMENTS",
        "items": [
          "Cash Flow Characteristics Test",
          "This test is passed if contractual cash flows (cash flows specified in the contract) from the financial asset are only:",
          "1 Payment of principal/capital and",
          "2 Interest on principal/capital outstanding",
          "E.g. - A convertible bond that has the option of being converted into fixed number of equity shares of the issuer, includes not only interest and capital payments but also right to convert to equity (ordinary shares), so does not pass the Contractual Cash Flow Characteristic Test"
        ]
      },
      {
        "title": "Financial Assets that are DEBT INSTRUMENTS",
        "items": [
          "Business Model Test",
          "considers the entity's purpose in holding the investment."
        ]
      },
      {
        "title": "Financial Assets that are DEBT INSTRUMENTS",
        "items": [
          "Debt instruments could be measured at :"
        ]
      },
      {
        "title": "Financial Assets that are DEBT INSTRUMENTS",
        "items": [
          "Financial assets are classified in accordance with IFRS 9 when initially recognised.",
          "If an entity changes its business model for managing financial assets, all affected financial assets are reclassified (e.g. from fair value through profit or loss to amortised cost). This only applies to investments in debt."
        ]
      },
      {
        "title": "Financial Assets that are DEBT INSTRUMENTS: Amortized cost",
        "items": [
          "A debt instrument can be measured at Amortized Cost if following conditions are met:",
          "Contractual cash flow characteristic test is passed",
          "The business model is Held-to-Collect",
          "The asset is initially measured at fair value + transaction costs",
          "Interest income and year end value are calculated as follows:"
        ]
      },
      {
        "title": "Financial Assets that are DEBT INSTRUMENTS: FVOCI",
        "items": [
          "A debt instrument can be measured at FVOCI if following conditions are met :",
          "Contractual cash flow characteristic test is passed",
          "The business model is Held-to-Collect and Sell",
          "The asset is initially recognized at fair value + transaction costs",
          "Interest income and year end value are calculated as shown in the next slide",
          "Fair value gains/losses would be reclassified to profit or loss when the asset is disposed."
        ]
      },
      {
        "title": "Financial Assets that are DEBT INSTRUMENTS: FVPL",
        "items": [
          "Debt instrument that are not measured at either FVOCI or Amortized Cost is measured at FVTPL",
          "Even financial instruments that qualify to be measured as either FVOCI or Amortized Cost can be measured at FVTPL, if doing so eliminates or significantly reduces a measurement or recognition inconsistency (i.e. an accounting mismatch)",
          "Transaction costs are not capitalized, but charged to the P&L",
          "At the reporting date, the asset will be revalued to fair value with the gain or loss recognized in P&L",
          "Interest income is the coupon payment received recorded in the P&L (not calculated based on EIR)"
        ]
      },
      {
        "title": "Financial Liabilities AND EQUITY: CLASSIFICATION",
        "items": [
          "The issuer of a financial instrument must classify it as a financial liability or equity instrument on initial recognition according to its substance and the definitions provided at the start of this chapter",
          "A financial liability is any liability that is a contractual obligation:",
          "To deliver cash or another financial asset to another entity",
          "To exchange financial instruments with another entity under conditions that are potentially unfavorable",
          "That will or may be settled in a variable number of entity’s own equity instruments"
        ]
      },
      {
        "title": "Classification as liability or equity",
        "items": [
          "The substance of a financial instrument may differ from its legal form.",
          "Some financial instruments take the legal form of equity but in substance are liabilities. Others may combine features associated with both equity and liabilities",
          "The critical feature in differentiating a financial liability from an equity instrument is the existence of a contractual obligation on one party to the financial instrument (the issuer) either to deliver cash or another financial asset to the other party (the holder) or to exchange another financial asset/liability with the holder under conditions that are potentially unfavourable to the issuer.",
          "When such a contractual obligation exists, that instrument meets the definition of a financial liability regardless of the manner in which the contractual obligation will be settled",
          "When a financial instrument does not give rise to such a contractual obligation, it is an equity instrument"
        ]
      },
      {
        "title": "Initial recognition of financial liabilities",
        "items": [
          "Initial Measurement",
          "Financial Liabilities are initially measured at fair value (net proceeds of the cash received less any costs of issuing the liability).",
          "If the financial liability will be held at fair value through profit or loss, transaction costs should be expensed to the statement of profit or loss.",
          "If the financial liability will not be held at fair value through profit or loss, transaction costs should be deducted from its carrying amount.",
          "Subsequent Measurement",
          "After initial recognition an entity should carry all financial liabilities at Amortized Cost other than:",
          "Liabilities held for trading",
          "Derivatives that are liabilities"
        ]
      },
      {
        "title": "Financial Liabilities: AMORTIZED COST",
        "items": [
          "The amortized cost method is the same as for debt instruments under financial assets, but instead of having interest income and a year end asset there will be interest expense and year end liability",
          "The interest will be charged at the effective interest rate (EIR). This is the internal rate of return (IRR) of the instrument",
          "Interest expense and year end value of the liability are calculated as follows:"
        ]
      },
      {
        "title": "Financial Liabilities: FVTPL",
        "items": [
          "Out of the money derivatives and liabilities held for trading are measured at fair value through profit or loss.",
          "It is also possible to measure a liability at fair value when it would normally be measured at amortised cost if it would eliminate or reduce an accounting mismatch. In this case, IFRS 9 says that any movement in fair value is split into two components:",
          "the fair value change due to own credit risk (the risk that the entity which has issued the financial liability will be unable to repay or discharge it), which is presented in other comprehensive income",
          "the remaining fair value change, which is presented in profit or loss.",
          "Not in FR"
        ]
      },
      {
        "title": "Financial Liabilities: AMORTIZED COST",
        "items": [
          "Example Question",
          "On 1 January 20X1 an entity issues 0% loan notes at their nominal value of $40,000. The loan notes are repayable at a premium of $11,800 on 31 December 20X3. The effective rate of interest is 9%.",
          "What amount will be recorded as a financial liability when the loan notes are issued?",
          "What amounts will be shown in the statement of profit or loss and statement of financial position over the period of the loan?"
        ]
      },
      {
        "title": "Financial Liabilities: AMORTIZED COST",
        "items": [
          "Solution"
        ]
      },
      {
        "title": "Compound Instruments",
        "items": [
          "A compound instrument is a financial instrument that has characteristics of both equity and liabilities, such as a convertible loan/ bond",
          "Convertible loan gives the lender (party that invested in the bond) the option to convert it into a fixed no. equity shares of the borrower, instead of collecting the capital outstanding in cash",
          "Compound Instruments are accounted for by the Issuer using Split Accounting, recognizing both the equity and liability components of the instrument."
        ]
      },
      {
        "title": "Interest and Dividends",
        "items": [
          "The accounting treatment of interest and dividends depends upon the accounting treatment of the underlying instrument itself:",
          "Dividends declared on company’s own equity (ordinary shares and Irredeemable preference shares) are reported directly in Statement of Changes in Equity",
          "Dividends on Redeemable Preference Shares (Financial Liability) are an expense in the P&L"
        ]
      },
      {
        "title": "Offsetting Financial Assets/ Financial Liabilities",
        "items": [
          "In common with all IFRS rules on offsetting, a financial asset and a financial liability may only be offset in very limited circumstances",
          "The net amount may only be presented in the balance sheet when the entity:",
          "Has a legally enforceable right to set off the amounts, and",
          "Intends either to",
          "Settle on a net basis or",
          "To realize the asset and settle the liability simultaneously"
        ]
      },
      {
        "title": "Derecognition of financial instruments",
        "items": [
          "Financial instruments should be derecognised as follows:",
          "financial asset – 'when, and only when, the contractual rights to the cash flows from the financial asset expire' (IFRS 9, para 3.2.3),",
          "e.g. when an option held by the entity has expired and become worthless or when the financial asset has been sold and the transfer qualifies for derecognition because substantially all the risks and rewards of ownership have been transferred from the seller to the buyer.",
          "financial liability – 'when, and only when, the obligation specified in the contract is discharged or cancelled or expires' (IFRS 9, para 3.3.1).",
          "On derecognition the difference between the carrying amount of the asset or liability, and the amount received or paid for it, should be included in the profit or loss for the period"
        ]
      },
      {
        "title": "Factoring of receivables",
        "items": [
          "Factoring of receivables is where a company transfers its receivables balances to another organisation (a factor) for management and collection, and receives an advance on the value of those receivables in return.",
          "Is the seller in substance receiving a loan on the security of the receivables, or are the receipts an actual sale of those receivable balances?"
        ]
      },
      {
        "title": "Accounting for the factoring of receivables",
        "items": [
          "We need to consider who bears the risk of loss, either through slow payment or irrecoverable debts.",
          "A sale of receivables with recourse means that the factor can return any unpaid debts to the business, meaning the business retains the risk of irrecoverable debts. In this situation the transaction is treated as a loan secured against the receivables, rather than a sale.",
          "A sale of receivables without recourse means the factor bears the risk of irrecoverable debts. In this case, this is usually treated as a sale and the receivables are removed from the entity’s financial statements."
        ]
      },
      {
        "title": "Disclosure of financial instruments",
        "items": [
          "IFRS 7 provides the disclosure requirements for financial instruments. The major elements of disclosures required are:",
          "carrying amount of each class of financial instrument should be recorded either on the face of the statement of financial position or within the notes",
          "items of income, expense, gains and losses for each class of financial instrument either in the statement of profit or loss and other comprehensive income or within the notes",
          "the nature and extent of risks faced by the entity. This must cover the entity's exposure to risk, management's objectives and policies for managing those risks and any changes in the year."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Accounting standards relevant to financial instruments",
          "IAS 32 Financial Instruments: Presentation",
          "IFRS 7 Financial Instruments: Disclosures",
          "IAS 32 - classification of financial instruments and their presentation in financial statements"
        ],
        "answer": 0
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "IFRS 7 Financial Instruments: Disclosures",
          "IAS 32 - classification of financial instruments and their presentation in financial statements",
          "IFRS 9 - how financial instruments are measured and when they should be recognised in financial statements.",
          "IAS 32 Financial Instruments: Presentation"
        ],
        "answer": 3
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "IFRS 9 - how financial instruments are measured and when they should be recognised in financial statements.",
          "IFRS 7 - disclosure of financial instruments in financial statements",
          "IFRS 7 Financial Instruments: Disclosures",
          "IAS 32 - classification of financial instruments and their presentation in financial statements"
        ],
        "answer": 2
      }
    ],
    "practice": [
      {
        "title": "Practice set",
        "question": "FINANCIAL INSTRUMENTS | OTQ 1 Viking issues $100,000 5% loan notes on 1 January 20X4, incurring issue costs of $3,000. These loan notes are redeemable at a premium, meaning that the effective rate of interest is 8% per annum. What is the finance cost to be shown in the statement of profit or loss for the year ended 31 December 20X5? A $8,240 B $7,981 C $7,760 D $8,000 2 An entity issues 3,000 convertible bonds at the start of year 1 at par. They have a three year term and a face value of $1,000 per bond. Interest is payable annually in arrears at 7% per annum. Each bond is convertible at any time up to maturity into 250 common shares. When the bonds are issued the prevailing market interest rate for similar debt without conversion options is 9%. The relevant discount factors are shown below. Discount factors 7% 9% Year 1 0.933 0.914 Year 2 0.871 0.837 Year 3 0.813 0.766 How is this initially recorded between the debt and equity elements? Debt element Equity element A $2,988,570 $11,430 B B $2,826,570 $173,430 C C $528,570 $2,471,430 D $3,000,000 $Nil 3 For a debt investment to be held under amortised cost, it must pass two tests. One of these is the contractual cash flow characteristics test. What is the other test which must be passed? A The business model test B The amortised cost test C The fair value test D The purchase agreement test FINANCIAL INSTRUMENTS | OTQ 4 On 1 July 20X7, an entity purchased a five‐year loan note investment with a par value of $7m. The investment was purchased at a 12% discount. The loan note has a coupon rate of 5% and an effective interest rate of 8%. Interest is receivable annually in arrears. The entity has the intention of holding the loan note to receive the contractual cash flows. How much finance income should be reported in the statement of profit or loss of the entity for the year ended 30 June 20X9 (to the nearest $000)? $ _________________,000 5 ABC purchased 10,000 shares on 1 September 20X4, making the election to use the alternative treatment under IFRS 9 Financial Instruments. The shares cost $3.50 each. Transaction costs associated with the purchase were $500. At 31 December 20X4, the shares are trading at $4.50 each. What is the gain to be recognised on these shares for the year ended 31 December 20X4? $__________________ 6 DEF purchased 15,000 shares in KMH Co on 1 August 20X6 at a cost of $6.50 each. Transaction costs on the purchase amounted to $1,500. At the year‐end 30 September 20X6, these shares are now worth $7.75 each. Select the correct gain and the place it will be recorded. Gain Where recorded $17,250 Other comprehensive income $18,750 Statement of profit or loss 7 For which category of financial instruments are transaction costs excluded from the initial value, and instead expensed to profit or loss? A Financial liabilities at amortised cost B Financial assets at fair value through profit or loss C Financial assets at fair value through other comprehensive income D Financial assets at amortised cost FINANCIAL INSTRUMENTS | OTQ 8 On 1 January 20X3, Bertrand issued $20 million convertible loan notes that carry a coupon rate of 6% per annum. The loan notes are redeemable on 31 December 20X6 at par for cash or can be exchanged for equity shares. A similar loan note, without the conversion option, would have required Bertrand to pay an interest rate of 9%. The present value of $1 receivable at the end of each year, based on discount rates of 6% and 9%, can be taken as: 6% 9% End of year 1 0.94 0.92 2 0.89 0.84 3 0.84 0.77 How much would be recorded in equity in relation to the loan notes? $___________________ ,000 9 Wonder issued $20 million 5% loan notes on 1 January 20X9, incurring issue costs of $600,000. The loan notes are redeemable at a premium, giving them an effective interest rate of 7%. What expense should be recorded in relation to the loan notes for the year ended 31 December 20X9? $______________ ,000 10 For each of the financial instruments below, match them to the appropriate accounting treatment. Instrument Treatment Convertible loan notes Fair value through profit or loss Equity investments where the entity has an intention to hold long‐term and has chosen to apply the alternative treatment Amortised cost Financial liability, not held for trading Split accounting Equity investments (default position) Fair value through other comprehensive income",
        "answer": "FINANCIAL INSTRUMENTS | OTQ ANS 1 B The loan notes should initially be recorded at their net proceeds, being the $100,000 raised less the $3,000 issue costs, giving $97,000. This should then be held at amortised cost, taking the effective rate of interest to the statement of profit or loss. The annual payment will be the coupon rate, which will be 5% × $100,000 = $5,000 a year. Applying this to an amortised cost table gives $7,981, as shown below. B/f Interest 8% Payment c/f $ $ $ $ 20X4 97,000 7,760 (5,000) 99,760 20X5 99,760 7,981 If you chose C, you have done the calculation for 20X4. If you chose D, you have used 8% of the full $100,000 and done the calculation for 20X4. If you chose A, you have used 8% of the full $100,000. 2 B The amount payable each year is based on the coupon rate of 7%, giving an amount of $210,000 payable each year ($3 million × 7%). This should be discounted at the market rate of interest of 9%, together with the capital repayment to find the value of the liability. Year 1 ($210,000 × 0.914) 191,940 Year 2 ($210,000 × 0.837) 175,770 Year 3 ($3,210,000 × 0.766) 2,458,860 Total present value of debt 2,826,570 Equity element (balance) 173,430 Total bond value 3,000,000 If you chose A, you used the incorrect discount rate. If you chose C you forgot to calculate the repayment of $3 million. If you chose D you have not used split accounting. 3 A The business model test must also be passed, which means that the objective is to hold the instrument to collect the cash flows rather than to sell the asset. The others are irrelevant. 4 $504,000 The investment would initially be recorded at its fair value plus any transaction costs. As the $7m loan note was purchased at a 12% discount and no transaction costs are included in the question, this means that the investment would be recorded on 1 July 20X7 at its fair value of $6,160,000 ($7m × 88%). Interest is charged at the effective rate of 8%. $000 b/f Interest @ 8% Paid ($7m × 5%) c/f 30 June 20X8 6,160 493 (350) 6,303 30 June 20X9 6,303 504 (350) 6,457 Note that the nominal interest and closing balance at 30 June 20X9 have been included for illustrative purposes only and were not required to reach the answer of $504,000. FINANCIAL INSTRUMENTS | OTQ ANS 5 $9,500 The investment should be classified as fair value through other comprehensive income. As such, they will initially be valued inclusive of transaction costs. Therefore, the initial value is 10,000 × $3.50 = $35,000 + $500 = $35,500. At year‐end, these will be revalued to fair value of $4.50 each, therefore 10,000 × $4.50 = $45,000. The gain is therefore $45,000 – $35,500 = $9,500. 6 Gain Where recorded 18,750 Statement of profit or loss Financial assets held for trading will be valued at fair value through profit or loss. These are therefore valued excluding any transaction costs, which will be expensed to profit or loss. The initial value of the investment is therefore 15,000 × $6.50 = $97,500 The shares will be revalued to fair value as at year‐end, and the gain will be taken to profit or loss. The year‐end value of the shares is 15,000 × $7.75 = $116,250, giving a gain of $18,750. This is recognised within profit or loss. 7 B Transaction costs are included when measuring all financial assets and liabilities at amortised cost, and when valuing financial assets valued at fair value through other comprehensive income. Transaction costs for financial assets valued at fair value through profit or loss are expensed through the statement of profit or loss and not included in the initial value of the asset. 8 $1,564,000 9 $1,358,000 The initial liability should be recorded at the net proceeds of $19.4 million. The finance cost should then be accounted for using the effective rate of interest of 7%. Therefore the finance cost for the year is $1,358,000 ($19.4 million × 7%). FINANCIAL INSTRUMENTS | OTQ ANS 10 Instrument Treatment Convertible loan notes Fair value through profit or loss Equity investments where the entity has an intention to hold long ‐ term and has chosen to apply the alternative treatment Amortised cost Financial liability, not held for trading Split accounting Equity investments default ( position) Fair value through other comprehensive income"
      }
    ]
  },
  {
    "slug": "employee-benefits",
    "title": "Employee Benefits",
    "standard": "IAS 19",
    "blocks": [
      {
        "title": "Types of employee benefit",
        "items": [
          "• IAS 19 Employee Benefits identifies four types of employee benefit as follows:",
          "1. Short-term employee benefits - This includes wages and salaries, bonuses and other benefits.",
          "2. Termination benefits - Termination benefits arise when benefits become payable upon employment being terminated, either by the employer or by the employee accepting terms to have employment terminated.",
          "3. Post-employment benefits - This normally relates to retirement benefits.",
          "4. Other long-term employee benefits - This comprises other items not within the above classifications and will include long-service leave or awards, long-term disability benefits and other long-service benefits."
        ]
      },
      {
        "title": "Post-employment benefit plans",
        "items": [
          "• A pension plan (sometimes called a post-employment benefit plan or scheme) consists of a pool of assets, together with a liability for pensions owed. Pension plan assets normally consist of investments, cash and (sometimes) properties.",
          "• The return earned on the assets is used to pay pensions.",
          "• There are two main types of pension plan:",
          "1. Defined contribution plans - benefit plans where the entity pays fixed contributions into a separate entity and will have no legal or constructive obligation to pay further contributions if the fund does not hold sufficient assets to pay all employee benefits relating to their service",
          "2. Defined benefit plans - post-employment plans that are not defined contribution plans."
        ]
      },
      {
        "title": "Post-employment benefit plans",
        "items": [
          "A defined contribution plan",
          "• An entity pays fixed contributions of 5% of employee salaries into a pension plan each month. The entity has no obligation outside of its fixed contributions.",
          "• The lack of any obligation to contribute further assets into the fund means that this is a defined contribution plan.",
          "A defined benefit plan An entity guarantees a particular level of pension benefit to its employees upon retirement. The annual pension income that employees will receive is based on the following formula: Salary at retirement × (no. of years worked/60 years) The entity has an obligation to pay extra funds into the pension plan to meet this promised",
          "level of pension benefits. This is therefore a defined benefit plan.                TUU 1"
        ]
      },
      {
        "title": "Defined contribution plans",
        "items": [
          "• The entity should charge the agreed pension contribution to profit or loss as an employment expense in each period.",
          "• The expense of providing pensions in the period is often the same as the amount of contributions paid. However, an accrual or prepayment arises if the cash paid does not equal the value of contributions due for the period"
        ]
      },
      {
        "title": "Defined benefit plans",
        "items": [
          "The statement of financial position",
          "• Under a defined benefit plan, an entity has an obligation to its employees. The entity therefore has a long-term liability (called pension obligations) that must be measured at present value.",
          "• The entity will also be making regular contributions into the pension plan. These contributions will be invested and the investments will generate returns. This means that the entity has assets held within the pension plan (called plan assets), which IAS 19 states must be measured at fair value.",
          "• On the statement of financial position, an entity offsets its pension obligation and its plan assets and reports the net position:",
          "1. If the obligation > the assets, there is a plan deficit (the usual situation) and a liability is reported in the statement of financial position.",
          "2. If the assets > the obligation, there is a surplus and an asset is reported in the statement of financial position."
        ]
      },
      {
        "title": "Defined benefit plans",
        "items": [
          "• It is difficult to calculate the size of the defined benefit pension obligation and plan assets. It is therefore recommended that entities use an expert known as an actuary."
        ]
      },
      {
        "title": "Year-on-year Movement: Net Interest Component",
        "items": [
          "• This is charged (or credited) to profit or loss and represents the change in the net pension liability (or asset) due to the passage in time. It is computed by applying the discount rate at the start of the year to the net defined benefit liability (or asset).",
          "• The interest rate used is normally the interest rate/ yield on a high-quality corporate bond"
        ]
      },
      {
        "title": "Year-on-year Movement: Service cost component",
        "items": [
          "• This is charged to profit or loss and is comprised of three elements",
          "1. Current service cost, which is the increase in the present value of the obligation arising from employee service in the current period",
          "2. Past service cost, which is the change in the present value of the obligation for employee service in prior periods, resulting from a plan amendment or curtailment.",
          "3. Any gain or loss on settlement",
          "• Past service costs arise when there has been an improvement in the benefits to be provided under the plan or when there has been a curtailment.",
          "• A curtailment is a significant reduction in the number of employees covered by a pension plan. This may be a consequence of employees being made redundant."
        ]
      },
      {
        "title": "Year-on-year Movement: Service cost component",
        "items": [
          "• Past service costs are recognised at the earlier of:",
          "1. when the plan amendment or curtailment occurs",
          "2. when the entity recognises related restructuring costs or termination benefit",
          "• A settlement occurs when an entity enters into a transaction to eliminate the obligation for part or all of the benefits under a plan. For example, an employee may leave the entity for a new job elsewhere, and a payment is made from that pension plan to the pension plan operated by the new employer.",
          "• The gain or loss on settlement is the difference between the fair value of the plan assets paid out and the reduction in the present value of the defined benefit obligation. The gain or loss forms part of the service cost component."
        ]
      },
      {
        "title": "Year-on-year Movement: Contributions",
        "items": [
          "• These are the cash payments paid into the plan during the reporting period by the employer. This has no impact on the statement of profit or loss and other comprehensive income."
        ]
      },
      {
        "title": "Year-on-year Movement: Benefits paid",
        "items": [
          "• These are the amounts paid out of the plan assets to retired employees during the period. These payments reduce both the plan obligation and the plan assets. Therefore, this has no overall impact on the net pension deficit (or asset)."
        ]
      },
      {
        "title": "Year-on-year Movement: Remeasurement component",
        "items": [
          "• After accounting for the above, the net pension deficit will differ from the amount calculated by the actuary as at the current year end. This is for a number of reasons:",
          "• The actuary's calculation of the value of the plan obligation and assets is based on assumptions, such as life expectancy and final salaries, and these will have changed year-on-year.",
          "• The actual return on plan assets is different from the amount taken to profit or loss as part of the net interest component.",
          "• An adjustment, known as the remeasurement component, must therefore be posted. This is charged or credited to other comprehensive income for the year and identified as an item that will not be reclassified to profit or loss in future periods."
        ]
      },
      {
        "title": "Illustration 1, 2, 3",
        "items": [
          "TUU 3, 5, 6"
        ]
      },
      {
        "title": "Defined benefit plan amendments, curtailments and settlements",
        "items": [
          "• If there is a plan amendment, settlement or curtailment (PASC) then the effect of this is calculated by comparing the net defined benefit deficit before and after the event.",
          "• Even though the reporting entity remeasures the defined benefit deficit in the event of a PASC, IAS 19 did not previously require the use of updated assumptions to determine current service cost and net interest for the remaining period after the PASC.",
          "• The Board argued that ignoring updated assumptions is inappropriate because these are likely to provide the most faithful representation of the economic impact of the entity’s defined benefit pension plan during the reporting period."
        ]
      },
      {
        "title": "Amendments",
        "items": [
          "• The Board amended IAS 19 to clarify that the reporting entity must determine:",
          "1. the current service cost for the remainder of the reporting period after the PASC using the actuarial assumptions used to remeasure the net defined benefit liability",
          "2. net interest for the remainder of the reporting period after the PASC using the remeasured defined benefit deficit and the discount rate used to remeasure the defined benefit deficit."
        ]
      },
      {
        "title": "The Asset Ceiling",
        "items": [
          "• Most defined benefit pension plans are in deficit (i.e. the obligation exceeds the plan assets) although some defined benefit pension plans show a surplus.",
          "• If a defined benefit plan is in surplus, IAS 19 states that the surplus must be measured at the lower of:",
          "• the amount calculated as normal (per earlier examples and illustrations)",
          "• the total of the present value of any economic benefits available in the form of refunds from the plan or reductions in future contributions to the plan.",
          "• This is known as applying the ‘asset ceiling’. It means that a surplus can only be recognised to the extent that it will be recoverable in the form of refunds or reduced contributions in the future. This ensures that an asset is only recognised if it has the potential to bring economic benefits to the reporting entity. Illustration 4 & TUU 8"
        ]
      },
      {
        "title": "Other Issues",
        "items": [
          "Short-term employee benefits",
          "• This includes a number of issues including: Wages and salaries and bonuses and other benefits. The general principle is that wages and salaries costs are expenses as they are incurred on a normal accruals basis, unless capitalisation is permitted in accordance with another reporting standard. Bonuses and other short-term payments are recognized using normal criteria of establishing an obligation based upon past events which can be reliably measured."
        ]
      },
      {
        "title": "Other Issues",
        "items": [
          "• Compensated absences. This covers issues such as holiday pay, sick leave, maternity leave, jury service, study leave and military service. The key issue is whether the absences are regarded as being accumulating or non-accumulating:",
          "• Accumulating benefits are earned over time and are capable of being carried forward.",
          "• In this situation, the expense for future compensated absences is recognised over the period services are provided by the employee. This will typically result in the recognition of a liability at the reporting date for the expected cost of the accumulated benefit earned but not yet claimed by an employee.",
          "• An example of this would be a holiday pay accrual at the reporting date where unused holiday entitlement can be carried forward and claimed in a future period."
        ]
      },
      {
        "title": "Types of employee benefit",
        "items": [
          "• Non-accumulating benefits, an expense should only be recognised when the absence occurs.",
          "• This may arise, for example, where an employee continues to receive their normal remuneration whilst being absent due to illness or other permitted reason.",
          "• A charge to profit or loss would be made only when the authorised absence occurs; if there is no such absence, there will be no charge to profit or loss.",
          "• Benefits in kind. Recognition of cost should be based on the same principles as benefits payable in cash; it should be measured based upon the cost to the employer of providing the benefit and recognised as it is earned."
        ]
      },
      {
        "title": "Termination benefits",
        "items": [
          "Definition",
          "• Termination benefits are those benefits provided in exchange for termination of an employee's employment as a result of either an entity's decision to terminate that employment before the employee's normal retirement date or an employee's decision to accept an offer of benefits in exchange for termination (voluntary redundancy)",
          "• Such payments are normally in the form of a lump sum. Recognition",
          "• The reporting entity should recognise a liability and an expense in relation to termination benefits at the earlier of the date when:",
          "• the entity can no longer withdraw the termination benefits offer (because its announced)",
          "• the entity recognises restructuring costs in accordance with IAS 37 Provisions, Contingent Liabilities and Contingent Assets. An entity can no longer withdraw a termination benefits offer when a detailed plan has been communicated to affected employees."
        ]
      },
      {
        "title": "Termination benefits",
        "items": [
          "Measurement",
          "Termination benefits are measured on initial recognition. The reporting entity should measure and account for subsequent changes in accordance with the nature of the benefit:",
          "• If the benefit will be wholly settled within 12 months of the reporting period in which it is initially recognised, it will be accounted for as a short-term benefit",
          "• If the benefit will be wholly settled within 12 months of the reporting period in which it is initially recognised, it will be accounted for as a type of other long-term benefit",
          "• If the benefit results in an enhancement to an employee’s pension scheme, then the rules for pension scheme accounting are applied."
        ]
      },
      {
        "title": "Other long-term employee benefits",
        "items": [
          "• This comprises other items not within the above classifications and will include long- service leave, long-term disability benefits and other long-service benefits.",
          "• These employee benefits are accounted for in a similar manner to accounting for post- employment benefits, as benefits are payable more than twelve months after the period in which services are provided by an employee.",
          "• However, any remeasurement components are recorded in profit or loss rather than in other comprehensive income."
        ]
      },
      {
        "title": "Disclosure requirements",
        "items": [
          "• IAS 19 has extensive disclosure requirements. An entity should disclose the following information about defined benefit plans:",
          "1. Significant actuarial assumptions used to determine the net defined benefit obligation or assets.",
          "2. a general description of the type of plan operated",
          "3. a reconciliation of the assets and liabilities recognised in the statement of financial position",
          "4. the charge to total comprehensive income for the year, separated into the appropriate components",
          "5. analysis of the remeasurement component to identify returns on plan assets, together with actuarial gains and losses arising on the net plan obligation",
          "6. sensitivity analysis and narrative description of how the defined benefit plan may affect the nature, timing and uncertainty of the entity’s future cash flows."
        ]
      },
      {
        "title": "Criticisms",
        "items": [
          "• Retirement benefit accounting continues to be a controversial area.",
          "• Commentators have perceived the following problems with IAS 19:",
          "1. Classification – some types of pension plans cannot be easily classified as 'defined benefit' or 'defined contribution'.",
          "2. Volatility – the fair values of defined benefit plan assets may be volatile or difficult to measure reliably.",
          "3. Short-term – IAS 19 requires defined benefit plan assets to be valued at fair value. However, most pension scheme assets and liabilities are held for the long term.",
          "4. Complexity – the treatment of defined benefit pension costs in the statement of profit or loss and other comprehensive income may not be easily understood by users of the financial statements.",
          "5. Conceptual Framework – the requirement to reflect future salary increases and unvested benefits when measuring the defined benefit obligation seems to be at odds with the Conceptual Framework’s definition of a liability because there is no current obligation to pay these."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "IAS 19 Employee Benefits identifies four types of employee benefit as follows:",
          "1. Short-term employee benefits - This includes wages and salaries, bonuses and",
          "2. Termination benefits - Termination benefits arise when benefits become payable",
          "upon employment being terminated, either by the employer or by the employee"
        ],
        "answer": 0
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "2. Termination benefits - Termination benefits arise when benefits become payable",
          "upon employment being terminated, either by the employer or by the employee",
          "accepting terms to have employment terminated.",
          "1. Short-term employee benefits - This includes wages and salaries, bonuses and"
        ],
        "answer": 3
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "accepting terms to have employment terminated.",
          "3. Post-employment benefits - This normally relates to retirement benefits.",
          "2. Termination benefits - Termination benefits arise when benefits become payable",
          "upon employment being terminated, either by the employer or by the employee"
        ],
        "answer": 2
      }
    ],
    "practice": []
  },
  {
    "slug": "share-based-payments",
    "title": "Share-based Payments",
    "standard": "IFRS 2",
    "blocks": [
      {
        "title": "Share-based Payments",
        "items": [
          "• A share-based payment occurs when an entity buys goods or services from other parties (such as employees or suppliers) and:",
          "1. settles the amounts payable by issuing its shares or share options, or",
          "2. incurs liabilities for cash payments based on its share prices",
          "• If a company pays for goods or services in cash, an expense is recognised in profit or loss. If a company ‘pays’ for goods or services in share options, there is no cash outflow and therefore, under traditional accounting, no expense would be recognised.",
          "• The employees have provided a valuable service to the entity, in exchange for the shares or share options. It is inconsistent not to recognise this transaction in the financial statements.",
          "• IFRS 2 Share-based Payment was issued to deal with this accounting anomaly. IFRS 2 requires that all share-based payment transactions must be recognized in the financial statements when the transaction takes place."
        ]
      },
      {
        "title": "Types of Share-based Payments",
        "items": [
          "• IFRS 2 applies to all share-based payment transactions. There are two main types.",
          "1. Equity-settled share-based payments: the entity acquires goods or services in exchange for equity instruments of the entity (e.g. shares or share options/share warrants)",
          "2. Cash-settled share-based payments: the entity acquires goods or services in exchange for amounts of cash measured by reference to the entity’s share price.",
          "• A share option allows the holder to buy a share in the future for a fixed price (the ‘exercise price’). If the exercise price is less than the fair value of a share at the exercise date then the option holder is essentially getting a discount and so the option is said to be ‘in the money’.",
          "• The most common type of share-based payment transaction is where share options are granted to employees or directors as part of their remuneration."
        ]
      },
      {
        "title": "Equity-settled share-based payments",
        "items": [
          "• When an entity receives goods or services as a result of an equity-settled share-based payment transaction, it posts the following double entry: Dr Expense/asset Cr Equity",
          "• The entry to equity is normally reported in 'other components of equity'. Share capital is not affected until the share-based payment has 'vested' (covered later in the chapter)."
        ]
      },
      {
        "title": "Equity-settled share-based payments",
        "items": [
          "Measurement",
          "• The basic principle is that share-based payment transactions are measured at fair value. However, there are complications as to how this is determined:",
          "• The grant date is the date at which the entity and another party agree to the arrangement/ transaction",
          "• Employees and others providing similar services include employees, managers and directors",
          "• The vesting date is the date on which the counterparty (e.g. the employee) becomes entitled to receive the cash or equity instruments under the arrangement."
        ]
      },
      {
        "title": "Equity-settled: Timing",
        "items": [
          "• Some equity instruments vest immediately. In other words, the holder is unconditionally entitled to the instruments. In this case, the transaction should be accounted for in full on the grant date.",
          "• However, when share options are granted to employees, there are normally conditions attached. For example, a service condition may exist that requires employees to complete a specified period of service.",
          "• IFRS 2 states that an entity should account for services as they are rendered during the vesting period (the period between the grant date and the vesting date).",
          "• The vesting date is the date on which the counterparty (e.g. the employee) becomes entitled to receive the cash or equity instruments under the arrangement.",
          "• The expense recognised at each reporting date should be based on the best estimate of the number of equity instruments expected to vest.",
          "• On the vesting date, the entity shall revise the estimate to equal the number of equity instruments that ultimately vest."
        ]
      },
      {
        "title": "Equity-settled: Timing",
        "items": [
          "TUU 1 & 2"
        ]
      },
      {
        "title": "Equity-settled: Performance Conditions",
        "items": [
          "• In addition to service conditions, some share based payment schemes have performance conditions that must be satisfied before they vest, such as:",
          "1. achieving a specified increase in the entity's profit",
          "2. the completion of a research project",
          "3. achieving a specified increase in the entity's share price.",
          "• Performance conditions can be classified as either market conditions or non-market conditions.",
          "• A market condition is defined by IFRS 2 as one that is related to the market price of the entity’s equity instruments. An example of a market condition is that the entity must attain a minimum share price by the vesting date for scheme members to be eligible to participate in the sharebased payment scheme.",
          "• Non-market performance conditions are not related to the market price of the entity's equity instruments. Examples of non-market performance conditions include EPS or profit targets."
        ]
      },
      {
        "title": "Equity-settled: Performance Conditions",
        "items": [
          "The impact of performance conditions",
          "• Market-based conditions have already been factored into the fair value of the equity instrument (Options) at the grant date. Therefore, an expense is recognised irrespective of whether market conditions are satisfied.",
          "• Non-market based conditions must be taken into account in determining whether an expense should be recognised in a reporting period and the amount of the expense/ the no. of options expected to be vested",
          "TUU 3 & 4"
        ]
      },
      {
        "title": "Equity-settled: Accounting after the vesting date",
        "items": [
          "• IFRS 2 states that no further adjustments to the amount in “other components of equity” should be made after the vesting date. This applies even if some of the share options do not vest (for example, because a market based condition was not met) or if some share options are not exercised",
          "• When shares are issued for the options vested, the following double entry is passed: Dr Cash Dr Other Components of Equity Cr Share Capital Cr Share Premium",
          "• Entities may transfer any balance from 'other components of equity’ to retained earnings if the options are not exercised"
        ]
      },
      {
        "title": "Modifications to the terms on which equity instruments are granted",
        "items": [
          "• An entity may alter the terms and conditions of share option schemes during the vesting period. For example:",
          "• it might increase or reduce the exercise price of the options (the price that the holder of the options has to pay for shares when the options are exercised). This makes the scheme less favourable or more favourable to employees.",
          "• it might change the vesting conditions, to make it more likely or less likely that the options will vest.",
          "• If a modification to an equity-settled share-based payment scheme occurs, the entity must continue to recognise the grant date fair value of the equity instruments (share options) in profit or loss, unless the instruments do not vest because of a failure to meet a non-market based vesting condition."
        ]
      },
      {
        "title": "Modifications to the terms on which equity instruments are granted",
        "items": [
          "• In addition to that, If the modification increases the fair value of the equity instruments, then an extra expense must be recognised:",
          "• The difference between the fair value of the new arrangement and the fair value of the original arrangement (the incremental fair value) at the date of the modification must be recognised as a charge to profit or loss.",
          "• The extra expense is spread over the period from the date of the change to the vesting date."
        ]
      },
      {
        "title": "Equity-settled: Cancellations and settlements",
        "items": [
          "• An entity may cancel or settle a share option scheme before the vesting date.",
          "• If the cancellation or settlement occurs during the vesting period, the entity immediately recognises the amount that would otherwise have been recognised for services received over the vesting period ('an acceleration of vesting').",
          "• Any payment made to employees up to the fair value of the equity instruments granted at cancellation or settlement date is accounted for as a deduction from equity.",
          "• Any payment made to employees in excess of the fair value of the equity instruments granted at the cancellation or settlement date is accounted for as an expense in profit or loss.",
          "TUU 7`"
        ]
      },
      {
        "title": "Cash-settled share-based payments",
        "items": [
          "• Examples of cash-settled share-based payment transactions include:",
          "• share appreciation rights (SARs), where employees become entitled to a future cash payment based on the increase in the entity’s share price from a specified level over a specified period of time",
          "• the right to shares that are redeemable, thus entitling the holder to a future payment of cash.",
          "• The double entry for a cash-settled share-based payment transaction is: Dr Profit or loss/Asset Cr Liabilities",
          "Measurement",
          "• The entity remeasures the fair value of the liability arising under a cash-settled scheme at each reporting date.",
          "• This is different from accounting for equity-settled share-based payments, where the fair value is fixed at the grant date."
        ]
      },
      {
        "title": "Cash-settled: Allocating Expenses",
        "items": [
          "• Where services are received in exchange for cash-settled share-based payments, the expense is recognised over the period that the services are rendered (the vesting period).",
          "• This is the same principle as for equity-settled transactions. Illustration 2"
        ]
      },
      {
        "title": "The value of share appreciation rights (SARs)",
        "items": [
          "• SARs may be exercisable over a period of time. The fair value of each SAR comprises the intrinsic value (the cash amount payable based upon the share price at that date) together with its time value (based upon the fact that the share price will vary over time).",
          "• When SARs are exercised, they are accounted for at their intrinsic value at the exercise date. The fair value of a SAR could exceed its intrinsic value at this date. This is because SAR holders who do not exercise their rights at that time have the ability to benefit from future share price rises over the exercisable period",
          "• At the end of the exercise period, the intrinsic value of a SAR will equal its fair value. The liability will be cleared and any remaining balance taken to profit or loss.",
          "• Any remaining SAR, not yet exercised should be remeasured to FV at each reporting date"
        ]
      },
      {
        "title": "Replacing a cash-settled scheme with an equity-settled scheme",
        "items": [
          "• An entity may modify the terms of a cash-settled share-based payment scheme so that it becomes classified as an equity-settled scheme. If this is the case,",
          "• IFRS 2 requires the entity to:",
          "• Measure the transaction by reference to the modification fair value of the equity instruments granted",
          "• Derecognise the liability and recognise equity to the extent of the services rendered by the modification date",
          "• Recognise a profit or loss for the difference between the liability derecognised and the equity recognised."
        ]
      },
      {
        "title": "Other Issues",
        "items": [
          "Hybrid transactions Entity choice",
          "• If a share-based payment transaction gives the entity a choice over whether to settle in cash or by issuing equity instruments, IFRS 2 states that:",
          "• The scheme should be accounted for as a cash-settled share-based payment transaction if the entity has an obligation to settle in cash.",
          "• If no obligation exists to settle in cash, then the entity accounts for the transaction as an equity-settled share-based payment scheme."
        ]
      },
      {
        "title": "Other Issues",
        "items": [
          "Counterparty choice",
          "• Some entities enter into share-based payment transactions that give the counterparty the choice of settling in cash or in equity instruments. In this case, the entity has granted a compound instrument and so the credit entry must be split between equity and liabilities:",
          "• Equity Component:",
          "• If the transaction is with employees, the equity element is calculated as: Fair value of the equity alternative at the grant date - Fair value of the cash alternative at the grant date",
          "• If the transaction is not with employees, the equity element is calculated as: Fair value of the good or service received - Fair value of the cash alternative at the date of the transaction.",
          "• Liability Component: Fair value as per the cash settled method (at the year-end).",
          "• These amounts will be recognized over the vesting period."
        ]
      },
      {
        "title": "Other Issues",
        "items": [
          "Group share-based payments A subsidiary might receive goods or services from employees or suppliers but the parent (or another entity in the group) might issue equity or cash settled share-based payments as consideration. In accordance with IFRS 2, the entity that receives goods or services in a share-based payment arrangement must account for those goods or services irrespective of which entity in the group settles the transaction, or whether the transaction is settled in shares or cash.",
          "Disclosures The main disclosures required by IFRS 2 are as follows:",
          "• a description of share-based payment arrangements",
          "• the number of share options granted or exercised during the year",
          "• the total share-based payment expense. IFRS 2 requires disclosures that enable users to understand how fair values have been determined."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "A share-based payment occurs when an entity buys goods or services from other parties (such as",
          "settles the amounts payable by issuing its shares or share options, or",
          "incurs liabilities for cash payments based on its share prices",
          "If a company pays for goods or services in cash, an expense is recognised in profit or loss. If a"
        ],
        "answer": 0
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "incurs liabilities for cash payments based on its share prices",
          "If a company pays for goods or services in cash, an expense is recognised in profit or loss. If a",
          "company ‘pays’ for goods or services in share options, there is no cash outflow and therefore,",
          "settles the amounts payable by issuing its shares or share options, or"
        ],
        "answer": 3
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "company ‘pays’ for goods or services in share options, there is no cash outflow and therefore,",
          "under traditional accounting, no expense would be recognised.",
          "incurs liabilities for cash payments based on its share prices",
          "If a company pays for goods or services in cash, an expense is recognised in profit or loss. If a"
        ],
        "answer": 2
      }
    ],
    "practice": []
  },
  {
    "slug": "taxation",
    "title": "Income Taxes",
    "standard": "IAS 12",
    "blocks": [
      {
        "title": "IAS 12 Income Taxes",
        "items": [
          "IAS 12 Income Taxes states that there are two elements of tax that need to be recognised in the financial statements:",
          "Current tax (the amount of tax payable/recoverable in respect of the taxable profit/loss for a period).",
          "Deferred tax (an accounting adjustment aimed to match the tax effects of transactions to the relevant accounting period)."
        ]
      },
      {
        "title": "Income Tax EXPENSE",
        "items": [
          "The income tax expense shown in the Statement of Profit or Loss is actually made up of three components as follows"
        ]
      },
      {
        "title": "1 Current Tax Estimate",
        "items": [
          "Current tax is the estimated amount of tax payable/ recoverable by a business to the tax authority in respect of the taxable profit/ loss for a period",
          "Income tax on businesses are calculated based on taxable profit, not based on profit before tax (accounting profit) shown in the P&L",
          "Taxable profit is a measure of profit calculated based on tax rules and regulations of the taxation authority",
          "At year end, the company estimates the amount of current tax that will have to be paid on the taxable profit generated during the year. This estimate is recorded as follows :",
          "Dr Income tax expense – P&L",
          "Cr Income tax payable",
          "Current tax estimate (Income tax payable) is shown as a current liability in the balance sheet until paid"
        ]
      },
      {
        "title": "1 Current Tax Estimate",
        "items": [
          "Example",
          "Taxable profit computation for the tax year ending 31 December 2019"
        ]
      },
      {
        "title": "2 Under/ Over provision of Current Tax",
        "items": [
          "After the year end, the tax authority will compute the correct amount of income tax and notify the company, and the company will pay that amount. It is recorded as follows:",
          "Dr Income Tax Payable",
          "Cr Cash",
          "This amount could be higher or lower than the estimate made by the company. As a result there could be a debit or a credit balance in the Income tax payable account which is transferred to the P&L as part of income tax expense in the year tax payment was made",
          "Amount paid for previous year > Previous year’s current tax estimate = Under provision",
          "Dr Income tax expense",
          "Cr Income tax payable",
          "Amount paid for previous year < Previous year’s current tax estimate = Over provision",
          "Dr Income tax payable",
          "Cr Income tax expense"
        ]
      },
      {
        "title": "3 Deferred Tax",
        "items": [
          "Deferred tax is an accounting adjustment aimed to match the tax effects of transactions to the relevant accounting period",
          "Deferred tax adjustments are required due to actual tax payable to the government being calculated based on taxable profit, while the financial statements show accounting profit (profit before tax)",
          "Differences in accounting profit and taxable profit are of two types",
          "Permanent difference",
          "Temporary difference"
        ]
      },
      {
        "title": "3 Deferred Tax: Permanent Differences",
        "items": [
          "Differences between taxable profit and accounting profit caused by certain expenses not being allowable/deductible in calculating taxable profit and certain incomes not being taxable",
          "Permanent difference only create a permanent one time difference in accounting profit and taxable profit in one period",
          "An example of a permanent difference could be client entertaining expenses or traffic fines. These expense could be deducted as expenses in calculating accounting profit but can not be deducted in calculating taxable profit",
          "Permanent differences do not give rise to deferred tax consequences – no deferred tax asset or liability"
        ]
      },
      {
        "title": "3 Deferred Tax: Permanent Differences",
        "items": [
          "Example",
          "Entertainment expense incurred in Y1 – USD 200"
        ]
      },
      {
        "title": "3 Deferred Tax: Temporary Differences",
        "items": [
          "Temporary differences arise due to expenses/ incomes considered in calculating both accounting profit and taxable profit but in different amounts in different accounting periods",
          "For an example, if under tax laws a machinery has to be depreciated (capital allowance) over 2 years, but the same machine is depreciated over 4 years under accounting, the accounting profit and taxable profit will be different",
          "It is temporary differences that result in deferred tax consequences – deferred tax liabilities and assets",
          "'A deferred tax asset shall be recognised for all deductible temporary differences to the extent that it is probable that taxable profit will be available against which the deductible temporary difference can be utilised'"
        ]
      },
      {
        "title": "3 Deferred Tax: Temporary Differences",
        "items": [
          "Example",
          "Cost of the Machine – USD 1,000 | Tax rate – 10%"
        ]
      },
      {
        "title": "3 Deferred Tax: Temporary Differences",
        "items": [
          "Temporary differences can be calculated as the differences between the carrying amount of an asset or liability and its tax base",
          "Tax base of an asset or a liability is the amount attributed to that asset or liability for tax purposes (normally, Cost – Acc. Tax Depreciation)",
          "It is temporary differences that result in deferred tax consequences – deferred tax liabilities and assets",
          "Carrying amount \t X",
          "Tax base \t __(X)__",
          "Temporary difference _ X__",
          "Deferred tax asset/ liability = Temporary difference × Tax rate"
        ]
      },
      {
        "title": "3 Deferred Tax: Temporary Differences",
        "items": [
          "For Assets",
          "Carrying Amount > Tax Base = Taxable Temporary Difference",
          "Creates a Deferred Tax Liability (You will have to pay more tax in the future)",
          "Carrying Amount < Tax Base = Deductible Temporary Difference",
          "Creates a Deferred Tax Asset (You will have to pay less tax in the future)",
          "For Liabilities",
          "Carrying Amount > Tax Base = Deductible Temporary Difference",
          "Creates a Deferred Tax Asset (You will have to pay less tax in the future)",
          "Carrying Amount < Tax Base = Taxable Temporary Difference",
          "Creates a Deferred Tax Liability (You will have to pay more tax in the future)"
        ]
      },
      {
        "title": "Examples: Temporary Differences",
        "items": [
          "Temporary differences include (but are not restricted to):",
          "Tax deductions for the cost of non-current assets that have a different pattern to the write-off of the asset in the financial statements.",
          "Intra-group profits in inventory that are unrealised for consolidation purposes yet taxable in the computation of the group entity that made the unrealised profit.",
          "Losses reported in the financial statements but the related tax relief is only available by carry forward against future taxable profits.",
          "Assets are revalued upwards in the financial statements, but no adjustment is made for tax purposes.",
          "Development costs are capitalised and amortised to profit or loss in future periods, but were deducted for tax purposes as incurred.",
          "The cost of granting share options to employees is recognised in profit or loss, but no tax deduction is obtained until the options are exercised."
        ]
      },
      {
        "title": "Tax base",
        "items": [
          "Tax base of an asset",
          "The tax base of an asset is the amount that will be deductible for tax purposes against any taxable economic benefits that will flow to the entity when it recovers the carrying amount of the asset",
          "Where those economic benefits are not taxable, the tax base of the asset is the same as its carrying amount.",
          "Tax base of a liability",
          "The tax base of a liability is: Carrying amount - Amount that is deducted for tax purposes in relation to the liability in future periods (any amount that can be deducted from taxable profit in future years)",
          "For revenue received in advance, the tax base of the resulting liability is: Carrying amount - Revenue that will not be taxable in future periods"
        ]
      },
      {
        "title": "Deferred Tax: measurement",
        "items": [
          "Deferred tax liabilities and assets should be shown in the statement of financial position as non-current liabilities and assets",
          "Deferred tax liabilities and asset are not discounted"
        ]
      },
      {
        "title": "Deferred Tax: double entry",
        "items": [
          "It is the movement on deferred tax that will need to be accounted for:",
          "Increase in deferred tax liability:",
          "Dr Income tax expense \t\tX",
          "Cr Deferred tax liability \tX",
          "Reduction in deferred tax liability:",
          "Dr Deferred tax liability \tX",
          "Cr Income tax expense \t\tX"
        ]
      },
      {
        "title": "Revaluation of Non-Current Assets",
        "items": [
          "When a revaluation of a non-current asset takes place the carrying amount of the asset will change but the tax base will remain unaffected",
          "The difference between the carrying amount of a revalued asset and its tax base is an example of a temporary difference and will give rise to a deferred tax liability or asset",
          "Change in this deferred tax liability or asset created due to the revaluation should be shown in the OCI (then in revaluation surplus), rather than the statement of profit or loss",
          "Deferred tax should be recognised on the revaluation of property, plant and equipment even if:",
          "there is no intention to sell the asset",
          "any tax due on the gain made on any sale of the asset can be deferred by being ‘rolled over’ against the cost of a replacement asset."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "IAS 12 Income Taxes states that there are two elements of tax that need to be recognised in the financial statements:",
          "Current tax (the amount of tax payable/recoverable in respect of the taxable profit/loss for a period).",
          "Deferred tax (an accounting adjustment aimed to match the tax effects of transactions to the relevant accounting period).",
          "The income tax expense shown in the Statement of Profit or Loss is actually made up of three components as follows"
        ],
        "answer": 0
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Deferred tax (an accounting adjustment aimed to match the tax effects of transactions to the relevant accounting period).",
          "The income tax expense shown in the Statement of Profit or Loss is actually made up of three components as follows",
          "Current tax is the estimated amount of tax payable/ recoverable by a business to the tax authority in respect of the taxable profit/ loss for a period",
          "Current tax (the amount of tax payable/recoverable in respect of the taxable profit/loss for a period)."
        ],
        "answer": 3
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Current tax is the estimated amount of tax payable/ recoverable by a business to the tax authority in respect of the taxable profit/ loss for a period",
          "Income tax on businesses are calculated based on taxable profit, not based on profit before tax (accounting profit) shown in the P&L",
          "Deferred tax (an accounting adjustment aimed to match the tax effects of transactions to the relevant accounting period).",
          "The income tax expense shown in the Statement of Profit or Loss is actually made up of three components as follows"
        ],
        "answer": 2
      }
    ],
    "practice": [
      {
        "title": "Practice set",
        "question": "QUESTIONS 1 Tamsin Co’s accounting records shown the following: $ Income tax payable for the year 60,000 Over provision in relation to the previous year 4,500 Opening provision for deferred tax 2,600 Closing provision for deferred tax 3,200 What is the income tax expense that will be shown in the statement of profit or loss for the year? A $54,900 B $67,700 C $65,100 D $56,100 2 The following information has been extracted from the accounting records of Clara Co: $ Estimated income tax for the year ended 30 September 20X0 $75,000 Income tax paid for the year ended 30 September 20X0 $80,000 Estimated income tax for the year ended 30 September 20X1 $83,000 What figures will be shown in the statement of profit or loss for the year ended 30 September 20X1 and the statement of financial position as at that date in respect of income tax? Statement of profit or loss Statement of financial position Options: $75,000 $80,000 $83,000 $88,000 QUESTIONS 3 Hudson has the following balances included on its trial balance at 30 June 20X4. $ Taxation 4,000 Credit Deferred taxation 12,000 Credit The taxation balance relates to an overprovision from 30 June 20X3. At 30 June 20X4, the directors estimate that the provision necessary for taxation on current year profits is $15,000. The carrying amount of Hudson’s non‐current assets exceeds the tax written‐down value by $30,000. The rate of tax is 30%. What is the charge for taxation that will appear in the statement of profit or loss for the year to 30 June 20X4? A. 23,000 B. $28,000 C. $8,000 D. $12,000 4. The information below relates to the financial statements of an entity as at 30 September 20X7. $ Carrying amount: Plant (cost less depreciation) 110,000 Land (original cost $200,000) 280,000 Tax base: Plant 90,000 Land 200,000 Tax rate 20% Deferred tax liability 20,000 Revaluation surplus 64,000 The amount of the deferred tax liability is: CORRECT/INCORRECT The amount of the revaluation surplus is: CORRECT/INCORRECT QUESTIONS 5. Holmes has the following balances included on its trial balance at 30 June 20X4: $ Taxation 7,000 Credit Deferred taxation 16,000 Credit The taxation balance relates to an overprovision from 30 June 20X3. At 30 June 20X4, the directors estimate that the provision necessary for taxation on current year profits is $12,000. The balance on the deferred tax account needs to be increased to $23,000, which includes the impact of the increase in property valuation below. During the year Holmes revalued its property for the first time, resulting in a gain of $10,000. The rate of tax is 30%. What is the charge for taxation that will appear in the statement of profit or loss for the year to 30 June 20X4? A $9,000 B $12,000 C $23,000 D $1,000 Q1. A company’s financial statements show profit before tax of $1,000 in each of years 1, 2 and 3. This profit is stated after charging depreciation of $200 per annum, due to the purchase of an asset costing $600 in year 1, which is being depreciated over its 3-year useful life on a straight-line basis. The tax allowances granted for the asset are: Year 1 $240 Year 2 $210 Year 3 $150 Income tax is calculated as 30% of taxable profits. Apart from the above depreciation and tax allowances there are no other differences between the accounting and taxable profits. Required: Accounting for deferred tax, prepare statement of profit or loss and statement of financial position extracts for each of years 1, 2 and 3. QUESTIONS Q2. Required: Prepare Weiser’s statement of profit or loss and other comprehensive income, statement of changes in equity for the year ended 31 December 20X8, and a statement of financial position as at that date.",
        "answer": ""
      },
      {
        "title": "Practice set",
        "question": "QUESTIONS Q1. A company’s financial statements show profit before tax of $1,000 in each of years 1, 2 and 3. This profit is stated after charging depreciation of $200 per annum, due to the purchase of an asset costing $600 in year 1, which is being depreciated over its 3-year useful life on a straight-line basis. The tax allowances granted for the asset are: Year 1 $240 Year 2 $210 Year 3 $150 Income tax is calculated as 30% of taxable profits. Apart from the above depreciation and tax allowances there are no other differences between the accounting and taxable profits. Required: Accounting for deferred tax, prepare statement of profit or loss and statement of financial position extracts for each of years 1, 2 and 3. QUESTIONS Q2.",
        "answer": ""
      }
    ]
  },
  {
    "slug": "earnings-per-share",
    "title": "Earnings per Share",
    "standard": "IAS 33",
    "blocks": [
      {
        "title": "The scope of IAS 33",
        "items": [
          "IAS 33 applies to entities whose ordinary shares are publicly traded.",
          "Publicly traded entities which present both parent and consolidated financial statements are only required to present EPS based on the consolidated figures."
        ]
      },
      {
        "title": "Basic eps",
        "items": [
          "The basic EPS calculation is simply:",
          "EPS = Earnings / Shares",
          "This should be expressed as cents per share to 1 decimal place.",
          "Earnings: group profit after tax, less non-controlling interests (see group chapters) and irredeemable preference share dividends.",
          "Shares: weighted average number of ordinary shares in issue during the period.",
          "Earnings should be apportioned over the weighted average equity share capital (i.e. taking account of the date any new shares are issued during the year)."
        ]
      },
      {
        "title": "Trend in eps",
        "items": [
          "Although EPS is based on profit on ordinary activities after taxation, the trend in EPS may be a more accurate performance indicator than the trend in profit.",
          "EPS measures performance from the perspective of investors and potential investors and shows the amount of earnings available to each ordinary shareholder, so that it indicates the potential return on individual investments.",
          "Where an entity has increased its profits after issuing a large number of new ordinary shares, comparing the reported profits from year to year would not give a true picture. However, a more accurate indication of profitability would be obtained by examining the trend of EPS reported for each accounting period."
        ]
      },
      {
        "title": "Issue of shares at full market price",
        "items": [
          "Example",
          "An entity, with a year-end of 31 December 20X8, issued 200,000 shares at full market price of $3 on 1 July 20X8.",
          "Relevant information",
          "Required:",
          "Calculate the EPS for each of the years."
        ]
      },
      {
        "title": "Issue of shares at full market price",
        "items": [
          "Solution_ Calculation of EPS",
          "20X7 \t\tEarnings per share = $460,000/ 800,000 \t= 57,5¢",
          "Issue at full market price",
          "20X8 \t\tEarnings per share = $550,000/ 900,000 \t= 61.1¢",
          "Since the 200,000 shares have only generated additional resources towards the earning of profits for half a year, the number of new shares is adjusted proportionately. Note that the approach is to use the earnings figure for the period without adjustment, but divide by the average number of shares weighted on a time basis"
        ]
      },
      {
        "title": "BONUS ISSUE",
        "items": [
          "A bonus issue (or capitalisation issue or scrip issue):",
          "does not provide additional resources to the issuer",
          "means that the shareholder owns the same proportion of the business before and after the issue",
          "In the calculation of EPS:",
          "in the current year, the bonus shares are deemed to have been issued at the start of the year",
          "comparative figures are restated to allow for the proportional increase in share capital caused by the bonus issue. Doing this treats the bonus issue as if it had always been in existence.",
          "Note: If you have an issue of shares at full market price and a bonus issue, you apply a bonus fraction from the start of the year up to the date of the bonus issue. For example, if the bonus issue was 1 share for every 5 owned, the bonus fraction would be 6/5 (as everyone who had 5 shares now has 6)."
        ]
      },
      {
        "title": "BONUS SHARE ISSUE: EXAMPLE",
        "items": [
          "Question",
          "An entity makes a bonus issue of one new share for every five existing shares held on 1 July 20X8.",
          "Calculate the EPS in 20X8 accounts."
        ]
      },
      {
        "title": "BONUS SHARE ISSUE: EXAMPLE",
        "items": [
          "Solution",
          "In the 20X7 accounts, the EPS for the year would have appeared as 46¢ ($460,000 ÷ 1,000,000). In the example above, the computation has been reworked in full. However, to make the changes required it would be simpler to adjust the original EPS figure.",
          "Since the old calculation was based on dividing by 1,000,000 while the new is determined by using 1,200,000, it would be necessary to multiply the EPS by the first and divide by the second.",
          "The fraction to apply is, therefore:"
        ]
      },
      {
        "title": "Rights issue",
        "items": [
          "Rights issues present special problems:",
          "they contribute additional resources",
          "they are normally priced below full market price.",
          "Therefore they combine the characteristics of issues at full market price and bonus issues, and the calculation of shares in issue reflects this",
          "adjust for bonus element in rights issue, by multiplying capital in issue before the rights issue by the following fraction:",
          "Market price before issue",
          "Theoretical ex rights price",
          "calculate the weighted average capital in the issue as above."
        ]
      },
      {
        "title": "Rights issue: CALCULATION OF EPS",
        "items": [
          "Calculating EPS when there has been a rights issue can be done using a four-step process:",
          "Step 1 – Calculate theoretical ex-rights price (TERP)",
          "Start with the number of shares previously held by an individual at their market price. Then add in the number of new shares purchased at the rights price. You can then find the TERP by dividing the total value of these shares by the number held.",
          "For example, if there was a 1 for 3 rights issue for $3, and the market price before this was $5:",
          "3 shares @ $5 market price = $15",
          "1 new share @ $3 rights price = $3",
          "Therefore a shareholder now has 4 shares with a value of $18. The TERP is now $18/4 = $4.50"
        ]
      },
      {
        "title": "Rights issue: CALCULATION OF EPS",
        "items": [
          "Step 2 – Bonus Fraction",
          "Market price before issue",
          "Theoretical ex rights price",
          "In this example, the bonus fraction would therefore be 5/4.5",
          "Step 3 – Weighted average number of shares",
          "Draw up the usual table to calculate the weighted average number of shares. When doing this, the bonus fraction would be applied from the start of the year up to the date of the rights issue, but not afterwards.",
          "Step 4 – Earnings per share (EPS)",
          "Calculate earnings per share in the usual way:",
          "Profit after tax .",
          "Weighted average no. of shares"
        ]
      },
      {
        "title": "Rights issue: CALCULATION OF EPS",
        "items": [
          "Example - QUESTION",
          "In the year ended 31 December 20X6, there were 12 million ordinary shares in issue and the earnings per share was calculated as 33.3¢ per share. In the year ended 31 December 20X7 the earnings available for ordinary shareholders amounted to $5 million. The company made a one for five rights issue on 30 June 20X7 at a price of $1.50 and the cum rights price on the last day before the rights was $2.",
          "What is the EPS for the year ended 31 December 20X7 and the restated EPS for the year ended 31 December 20X6?"
        ]
      },
      {
        "title": "Rights issue: CALCULATION OF EPS",
        "items": [
          "Solution",
          "Step 1 – Calculate theoretical ex-rights price (TERP)",
          "Step 2 – Bonus Fraction",
          "Step 3 – Weighted average number of shares",
          "Step 4 – Earnings per share (EPS)"
        ]
      },
      {
        "title": "Diluted earnings per share (DEPS)",
        "items": [
          "Equity share capital may increase in the future due to circumstances which exist now. When it occurs, this increase in shares will reduce, or dilute, the earnings per share.",
          "The provision of a diluted EPS figure attempts to alert shareholders to the potential impact on EPS of these additional shares.",
          "Examples of dilutive factors are:",
          "the conversion terms for convertible bonds/convertible loans etc.",
          "the exercise price for options and the subscription price for warrants."
        ]
      },
      {
        "title": "DEPS: calculation",
        "items": [
          "adjust the basic earnings and number of shares assuming convertibles, options, etc. had converted to equity shares on the first day of the accounting period, or on the date of issue, if later.",
          "DEPS is calculated as follows:"
        ]
      },
      {
        "title": "Convertible instruments",
        "items": [
          "The principles of convertible bonds and convertible preference shares are similar and will be dealt with together.",
          "If the convertible bonds/preference shares had been converted:",
          "the interest/dividend would be saved therefore earnings would be higher",
          "the additional earnings would be subject to tax",
          "the number of shares would increase",
          "In the DEPS calculation always assume that the maximum possible number of shares will be issued."
        ]
      },
      {
        "title": "Convertible instruments: example",
        "items": [
          "QUESTION",
          "In the year ended 31 December 20X7, there were 12 million ordinary shares in issue, and the earnings available for ordinary shareholders amounted to $5 million. There are 1 million 10% $1 convertible loan notes in issue, convertible at the rate of 3 ordinary shares for every $4 of loan notes in the year ended 31 December 20X7. The rate of tax is 30%.",
          "What is the fully diluted EPS for the year ended 31 December 20X7?"
        ]
      },
      {
        "title": "Convertible instruments: example",
        "items": [
          "SOLUTION"
        ]
      },
      {
        "title": "Options and warrants to subscribe for shares",
        "items": [
          "An option or warrant gives the holder the right to buy shares at some time in the future at a predetermined price.",
          "Cash is received by the entity at the time the option is exercised, and the DEPS calculation must allow for this.",
          "The total number of shares issued on the exercise of the option or warrant is split into two:",
          "the number of shares that would have been issued if the cash received had been used to buy shares at fair value (using the average price of the shares during the period)",
          "the remainder, which are treated like a bonus issue (i.e. as having been issued for no consideration).",
          "The number of shares issued for no consideration is added to the number of shares when calculating the DEPS.",
          "A formula for DEPS with an option can be used to work out the number of free shares:"
        ]
      },
      {
        "title": "Options and warrantS: EXAMPLE",
        "items": [
          "Question",
          "On 1 January 20X7, a company has 4 million ordinary shares in issue and issues options for a further million shares. The profit for the year is $500,000.",
          "During the year to 31 December 20X7 the average fair value of one ordinary share was $3 and the exercise price for the shares under option was $2.",
          "Calculate basic EPS and DEPS for the year ended 31 December 20X7."
        ]
      },
      {
        "title": "Options and warrantS: EXAMPLE",
        "items": [
          "Solution",
          "$",
          "Earnings \t\t\t\t 500,000",
          "Number of shares Basic \t 4,000,000",
          "Options (W1) \t\t\t 333,333",
          "4,333,333",
          "(W1) Number of shares at option price",
          "Options \t= 1,000,000 × $2",
          "= $2,000,000",
          "At fair value $2,000,000/ $3 = 666,667",
          "Number issued free = 1,000,000 – 666,667 = 333,333 Or,",
          "using formula, number of free shares:",
          "1,000,000 × (3 – 2)/3 = 333,333"
        ]
      },
      {
        "title": "Price earnings ratio",
        "items": [
          "The EPS figure is used to compute the major stock market indicator of performance, the price earnings ratio (P/E ratio).",
          "The calculation is as follows:"
        ]
      },
      {
        "title": "Importance of DEPS",
        "items": [
          "DEPS is important for the following reasons:",
          "It shows what the current year’s EPS would be if all the dilutive potential ordinary shares in issue had been converted.",
          "It can be used to assess trends in past performance.",
          "In theory, it serves as a warning to equity shareholders that the return on their investment may fall in future periods."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "IAS 33 applies to entities whose ordinary shares are publicly traded.",
          "Publicly traded entities which present both parent and consolidated financial statements are only required to present EPS based on the consolidated figures.",
          "The basic EPS calculation is simply:",
          "This should be expressed as cents per share to 1 decimal place."
        ],
        "answer": 0
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "The basic EPS calculation is simply:",
          "This should be expressed as cents per share to 1 decimal place.",
          "Earnings: group profit after tax, less non-controlling interests (see group chapters) and irredeemable preference share dividends.",
          "Publicly traded entities which present both parent and consolidated financial statements are only required to present EPS based on the consolidated figures."
        ],
        "answer": 3
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Earnings: group profit after tax, less non-controlling interests (see group chapters) and irredeemable preference share dividends.",
          "Shares: weighted average number of ordinary shares in issue during the period.",
          "The basic EPS calculation is simply:",
          "This should be expressed as cents per share to 1 decimal place."
        ],
        "answer": 2
      }
    ],
    "practice": [
      {
        "title": "Practice set",
        "question": "QUESTIONS Q1. An entity had 1 million shares in issue on 1 January 20X1. They issued 200,000 shares at market value on 1 April 20X1, followed by a 1 for 5 bonus issue on 1 August 20X1, with a further 300,000 issued at market value on 1 October 20X1. If profit for the year ending 31 December 20X1 is $220,000, what is the basic earnings per share? Q2. On 31 December 20X1, the issued share capital consisted of 4,000,000 ordinary shares of 25¢ each. On 1 July 20X2 the entity made a rights issue in the proportion of 1 for 4 at 50¢ per share and the shares were quoted immediately before the issue at $1. Its trading results for the last two years were as follows: Show the calculation of basic EPS to be presented in the financial statements for the year ended 31 December 20X2 (including comparative). Q3.  On 1 April 20X1, an entity issued a convertible loan note of $1,250,000. The loan note carries an effective interest rate of 8%. Each $100 nominal of the loan stock will be convertible in 20X6/20X9 into the number of ordinary shares set out below:  On 31 December 20X6 124 shares.  On 31 December 20X7 120 shares.  On 31 December 20X8 115 shares.  On 31 December 20X9 110 shares. Relevant information Issued share capital: o $500,000 in 10% cumulative irredeemable preference shares of $1. o $1,000,000 in ordinary shares of 25c = 4,000,000 shares. o The rate of tax is 30%. Trading results for the years ended 31 December were as follows QUESTIONS Q4. A company had 8.28 million shares in issue at the start of the year and made no new issue of shares during the year ended 31 December 20X4, but on that date it had in issue $2,300,000 convertible loan stock 20X6-20X9. The loan stock carries an effective rate of 10%. Assume an income tax rate of 30%. The earnings for the year were $2,208,000. This loan stock will be convertible into ordinary $1 shares as follows.  20X6 90 $1 shares for $100 nominal value loan stock  20X7 85 $1 shares for $100 nominal value loan stock  20X8 80 $1 shares for $100 nominal value loan stock  20X9 75 $1 shares for $100 nominal value loan stock Calculate the diluted earnings per share for the year ended 31 December 20X4. Q5. A company had 8.28 million shares in issue at the start of the year and made no issue of shares during the year ended 31 December 20X4, but on that date there were outstanding options to purchase 920,000 ordinary $1 shares at $1.70 per share. The average fair value of ordinary shares was $1.80. Earnings for the year ended 31 December 20X4 were $2,208,000. Calculate the diluted earnings per share for the year ended 31 December 20X4.",
        "answer": ""
      }
    ]
  },
  {
    "slug": "provisions-contingencies-events",
    "title": "Provisions, Contingencies & Events After the Reporting Period",
    "standard": "IAS 37 / IAS 10",
    "blocks": [
      {
        "title": "IAS 10: Events after the Reporting Period",
        "items": [
          "Events after the reporting period covered by IAS 10 are those events, both favorable and unfavorable, which occur between the",
          "a) reporting date and",
          "b) the date on which the financial statements are authorized for issue by the board of directors",
          "Events after Reporting Period Reporting Period - 2020 covered by IAS 10",
          "Start of the                               End of the Reporting        Financial Statements are   Shareholder AGM",
          "Reporting Period                                    Period                authorized for issue by    June 30 2021",
          "Dec 31, 2020                Board of Directors",
          "Jan 01, 2020 May 31, 2021 Reporting Date"
        ]
      },
      {
        "title": "Adjusting and Non-Adjusting Events",
        "items": [
          "Events after the Reporting Period",
          "Adjusting events                               Non-adjusting events",
          "Adjusting events are events after the          Non-adjusting events are events after the",
          "reporting date which provide additional        reporting date which concern conditions that",
          "evidence of conditions that existed at the     arose after the reporting date",
          "reporting date Financial Statements are not adjusted for non -",
          "Financial Statements are adjusted for          adjusting Events",
          "Adjusting Events But note that while they may be non-adjusting, events that are material should be disclosed in the notes to the financial statements"
        ]
      },
      {
        "title": "Adjusting Events: Detailed Example",
        "items": [
          "• On 28 February 20X1 an entity’s financial statements for the year ended 31 December 20X0 were authorised for issue.",
          "• The entity sells some products on credit to a customer before 31 December 20X0. At 31 December 20X0 the entity’s management had no doubt about the customer’s ability to pay the outstanding trade receivable of USD 200,000.",
          "• However, in February 20X1, during the process of finalising the financial statements, the entity is informed that the customer is going into liquidation because it has significant debt, has virtually no cash inflows, and its accounting records are poorly maintained. Because of this, the trade receivables are deemed worthless.",
          "• A full allowance for bad debts of USD 200,000 should be made against the trade receivable giving a corresponding loss of USD 200,000 in profit or loss. A custstomer’s bankruptcy after the year-end will, in nearly all cases, be the cumulative effect of a sequence of events that started before year-end, indicating that the trade receivable was impaired as at 31 December 20X0."
        ]
      },
      {
        "title": "Adjusting Events Examples",
        "items": [
          "• Sale of inventory after the end of the reporting period for less than cost at the year end",
          "• Insolvency of a customer with a balance owing at the year end",
          "• Amounts received or paid in respect of legal or insurance claims which were in negotiation at the year end",
          "• Determination after the year end of the sale or purchase price of assets sold or purchased before the year end",
          "• Evidence of a permanent decrease in the value of a long-term investment prior to the year end",
          "• Evidence of a permanent decrease in property value prior to the year end",
          "• Discovery of fraud or errors that show that the financial statements are incorrect"
        ]
      },
      {
        "title": "Non - Adjusting Events Examples",
        "items": [
          "• Destruction of a production plant by fire after the end of the reporting period",
          "• Value of an investment falls between the reporting date and the date the financial statements are authorised",
          "• Acquisition of, or disposal of, a subsidiary after the year end",
          "• Announcement of a plan to discontinue an operation",
          "• Major purchases and disposals of assets",
          "• Announcement or commencing implementation of a major restructuring",
          "• Share transactions after the end of the reporting period",
          "• Litigation commenced after the end of the reporting period"
        ]
      },
      {
        "title": "Dividends",
        "items": [
          "• A company’s obligation to pay dividend is only created when dividends are approved/ declared, therefore if dividends are approved/ declared after the reporting date no obligation exists at the reporting date.",
          "• Equity dividends proposed before, but approved/declared and paid after the reporting date may not be included as liabilities at the reporting date as no obligation to pay dividends exist at the reporting date.",
          "• However, proposed dividends are disclosed in the notes to the financial statements",
          "Proposed dividend – amount of dividends recommended by the directors Declared dividend – the amount of dividends approved by the shareholders to be paid"
        ]
      },
      {
        "title": "Material Non-adjusting events",
        "items": [
          "• Where non-adjusting events after the reporting date are of such importance that non- disclosure would affect the ability of the users of the financial statements to make proper evaluations and decisions, an entity should disclose the following information for each non-adjusting event after the reporting date:",
          "• The nature of the event",
          "• An estimate of its financial effect, or a statement that such an estimate cannot be made"
        ]
      },
      {
        "title": "Going Concern",
        "items": [
          "• Financial statements are normally prepared on the going concern basis.",
          "• If an event after the reporting date indicates that the going concern assumption is inappropriate for the entity, then the financial statements should not be prepared on going concern basis",
          "• In such a situation the financial statements are prepared on a breakup basis"
        ]
      },
      {
        "title": "IAS 37: Provisions, Contingent Liabilities and",
        "items": [
          "Contingent Assets     Malindu Udawatta"
        ]
      },
      {
        "title": "What is a Provision?",
        "items": [
          "• A provision is a liability of uncertain timing or amount",
          "• The IAS distinguishes provisions from other liabilities such as trade creditors and accruals. This is on the basis that for a provision there is uncertainty about the timing or amount of the future expenditure",
          "• Applicable accounting standard – IAS 37: Provisions, Contingent Liabilities and Contingent Assets"
        ]
      },
      {
        "title": "Recognition of Provisions",
        "items": [
          "• IAS 37 states that a provision should be recognised as a liability in the financial statements when:",
          "1. 1 An entity has a present obligation (legal or constructive) as a result of a past event",
          "2. 2 It is probable that an outflow of resources embodying economic benefits will be required to settle the obligation",
          "3. 3 A reliable estimate can be made of the amount of the obligation"
        ]
      },
      {
        "title": "1      Present Obligation",
        "items": [
          "• Present obligation can a be a legal obligation or a constructive obligation",
          "• Legal obligation is an obligations that arises due to a law. Eg. Contract or government rules",
          "• IAS 37 defines a constructive obligation as: A constructive obligation arises when an entity has created a valid expectation in other parties that it will carry out an action due to:",
          "• An established pattern of past practice or",
          "• Sufficiently specific communication to affected parties For instance, an oil company may have an established practice of always cleaning any environmental damage caused by drilling, even though it is not legally obliged to do so. In this way, it has created a valid expectation that it will do this and it will have to recognise the constructive obligation and make a corresponding provision each time it drills a new well."
        ]
      },
      {
        "title": "2      Probable Transfer of Resources",
        "items": [
          "• Transfer of resources embodying economic benefits is regarded as 'probable' if the event is more likely than not to occur.",
          "• This appears to indicate a probability of more than 50%.",
          "• However, the standard makes it clear that where there is a number of similar obligations the probability should be based on considering the population as a whole, rather than one single item. If a company has entered into a warranty obligation then the probability of transfer of resources embodying economic benefits may well be extremely small in respect of one specific item. However, when considering the population as a whole the probability of some transfer of resources is quite likely to be much higher. If there is a greater than 50% probability of some transfer of economic benefits then a provision should be made for the expected amount."
        ]
      },
      {
        "title": "3     Measurement of Provisions",
        "items": [
          "• The amount recognised as a provision should be the best estimate of the expenditure required to settle the present obligation at the end of the reporting period.",
          "• The estimates will based on management judgement and experience",
          "• There are two ways to measure the amount based on nature of the provision",
          "• The obligation is estimated by weighting all possible",
          "Large no. of     outcomes by their respective probabilities, i.e. expected",
          "similar items     value.",
          "E.g. – Warranty provision",
          "• Provision is made in full for the most likely outcome Single item",
          "E.g. – A legal case"
        ]
      },
      {
        "title": "Examples: Large No. of Items",
        "items": [
          "• X Ltd sells goods with a warranty under which customers can cover the cost of repairs of any manufacturing defect that arise within the first 12 months of purchase. The company's past experience and future expectations indicate the following pattern of likely repairs",
          "% of goods sold         Nature of the defect         Cost of repairing if all items have",
          "these defects (USD Mn)",
          "75%                     None                         0",
          "20%                     Minor defects                2.0",
          "5%                      Major defects                8.0",
          "What is the amount of the provision?",
          "The cost is found using 'expected values' (75% * USD 0) + (20% * USD 2.0m) + (5% * Rs",
          "8.0m) = USD 800,000."
        ]
      },
      {
        "title": "Examples: Single Item",
        "items": [
          "• An entity has to repair a defect in a building that it has constructed for a customer. The individual most likely outcome is that the repair will succeed at the first attempt at a cost of USD. 800,000, but there is a chance that further repairs will be necessary, increasing the total cost to USD 1,000,000.",
          "• What amount of provision should be recognised?",
          "Solution",
          "• A provision for USD 800,000 is recognised.",
          "• This is because the best estimate of the liability is its most likely outcome, not the worst- case scenario."
        ]
      },
      {
        "title": "Provisions: General Facts",
        "items": [
          "• Where the effect of the time value of money is material (if the expenditure is expected to be incurred after 12 months from the balance sheet date), the amount of a provision should be the present value of the expenditure required to settle the obligation.",
          "• An appropriate discount rate should be used. The discount rate should be a pre-tax rate that reflects current market assessments of the time value of money."
        ]
      },
      {
        "title": "Provision: Double Entry",
        "items": [
          "• When a provision is created for the first time, the following double entry is used",
          "Dr Relevant expense account/ asset account Cr Provision",
          "• The relevant expense account is debited for a provision like warranty provision, an asset account is debited for provisions like cleanup cost provision in respect of PPE"
        ]
      },
      {
        "title": "Changes in Provision",
        "items": [
          "• Provisions should be reviewed at the end of each reporting period and adjusted to reflect the current best estimate.",
          "Increase in provision: Dr Relevant expense account Cr Provision",
          "Decrease in provision: Dr Provision Cr Relevant expense account"
        ]
      },
      {
        "title": "Use of a Provision",
        "items": [
          "• Once a provision is made, it can be used set off expenses paid for which the provision was created as follows:",
          "Dr Provision           XXX",
          "Cr Cash                XXX",
          "• A provision should be used only for expenditures for which the provision was originally recognised.",
          "• At the reporting date, a provision should be reversed if it is no longer probable that an outflow of economic benefits will be required to settle the obligation."
        ]
      },
      {
        "title": "Contingent Liabilities",
        "items": [
          "• IAS 37 defines a contingent liability as:",
          "1. A possible obligation that arises from past events and whose existence will be confirmed only by the occurrence or non-occurrence of one or more uncertain future events not wholly within the control of the entity",
          "E.g - if an entity is jointly and individually liable for an obligation, then the portion of the obligation that is expected to be met by other parties",
          "2. A present obligation that arises from past events but is not recognized because:",
          "✓ It is not probable that an outflow of resources embodying economic benefits will be required to settle the obligation; or",
          "✓ The amount of the obligation cannot be measured with sufficient reliability.",
          "E.g - An example is a claim against an entity, when the entity concludes that it is liable, but that it is likely to defend the case successfully."
        ]
      },
      {
        "title": "Treatment of Contingent Liabilities",
        "items": [
          "• As a rule of thumb, probable means more than 50% likely. If an obligation is probable, it is not a contingent liability – instead, a provision is needed.",
          "• Contingent liabilities should not be recognised in financial statements but they should be disclosed. The required disclosures are:",
          "1. A brief description of the nature of the contingent liability",
          "2. An estimate of its financial effect",
          "3. An indication of the uncertainties that exist",
          "4. The possibility of any reimbursement",
          "• If the likelihood of outflow of resources embodying economic benefits is remote (very low), no disclosure needs to be made for contingent liabilities"
        ]
      },
      {
        "title": "Accounting for Contingent Liabilities",
        "items": [
          "0%            5%                          50%                      95%               100%",
          "Remote                  Possible                    Probable             Virtually Certain",
          "0% - 5%                 5% - 50%                   50% - 95%               95% - 100%",
          "Ignore            Contingent Liability         Make a Provision    Recognize a Liability",
          "No Disclosure         Disclose in Notes",
          "Likelihood of an outflow"
        ]
      },
      {
        "title": "Contingent Assets",
        "items": [
          "• IAS 37 defines a contingent asset as: A possible asset that arises from past events and whose existence will be confirmed by the occurrence or non-occurrence of one or more uncertain future events not wholly within control of the entity.",
          "E.g - A lawsuit filed by Company A against a competitor for violating Company A’s copyrights. Even if it is probable (but not certain) that Company A will win the lawsuit, it is a contingent asset",
          "Treatment of Contingent Assets",
          "• A contingent asset must not be recognised.",
          "• Only when the realisation of the related economic benefits is virtually certain should recognition take place. At that point, the asset is no longer a contingent asset!"
        ]
      },
      {
        "title": "Contingent Assets",
        "items": [
          "Disclosure: contingent assets",
          "• Contingent assets must only be disclosed in the notes if they are probable.",
          "• In that case a brief description of the contingent asset should be provided along with an estimate of its likely financial effect."
        ]
      },
      {
        "title": "Accounting for Contingent Assets",
        "items": [
          "0%          5%                   50%                       95%             100%",
          "Remote           Possible                Probable          Virtually Certain",
          "0% - 5%          5% - 50%               50% - 95%            95% - 100%",
          "Ignore           Ignore             Contingent Asset     Recognize an Asset",
          "No Disclosure    No Disclosure         Disclose in Notes",
          "Likelihood of an inflow"
        ]
      },
      {
        "title": "Future Operating Losses",
        "items": [
          "• To recognize a liability/ provision, one of the main requirements is: “An entity has a present obligation as a result of a past event”",
          "• Therefore, no provision may be made for future operating losses or repairs because they arise in the future and the company has no present obligation arising from a past event",
          "• These losses/repairs can be avoided (close the division that is making losses or sell the asset that may need repair) and therefore no obligation exists"
        ]
      },
      {
        "title": "Onerous Contracts",
        "items": [
          "• An onerous contract is a contract in which the unavoidable costs of meeting the obligations under the contract exceed the economic benefits expected to be received under it",
          "Unavoidable costs          Economic benefits",
          "of meeting the obligation",
          ">        expected to be",
          "received",
          "Onerous Leases",
          "• An onerous lease is a lease that is onerous i.e. a lease where the unavoidable costs under the lease exceed the economic benefits expected to be gained from the lease",
          "• E.g. If a building leased by a company is no longer required for business activities and the company can not find anyone to sublease/sublet the premises to, the lease contract can become onerous. This is because company will have to keep paying regular lease payments (if the lease can’t be cancelled) and will not get any economic benefits because its not used in business activities nor subleased"
        ]
      },
      {
        "title": "Onerous Contracts",
        "items": [
          "• If an entity has an onerous contract, a provision should be recognised for the present obligation under the contract. The provision is measured at the lower of:",
          "• the cost of fulfilling the contract, or",
          "• the cost of terminating it and suffering any penalties.",
          "• The costs required to fulfil a contract include incremental costs (such as materials and direct labour) as well as the allocation of other necessary costs (such as a proportion of the depreciation charge for an item of property, plant and equipment used to fulfil the contract).",
          "• Some assets may have been bought specifically for use in fulfilling the onerous contract. These should be reviewed for impairment before any separate provision is made for the contract itself."
        ]
      },
      {
        "title": "Future repairs to assets",
        "items": [
          "• Some assets need to be repaired or to have parts replaced every few years. For example, an airline may be required by law to overhaul all its aircraft every three years.",
          "• Provisions cannot normally be recognised for the cost of future repairs or replacement parts. This is because there is no current obligation to incur the expense – even if the future expenditure is required by law, the entity could avoid it by selling the asset.",
          "TUU 3 & 4"
        ]
      },
      {
        "title": "Environmental Provisions",
        "items": [
          "• A provision will be made for future environmental costs, if there is either a legal or constructive obligation to clean-up the damage to the environment",
          "• If the cost will be incurred in the future, estimate of the future clean-up cost needs to be discounted to present value. Discount rate to use is a pre-tax market interest rate",
          "• A provision can only be set up to rectify environmental damage that has already happened. There is no obligation to restore future environmental damage because the entity could cease its operations.",
          "• Merely causing damage or intending to clean-up a site does not create an obligation.",
          "• An entity may have a constructive obligation to repair environmental damage if it publicises policies that include environmental awareness or explicitly undertakes to clean up the damage caused by its operations."
        ]
      },
      {
        "title": "Environmental Provisions",
        "items": [
          "• The full cost of an environmental provision should be recognised as soon as the obligation arises.",
          "• The effect of the time value of money is usually material. Therefore, an environmental provision is normally discounted to its present value.",
          "• If the expenditure results in future economic benefits then an equivalent asset can be recognised. This is depreciated over its useful life, which is the same as the ‘life’ of the provision.",
          "• Double entry to initially recognize the environment provision is:",
          "Dr Non-current Asset         (PV of the future clean-up cost)",
          "Cr Environment Provision     (PV of the future clean-up cost)",
          "• Each year, the discount should be unwounded and a finance cost recognized:",
          "Dr Finance Cost              (Opening balance of the environment provision * Discount rate)",
          "Cr Environment Provision     (Opening balance of the environment provision * Discount rate)",
          "TUU 3 & 6"
        ]
      },
      {
        "title": "Provisions for Restructuring",
        "items": [
          "IAS 37 defines a restructuring as: A programme that is planned and is controlled by management and materially changes one of two things.",
          "1. The scope of a business undertaken by an entity",
          "2. The manner in which that business is conducted",
          "IAS 37 says that a restructuring could include:",
          "• the closure or sale of a line of business",
          "• the closure of business locations in a country",
          "• the relocation of business activities from one country to another."
        ]
      },
      {
        "title": "Provisions for Restructuring: Recognition",
        "items": [
          "• A restructuring provision can only be recognised where an entity has a constructive obligation to carry out the restructuring.",
          "• A board decision alone does not create a constructive obligation. IAS 37 states that a constructive obligation exists only if:",
          "1. An entity must have a detailed formal plan for the restructuring and",
          "2. It must have raised a valid expectation in those affected that it will carry out the restructuring by starting to implement that plan or announcing its main features to those affected by it",
          "• A mere management decision is not normally sufficient.",
          "• Management decisions may sometimes trigger recognition, but only if earlier events such as negotiations with employee representatives and other interested parties have been concluded subject only to management approval."
        ]
      },
      {
        "title": "Restructuring Provision: Costs to Include",
        "items": [
          "• The IAS states that a restructuring provision should include only the direct expenditures arising from the restructuring, which are those that are both:",
          "1. Arising directly as a result of the restructuring and",
          "2. Not associated with the ongoing activities of the entity.",
          "• Following costs can be included within restructuring provision",
          "1. employee termination benefits that relate directly to the restructuring",
          "2. contract termination costs",
          "3. onerous contract provisions",
          "4. consulting fees that relate directly to the restructuring"
        ]
      },
      {
        "title": "Restructuring Provision: Costs not to Include",
        "items": [
          "The following costs should specifically not be included within a restructuring provision.",
          "1. retraining and relocating staff",
          "2. marketing products",
          "3. expenditure on new systems",
          "4. future operating losses (unless these arise from an onerous contract)",
          "5. profits on disposal of assets. The amount recognised should be the best estimate of the expenditure required and it should take into account expected future events. This means that expenses should be measured at their actual cost, where this is known, even if this was only discovered after the reporting date (this is an adjusting event after the reporting period per IAS 10).",
          "TUU 7&8"
        ]
      },
      {
        "title": "Criticism of IAS 37",
        "items": [
          "• Judgement – provisions are estimated liabilities and IAS 37 requires the exercise of judgement. This may increase the risk of bias and reduce comparability between entities.",
          "• Inconsistent – before recognising a provision, an entity must assess if the outflow of economic benefits is probable. This is inconsistent with other standards, such as IFRS 9 Financial Instruments.",
          "• Out-dated – IAS 37 was issued many years ago and does not reflect the current thinking of the International Accounting Standards Board.",
          "• Best estimates – provisions for single obligations are recognised at the ‘best estimate’ of the expenditure that will be incurred, but guidance in this area is lacking."
        ]
      },
      {
        "title": "Criticism of IAS 37",
        "items": [
          "• Types of costs – IAS 37 does not specify what types of costs should be included when measuring a provision. For example, some entities include legal costs within provisions, but others do not.",
          "• Risk – IAS 37 states that entities may need to make a risk adjustment to provisions, but it does not explain when to do this or how to calculate the adjustment.",
          "• Contingent assets – these are not recognised unless the inflow of benefits is ‘virtually certain’. There is a lack of guidance about the meaning of ‘virtually certain’.",
          "• Timing – there can be timing differences between when one entity recognises a contingent liability and when the other entity recognises a contingent asset.",
          "• Contradictory guidance. IAS 37 defines an obligating event as one where the entity has no realistic alternative but to settle the obligation. However, the standard also states that no provision should be recognized if the liability can be avoided by future actions – even if those actions are unrealistic (e.g. a change in the nature of the entity’s operations)."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Events after the reporting period covered by IAS 10 are those events, both favorable and unfavorable, which occur between the",
          "the date on which the financial statements are authorized for issue by the board of directors",
          "Adjusting events are events after the reporting date which provide additional evidence of conditions that existed at the reporting date",
          "Financial Statements are adjusted for Adjusting Events"
        ],
        "answer": 0
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Adjusting events are events after the reporting date which provide additional evidence of conditions that existed at the reporting date",
          "Financial Statements are adjusted for Adjusting Events",
          "Non-adjusting events are events after the reporting date which concern conditions that arose after the reporting date",
          "the date on which the financial statements are authorized for issue by the board of directors"
        ],
        "answer": 3
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Non-adjusting events are events after the reporting date which concern conditions that arose after the reporting date",
          "Financial Statements are not adjusted for non - adjusting Events",
          "Adjusting events are events after the reporting date which provide additional evidence of conditions that existed at the reporting date",
          "Financial Statements are adjusted for Adjusting Events"
        ],
        "answer": 2
      }
    ],
    "practice": [
      {
        "title": "Practice set",
        "question": "IAS 37 & IAS 10 | OTQ 1. AP has the following two legal claims outstanding:  A legal action claiming compensation of $500,000 filed against AP in March 20X4.  A legal action taken by AP against a third party, claiming damages of $200,000, which was started in January 20X3 and is nearing completion. In both cases, it is more likely than not that the amount claimed will have to be paid. How should AP report these legal actions in its financial statements for the year ended 31 March 20X5? Allocate the correct treatment against each of the cases. Options: 2. Which of the following would require a provision for a liability to be created by BW at its reporting date of 31 October 20X5? A. The government introduced new laws on data protection which come into force on 1 January 20X6. BW’s directors have agreed that this will require a large number of staff to be retrained. At 31 October 20X5, the directors were waiting on a report they had commissioned that would identify the actual training requirements. B. At the year‐end BW is negotiating with its insurance provider about an outstanding insurance claim. On 20 November 20X5, the provider agreed to pay $200,000. C. BW makes refunds to customers for any goods returned within 30 days of sale, and has done so for many years. D. A customer is suing BW for damages alleged to have been caused by BW’s product. BW is contesting the claim and at 31 October 20X5 the directors have been advised by BW’s legal advisers that it is very unlikely to lose the case. 3. Using the requirements set out in IAS 10 Events after the Reporting Period, which of the following would be classified as an adjusting event after the reporting period in financial statements ended 31 March 20X4 that were approved by the directors on 31 August 20X4? A. A reorganisation of the enterprise, proposed by a director on 31 January 20X4 and agreed by the Board on 10 July 20X4. B. A strike by the workforce which started on 1 May 20X4 and stopped all production for 10 weeks before being settled. C. The receipt of cash from a claim on an insurance policy for damage caused by a fire in a warehouse on 1 January 20X4. The claim was made in January 20X4 and the amount of the claim had not been recognised at 31 March 20X4 as it was uncertain that any money would be paid. The insurance enterprise settled with a payment of $1.5 million on 1 June 20X4. D. The enterprise had made large export sales to the USA during the year. The year‐end receivables included $2 million for amounts outstanding that were due to be paid in US dollars between 1 April 20X4 and 1 July 20X4. By the time these amounts were received, the exchange rate had moved in favour of the enterprise. IAS 37 & IAS 10 | OTQ 4. Target is preparing its financial statements for the year ended 30 September 20X7. Target is facing a number of legal claims from its customers with regards to a faulty product sold. The total amount being claimed is $3.5 million. Target’s lawyers say that the customers have an 80% chance of being successful. According to IAS 37 Provisions, Contingent Liabilities and Contingent Assets, what amount, if any, should be recognised in respect of the above in Target’s statement of financial position as at 30 September 20X7? $_____________,000 5. ABC has a year end of 31 December 20X4. On 15 December 20X4 the directors publicly announced their decision to close an operating unit and make a number of employees redundant. Some of the employees currently working in the unit will be transferred to other operating units within ABC. The estimated costs of the closure are as follows: What is the closure provision that should be recognised? A. $800,000 B. $1,000,000 C. $1,400,000 D. $1,700,000 6. On 1 October 20X3, Xplorer commenced drilling for oil in an undersea oilfield. The extraction of oil causes damage to the seabed which has a restorative cost (ignore discounting) of $10,000 per million barrels of oil extracted. Xplorer extracted 250 million barrels of oil in the year ended 30 September 20X4. Xplorer is also required to dismantle the drilling equipment at the end of its five‐year licence. This has an estimated cost of $30 million on 30 September 20X8. Xplorer’s cost of capital is 8% per annum and $1 has a present value of 68 cents in five years’ time. What is the total provision (extraction plus dismantling) which Xplorer would report in its statement of financial position as at 30 September 20X4 in respect of its oil operations? A. $34,900,000 B. $24,532,000 C. $22,900,000 D. $4,132,000 IAS 37 & IAS 10 | OTQ 7. Which TWO of the following events which occur after the reporting date of an entity but before the financialstatements are authorised for issue are classified as ADJUSTING events in accordance with IAS 10 Events after the Reporting Period? A. A change in tax rate announced after the reporting date, but affecting the current tax liability B. The discovery of a fraud which had occurred during the year C. The determination of the sale proceeds of an item of plant sold before the year end D. The destruction of a factory by fire 8. Each of the following events occurred after the reporting date of 31 March 20X5, but before the financial statements were authorised for issue. Identify whether the events would represent adjusting or non‐adjusting events. 9. In a review of its provisions for the year ended 31 March 20X5, Cumla’s assistant accountant has suggested the following accounting treatments: (i) A provision for one third of the cost of replacing an oven lining, which requires replacing every three years for technical reasons, and was last replaced on 1 April 20X4. (ii) The partial reversal (as a credit to the statement of profit or loss) of the accumulated depreciation provision on an item of plant because the estimate of itsremaining useful life has been increased by three years. (iii) Providing $1 million for deferred tax at 25% relating to a $4 million revaluation of property during March 20X5 even though Cumla has no intention of selling the property in the near future. Which of the above suggested treatments of provisions is/are permitted by IFRS Standards? A. (i) only B. (i) and (ii) C. (ii) and (iii) D. (iii) only 10. Identify whether the statements below are true or false: IAS 37 & IAS 10 | OTQ 11. Fauberg owns a number of offices in country Y and is in the process of finishing its financial statements for the year ended 31 December 20X4. In December 20X4, country Y announced changes to health and safety regulations, meaning that Fauberg’s air conditioning units will have to be replaced by 30 June 20X5. This is estimated to cost Fauberg $500,000. Fauberg has a history of compliance with regulations and intends to do the work by June 20X5. Which of the conditions for a provision will be met at 31 December 20X4? 12. Which TWO of the following statements about provisions are true? A. Future operating losses cannot be provided for B. Changes in provisions should be applied retrospectively, adjusting the prior year financial statements C. Provisions should be accounted for prudently, reflecting the maximum that could possibly be paid out D. Provisions should be discounted to present value if the effect of the time value of money is material",
        "answer": "IAS 37 & IAS 10 | OTQ ANS 1. The legal action against AP has a probable outflow, so AP should make a provision. The legal action taken by AP is a contingent asset. As it is probable, it should be disclosed in a note. Assets should only be recognised when there is a virtually certain inflow. 2. C A provision is only required when there is a present obligation arising as a result of a past event, it is probable that an outflow of resources embodying economic benefits will be required to settle the obligation, and a reliable estimate can be made of the amount. Only answer C meets all these criteria. Answer A is incorrect because the obligation does not exist at the reporting date and also cannot be reliably measured at present. Answer B is an example of an adjusting event after the reporting date as it provides evidence of conditions existing at the reporting. Answer D is a contingent liability. However, as its likelihood is remote no provision is necessary. 3. C The warehouse fire is an adjusting event as it occurred before the reporting date. Settlement of the insurance claim should therefore be included in the financial statements. The other events are non‐adjusting as they occurred after the reporting date and do not provide evidence of conditions existing at the reporting date. Issue B is a brand new event, and therefore should not be adjusted. As it is clearly material the event should be disclosed in the notes to the accounts. 4. $3,500,000 Per IAS 37 Provisions, Contingent Liabilities and Contingent Assets, the amount payable relates to a past event (the sale of faulty products) and the likelihood of payout is probable (i.e. more likely than not). Hence, the full amount of the payout should be provided for. 5. B The costs associated with ongoing activities (relocation and retraining of employees) should not be provided for. 6. B Extraction provision at 30 September 20X4 is $2.5 million (250 × 10). Dismantling provision at 1 October 20X3 is $20.4 million (30,000 × 0.68). This will increase by an 8% finance cost by 30 September 20X4 = $22,032,000. Total provision is $24,532,000. 7. B, C The change in tax rate and the fire will be non‐adjusting events asthe conditions did not exist at the reporting date. IAS 37 & IAS 10 | OTQ ANS 8. A board decision to discontinue an operation does not create a liability. A provision can only be made on the announcement of a formal plan (as it then raises a valid expectation that the action will be carried out). As this announcement occurs during the year ended 31 March 20X6, this a non‐adjusting event for the year ended 31 March 20X5. The insurance claim was in existence at the year end, so this will be an adjusting event as it provides further evidence of conditions in existence. 9. D Deferred tax relating to the revaluation of an asset must be provided for even if there is no intention to sell the asset, in accordance with IAS 12 Income Taxes. At 31 March 20X5 there is no present obligation to replace the oven lining, so no provision should be accounted for. A change in estimated useful life is a change in accounting estimate and should therefore be accounted for prospectively rather than retrospectively. 10. Both are false. IAS 10 Events After the Reporting Period covers the period from the reporting date up to the date the financial statements are authorised for issue. Only material non‐ adjusting events need to be disclosed as notes in the financial statements. 11. Whilst there is an estimate of $500,000 and it is probable that Faubourg will make the changes, there is no present obligation at 31 December 20X4. If Faubourg changes its mind and sells the building prior to June 20X5, no obligation would arise. Future obligations are not accounted for as provisions. 12. A, D Changes in provisions are regarded as changes in accounting estimates so should be accounted for prospectively rather than retrospectively. Provisions should be recorded at the best estimate, reflecting the amount most likely to be paid out, rather than the highest possible liability."
      }
    ]
  },
  {
    "slug": "statement-of-cash-flows",
    "title": "Statement of Cash Flows",
    "standard": "IAS 7",
    "blocks": [
      {
        "title": "Objective of the statement of cash flows",
        "items": [
          "The objective of IAS 7 Statement of Cash Flows is:",
          "to ensure that all entities provide information about the historical changes in cash and cash equivalents by means of a statement of cash flows",
          "to classify cash flows (i.e. inflows and outflows of cash and cash equivalents) during the period between those arising from operating, investing and financing activities.",
          "One reason why the statement of cash flows was considered necessary is that final profit figures are relatively easy to manipulate. There are many items in a statement of profit or loss whose measurement involves the use of judgement:",
          "inventory valuation",
          "depreciation",
          "allowance for receivables."
        ]
      },
      {
        "title": "BENEFITS & LIMITATIONS OF statement of cash flows",
        "items": [
          "Cash flows cannot be manipulated easily and are not affected by judgement or by accounting policies.",
          "The accruals or matching concept applied in preparing a statement of profit or loss has the effect of smoothing profits for reporting purposes. The cash flow statement ignores the accruals concept and is prepared on a cash basis i.e. cash is recorded only when cash is physically paid or received",
          "There is some scope for manipulation of cash flows, e.g. a business may delay paying suppliers until after the year end.",
          "Cash flow is necessary for survival in the short-term, but in order to survive in the long-term a business must be profitable. It is often necessary to sacrifice cash flow in the short-term in order to generate profits in the long-term (e.g. by investment in non-current assets). A huge cash balance is not a sign of good management if the cash could be invested elsewhere to generate profit."
        ]
      },
      {
        "title": "FORMAT OF statement of cash flows",
        "items": [
          "Although IAS 7 does not prescribe a format for statements of cash flows, it does require the cash flows to be classified into:",
          "operating activities",
          "investing activities",
          "financing activities.",
          "This classification may require a particular transaction to be shown partly under one heading and partly under another.",
          "For example, when the cash repayment of a loan includes both interest and capital, the interest might be shown as an operating activity and the capital element as a financing activity."
        ]
      },
      {
        "title": "Pro-forma statement of cash flows",
        "items": [
          "There are two methods used for this: the direct method and the indirect method.",
          "The direct method is no longer included on the FR syllabus.",
          "The indirect method uses a reconciliation from profits to cash generated from operations as shown below"
        ]
      },
      {
        "title": "The statement of cash flows",
        "items": [
          "This method starts with profit before tax. Finance costs are added back and investment income is deducted in order to work back to profit from operations.",
          "Any non-cash items are then adjusted to find cash generated from operations (the cash version of profit from operations).",
          "Non-cash expenses are added back to remove them (such as depreciation, loss on disposal).",
          "Non-cash income items are deducted in order to remove them (such as profit on disposal, release of government grants).",
          "Adjustments are also made to working capital, to remove the impact of credit sales/purchases. When adjusting for these items, consider whether the movements are good or bad for cash. For example, an increase in receivables is bad for cash, as it means this cash has not yet been collected from the customers."
        ]
      },
      {
        "title": "cash flows from OPERATING activities",
        "items": [
          "Tax Paid",
          "To calculate tax paid, workings may be required. These can be done using either columns or T-accounts. Example;"
        ]
      },
      {
        "title": "cash flows from INVESTING activities",
        "items": [
          "Purchase of property, plant and equipment and other non-current assets",
          "A T-account working will probably be best to calculate figures relating to property, plant and equipment because so many items affect the balance, including additions, disposals, revaluations and depreciation."
        ]
      },
      {
        "title": "Interpretation of statements of cash flow",
        "items": [
          "The statement of cash flows should be reviewed after preparation. In particular, cash flows in the following areas should be reviewed:",
          "cash generation from trading operations",
          "dividend and interest payments",
          "capital expenditure and sales",
          "management of financing",
          "net cash flow"
        ]
      },
      {
        "title": "Cash generation from trading operations",
        "items": [
          "The figure should be compared to the operating profit. The reconciliation note to the statement of cash flows is useful in this regard. Overtrading may be indicated by:",
          "high profits and low cash generation",
          "large increases in inventory, receivables and payables.",
          "When discussing this area, comments should be made regarding working capital management, giving any potential reasons for movements in inventory, receivables and payables, discussing the impact this may have on cash flow and customer/supplier relations going forwards.",
          "Interpretation of statements of cash flow"
        ]
      },
      {
        "title": "Dividend and interest payments",
        "items": [
          "Dividend and interest payments can be compared to cash generated from trading operations to see whether normal operations can sustain such payments. If cash generated from operations cannot cover dividends and interest payments, the business may have problems continuing as a going concern.",
          "If the cash generated from operations can cover these payments, then any cash left over is free cash, and comments should be made about what the business has done with this (such as buying assets, repaying debt, paying a dividend).",
          "Interpretation of statements of cash flow"
        ]
      },
      {
        "title": "Capital expenditure and sales",
        "items": [
          "The nature and scale of a company’s investment in non-current assets is clearly shown. A simple test may be to compare investment and depreciation.",
          "If investment > depreciation, the company is investing at a greater rate than its current assets are wearing out – this suggests expansion.",
          "If investment = depreciation, the company is investing in new assets as existing ones wear out. The company appears stable",
          "If investment < depreciation, the non-current asset base of the company is not being maintained. This is potentially worrying as non-current assets are generators of profit.",
          "Interpretation of statements of cash flow"
        ]
      },
      {
        "title": "Capital expenditure and sales",
        "items": [
          "As sales of non-current assets are largely one-off transactions, they should be looked at closely. A significant cash inflow may suggest that the company has needed to raise funds by selling assets. This is a concern as the cash receipt is unlikely to be repeated, and the business will now have fewer assets against which to secure future funding.",
          "If the cash received from sale of non-current assets is relatively low, it may suggest that the company is selling older assets. This would be completely normal if additions were also high, as it suggests that older assets are being replaced by newer ones.",
          "In terms of additions, the sources of finance should be considered, to see whether the company has funded the purchases of non-current assets from cash generated from operations, or from debt/equity. If debt has been raised, this is not a huge problem, but regular repayments will need to be made.",
          "Interpretation of statements of cash flow"
        ]
      },
      {
        "title": "Management of financing",
        "items": [
          "The current and future implications should be considered when looking at the financing section. If new loans have been received, then there will be higher interest going forwards, and regular repayments required. Conversely, if loans have been repaid, this will help cash flow in future periods.",
          "If shares have been issued, there is no requirement for repayment of capital, and no interest. However, shareholders may expect regular dividends which could be paid indefinitely.",
          "Interpretation of statements of cash flow"
        ]
      },
      {
        "title": "Net cash flow",
        "items": [
          "The statement clearly shows the end result in cash terms of the company’s operations in the year. However, do not overstate the importance of this figure alone.",
          "A decrease in cash in the year may be for very sound reasons (e.g. there was surplus cash last year) or may be mainly the result of timing (e.g. a new loan was raised).",
          "To help in determining the future cash position, other areas of the published accounts should be considered.",
          "Interpretation of statements of cash flow"
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "The objective of IAS 7 Statement of Cash Flows is:",
          "to ensure that all entities provide information about the historical changes in cash and cash equivalents by means of a statement of cash flows",
          "to classify cash flows (i.e. inflows and outflows of cash and cash equivalents) during the period between those arising from operating, investing and financing activities.",
          "Cash flows cannot be manipulated easily and are not affected by judgement or by accounting policies."
        ],
        "answer": 0
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "to classify cash flows (i.e. inflows and outflows of cash and cash equivalents) during the period between those arising from operating, investing and financing activities.",
          "Cash flows cannot be manipulated easily and are not affected by judgement or by accounting policies.",
          "There is some scope for manipulation of cash flows, e.g. a business may delay paying suppliers until after the year end.",
          "to ensure that all entities provide information about the historical changes in cash and cash equivalents by means of a statement of cash flows"
        ],
        "answer": 3
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "There is some scope for manipulation of cash flows, e.g. a business may delay paying suppliers until after the year end.",
          "Although IAS 7 does not prescribe a format for statements of cash flows, it does require the cash flows to be classified into:",
          "to classify cash flows (i.e. inflows and outflows of cash and cash equivalents) during the period between those arising from operating, investing and financing activities.",
          "Cash flows cannot be manipulated easily and are not affected by judgement or by accounting policies."
        ],
        "answer": 2
      }
    ],
    "practice": [
      {
        "title": "Practice set",
        "question": "CASH FLOW STATEMENTS | OTQ 1. The following information is available for the property, plant and equipment of Fry as at 30 Sept ember: The following items were recorded during the year ended 30 September 20X4: (i) Depreciation charge of $2.5 million (ii) An item of plant, with a carrying amount of $3 million, was sold for $1.8 million (iii) A property was revalued upwards by $2 million (iv) Environmental provisions of $4 million relating to property, plant and equipment were capitalised during the year What amount would be shown in Fry’s statement of cash flows for purchase of property, plant and equipment for the year ended 30 September 20X4? $_____________'000 2. At 1 October 20X4, BK had accrued interest payable of $12,000. During the year ended 30 Septe mber 20X5, BK charged finance costs of $41,000 to its statement of profit or loss, including unwi nding a discount relating to a provision stated at its present value of $150,000 at 1 October 20X 4. The closing balance on accrued interest payable account at 30 September 20X5 was $15,000, and BK has a discount rate of 6%. How much interest paid should BK show on its statement of cash flows for the year ended 30 September 20X5? A. $38,000 B. $29,000 C. $35,000 D. $41,000 3. The following balances were extracted from N’s statement of financial position as at 31 December. The amount of tax paid that should be included in N’s statement of cash flows for the year ended 31 December 20X9 is: $_____________,000 4. Which item would be NOT be shown in a statement of cash flows using the indirect method? A. Cash paid to employees B. Cash paid to purchase machinery C. Cash paid to shareholders as dividend D. Cash paid to redeem loan notes CASH FLOW STATEMENTS | OTQ 5. IAS 7 Statement of Cash Flows sets out the three main headings to be used in a statement of cash flows. Which TWO of the items below would be included under the heading 'Cash flows from operati ng activities' according to IAS 7? A. Tax paid B. Purchase of investments C. Loss on disposal of machinery D. Purchase of equipment 6. During the year to 31 July 20X7 Smartypants made a profit of $37,500 after accounting for depreciation of $2,500. During the year noncurrent assets were purchased for $16,000, receivables increased by $2,000, inventories decreased by $3,600 and trade payables increased by $700. What was the increase in cash and bank balances during the year? A. $21,300 B. $30,300 C. $24,900 D. $26,300 7. Identify the correct treatment in the calculation of net cash from operating activities under the indirect method. 8. Butcher had the following balances in its statement of financial position as at 30 June 20X0 and 20X1: How much will appear in the statement of cash flows for the year ended 30 June 20X1 under the hea ding ‘cash flows from financing activities’? $__________ ,000 CASH FLOW STATEMENTS | OTQ 9. At 1 January 20X0 Casey had property, plant and equipment with a carrying amount of $180,000. In the year ended 31 December 20X0 Casey disposed of assets with a carrying amount of $60,000 for $50,000. Casey revalued a building from $75,000 to $100,000 and charged depreciation for the year of $20,000. At the end of the year, the carrying amount of property, plant and equipment was $250,000. How much will be reported in the statement of cash flows for the year ended 31 December 20X0 under the heading ‘cash flows from investing activities’? A. $75,000 outflow B. $125,000 outflow C. $135,000 outflow D. $50,000 inflow 10. At 1 January 20X0 Casey had government grants held in deferred income of $900,000. During the year, Casey released $100,000 to the statement of profit or loss. At 31 December 20X0, the remaining deferred income balance was $1,100,000. Select the TWO amounts to be included in the statement of cash flows for Casey.",
        "answer": "CASH FLOW STATEMENTS | OTQ ANS 1. A 2. B If you chose A, you have ignored the unwinding of the discount. If you chose C you have made an error between the opening and closing liability. If you chose D you have simply taken the expense for the year. 3. $98,000 4. A Cash paid to employees is shown when using the direct method, not the indirect method. 5. A, C Purchase of investments and purchase of equipment would both be shown within cash flows from investing activities. 6. D CASH FLOW STATEMENTS | OTQ ANS 7. D 8. $10,000 There will be an inflow of $30,000 relating to a share issue (being the total movement in share capital and share premium), and a $20,000 outflow on repayment of the debentures. Therefore the overall movement will be a net $10,000 inflow. 9. A 10."
      },
      {
        "title": "Practice set",
        "question": "CASH FLOW STATEMENTS | QUESTION CASH FLOW STATEMENTS | QUESTION Q1. Prepare a statement of cash flows for the year ended 30 September 20X3 and an analysis of cash and cash equivalents. Q2. Based on the answer, Interpretation of cash flow statement. What conclusions can be drawn?",
        "answer": "CASH FLOW STATEMENTS | QUE ANS CASH FLOW STATEMENTS | QUE ANS CASH FLOW STATEMENTS | QUE ANS CASH FLOW STATEMENTS | QUE ANS Interpretation of cash flow  An operating profit of $290,000 becomes an operating cash inflow of $518,000, suggesting a high quality profit supported by cash.  Other than the impact of depreciation, this inflow is largely due to working capital management, which should be considered in more detail: – Inventories have decreased, so releasing cash. – Payables and accruals have increased, so Hollywood is retaining cash for longer Although these movements have a positive impact on the cash flow statement, they may have the opposite effect on the business. A fall in inventories may result in stock-outs and so lost business, whilst an increase in payables may lead to poor supplier relationships and so supply being cut off or penalties.  Mandatory payments of interest and tax are easily covered by the cash generated from operations, leaving $378,000 free cash flow.  The major source of cash inflow in the year is operating activities. As operating activities are presumably sustainable, this places Hollywood in a positive position.  This operating cash inflow is supplemented by smaller cash inflows from the sale of non-current assets and a share issue. These cash flows are not sustainable year on year.  The majority of the cash outflow has been on the purchase of property, plant and equipment. This will benefit Hollywood in the long term as the assets are used to create profits.  Spend on property, plant and equipment exceeds the depreciation charge for the year which suggests that the company may be expanding.  $60,000 has also been used to redeem loan notes. This, together with the share issue, will improve Hollywood’s gearing position, making it a less risky investment.  Overall the cash position has improved during the year, changing from a net overdraft position to a positive and high cash balance. Although this is a good trend, having cash sitting in a bank is not an efficient use of resources and Hollywood should address this by investing the cash."
      }
    ]
  },
  {
    "slug": "accounting-policies-estimates-errors",
    "title": "Accounting Policies, Estimates & Errors",
    "standard": "IAS 8",
    "blocks": [
      {
        "title": "IAS 8 Accounting Policies, Changes in",
        "items": [
          "Accounting Estimates and Errors Malindu Udawatta"
        ]
      },
      {
        "title": "IAS 8 Accounting Policies, Changes in Accounting Estimates and Errors",
        "items": [
          "Accounting Policies",
          "• Accounting policies are the specific principles, bases, conventions, rules and practices adopted by an entity in preparing and presenting financial statements",
          "• Accounting policies are determined by applying the relevant IAS, IFRS or interpretations of IAS/IFRSs (previously called SICs)"
        ]
      },
      {
        "title": "Hierarchy of Accounting Policies",
        "items": [
          "• The hierarchy/ the order in which accounting polices should be selected",
          "1. If an issue is specifically addressed by an IFRS/ IAS/Interpretations, then an entity applies the accounting policy or policies required by that IFRS/ IAS/ interpretation to that issue",
          "2. If an IFRS/IAS/ Interpretation does not cover a particular issue, the management should use its judgement in developing and applying an accounting policy that results in information that is relevant and reliable (faithful representation). To develop an accounting policy in such a situation the following order should be followed:",
          "I. The requirements and guidance in IFRSs dealing with similar and related issues",
          "II. The Conceptual Framework - definitions, recognition criteria and measurement concepts for assets, liabilities, equity, income and expenses in the Conceptual Framework"
        ]
      },
      {
        "title": "Hierarchy Accounting Policies",
        "items": [
          "• Management may also consider the following as long as these do not conflict with standards, interpretations and the conceptual framework:",
          "• Most recent pronouncements of other standard setting bodies (e.g - FASB, US) that use a similar conceptual framework to develop standards",
          "• Other accounting literature",
          "• Accepted industry practices if these do not conflict with the sources above."
        ]
      },
      {
        "title": "Changes in Accounting Policies",
        "items": [
          "• The same accounting policies are usually adopted from period to period, to allow users to analyse trends over time in profit, cash flows and financial position.",
          "• Changes in accounting policy will therefore be rare and should be made only if:",
          "1. The change is required by an IFRS; or",
          "2. The change will result in a more appropriate presentation of events or transactions in the financial statements of the entity, providing more reliable and relevant information."
        ]
      },
      {
        "title": "Changes in Accounting Policies",
        "items": [
          "• The standard highlights two types of event which do not constitute changes in accounting policy:",
          "1. Adopting an accounting policy for a new type of transaction or event not dealt with previously by the entity",
          "2. Application of a new accounting policy for transaction or event which has not occurred in the past or which was not material",
          "• In the case of tangible non-current assets, if a policy of revaluation is adopted for the first time then this is treated, not as a change of accounting policy under IAS 8, but as a revaluation under IAS 16 Property, plant and equipment."
        ]
      },
      {
        "title": "Accounting for Changes in Accounting Policies",
        "items": [
          "• If there are transitional provisions guiding how the change in the accounting policy should be accounted for, follow those guidelines",
          "• If not, a change in accounting policy must be applied retrospectively",
          "• Retrospective application means that the new accounting policy is applied to transactions and events as if it had always been in use.",
          "• Comparative information for previous periods presented should be adjusted",
          "• An adjustment is also done to the opening balance of each affected component of equity (Retained Earnings) of the earliest prior period presented"
        ]
      },
      {
        "title": "Impracticable",
        "items": [
          "• If retrospective application of an accounting policy is impracticable, the change can be applied prospectively",
          "– applying the new accounting policy from the date of change to the new accounting policy",
          "• Applying a requirement is impracticable when the entity cannot apply it after making every reasonable effort to do so."
        ]
      },
      {
        "title": "Accounting Estimates",
        "items": [
          "• An accounting estimate is a method adopted by an entity to arrive at estimated amounts for the financial statements",
          "• Examples of accounting estimates",
          "• Useful life of PPE",
          "• Residual value of PPE",
          "• Depreciation method",
          "• Warranty provisions",
          "• Most figures in the financial statements require some estimation:",
          "• The exercise of judgement based on the latest information available at the time",
          "• At a later date, estimates may have to be revised as a result of the availability of new information, more experience or subsequent developments"
        ]
      },
      {
        "title": "Changes in Accounting Estimates",
        "items": [
          "• Change in accounting estimate is adjusted Prospectively",
          "• i.e. the effects of a change in accounting estimate should be included in the P&L:",
          "• in the period of the change and,",
          "• if subsequent periods are affected, in those subsequent periods",
          "• Comparative values for previous year does not have to be changed, nor the opening balances of equity of previous period"
        ]
      },
      {
        "title": "Prior Period Errors",
        "items": [
          "• Prior period errors are omissions from, and misstatements in, the entity’s financial statements for one or more prior periods arising from a failure to use, or misuse of, reliable information that:",
          "1. was available when financial statements for those periods were authorised for issue; and",
          "2. could reasonably be expected to have been obtained and taken into account in the preparation and presentation of those financial statements.",
          "• Such errors include the effects of mathematical mistakes, mistakes in applying accounting policies, oversights or misinterpretations of facts, and fraud."
        ]
      },
      {
        "title": "Correcting Prior Period Errors",
        "items": [
          "• Prior period error is corrected retrospectively (Retrospective Restatement), as if the error had never occurred",
          "1. Restating the comparative amounts for the prior periods presented in which the error occurred; or",
          "2. If the error occurred before the earliest prior period presented, restating the opening balances of assets, liabilities and equity for the earliest prior period presented",
          "• Only where it is impracticable to determine the cumulative effect of an error on prior periods can an entity correct an error prospectively."
        ]
      },
      {
        "title": "Problems with IAS 8",
        "items": [
          "It has been argued that the requirements of IAS 8 to adjust prior period errors retrospectively may lead to earnings management. By adjusting prior period errors through opening reserves, the impact is never shown within a current period statement of profit or loss.",
          "TUU 4 - Homework"
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "'Accounting policies are the specific principles, bases, conventions, rules and practices applied by an entity in preparing and presenting financial statements' (IAS 8, para 5).",
          "relevant to the economic decision-making needs of users",
          "reliable in that the financial statements",
          "represent faithfully the financial position, financial performance and cash flows of the entity"
        ],
        "answer": 0
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "reliable in that the financial statements",
          "represent faithfully the financial position, financial performance and cash flows of the entity",
          "reflect the economic substance of transactions, other events and conditions and not merely the legal form",
          "relevant to the economic decision-making needs of users"
        ],
        "answer": 3
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "reflect the economic substance of transactions, other events and conditions and not merely the legal form",
          "are neutral, i.e. free from bias",
          "reliable in that the financial statements",
          "represent faithfully the financial position, financial performance and cash flows of the entity"
        ],
        "answer": 2
      }
    ],
    "practice": []
  },
  {
    "slug": "consolidated-financial-statements",
    "title": "Consolidated Financial Statements",
    "standard": "IFRS 10",
    "blocks": [
      {
        "title": "Group",
        "items": [
          "Ceylon Cold Stores PLC Produces Soft Drinks & Ice Cream",
          "100%                                  100%",
          "Jaykay Marketing             The Colombo Ice",
          "Services (Pvt) Ltd          Company (Pvt) Ltd",
          "Operates Keells             Produces Ice Cream",
          "Supermarkets"
        ]
      },
      {
        "title": "Ordinary Shareholders",
        "items": [
          "Ownership      Control",
          "Company"
        ]
      },
      {
        "title": "Group   Group (Parent + Subsidiary)",
        "items": [
          "Parent                  Parent and Subsidiary are a",
          "SINGLE ECONOMIC UNIT",
          "Company A (Investor)",
          "Owns 100% of",
          "Ordinary Voting        Controls",
          "Shares",
          "Company B (Investee)",
          "Subsidiary",
          "• Parent is an separate legal entity.",
          "• Subsidiary is an separate legal entity."
        ]
      },
      {
        "title": "WHAT IS A GROUP ?",
        "items": [
          "• If one company owns more than 50% of the ordinary shares of another company, this will usually give the first company ‘control’ of the second company",
          "• The first company (the parent company, P) has enough voting power to appoint all the directors of the second company (the subsidiary company, S)",
          "• In strict legal terms P and S remain separate, but in economic substance they can be regarded as a single unit (a ‘group’)",
          "• According to the fundamental qualitative characteristic of faithful representation, accounts should show the economic reality rather than the legal form, therefore parent company is required to prepare consolidated financial statements"
        ]
      },
      {
        "title": "• PARENT – an entity that controls one or more entities",
        "items": [
          "• SUBSIDIARY – an entity that is controlled by another entity (known as the parent)",
          "• CONTROL OF AN INVESTEE – Next Slide",
          "• IFRS 10 states that investors should periodically consider whether control over an investee has been gained or lost"
        ]
      },
      {
        "title": "Exposure to               Ability to use",
        "items": [
          "Control           =           Power             +      variability in       +    the Power to",
          "returns                 affect returns",
          "Control comprises of the following three elements:",
          "✓ Power over the investee Investor has power over the Investee when the investor has the right to direct Relevant Activities of the entity Relevant activities are activities that significantly affect the investee's return",
          "✓ Exposure, or rights, to variable returns from its involvement with the investee. Returns from the investee can be dividend, change in value of the investee etc",
          "✓ The ability to use its power over the investee to affect the investor's returns"
        ]
      },
      {
        "title": "Factors to consider when assessing whether the investor controls the",
        "items": [
          "investee",
          "• Exercise of the majority of voting rights in an investee",
          "• Contractual arrangements between the investor and other parties",
          "• Holding less than 50% of the voting shares, with all other equity interests held by a large number of unrelated investors",
          "• Potential voting rights (such as share options or convertible loans) may result in an investor gaining or losing control at some specific date"
        ]
      },
      {
        "title": "• Company X owns 40% of the voting power",
        "items": [
          "in Company Y and Company Z owns the                      Agreement",
          "balance 60%                                  Company X                 Company Z",
          "• Company Z has entered into an agreement with Company X such that Company Z will",
          "exercise its voting power in the way         40%                 60%",
          "Company X wants",
          "• Therefore, in accordance with this agreement it is Company X that has control Company Y",
          "over Company Y not Company Z                             Group"
        ]
      },
      {
        "title": "CONSOLIDATED FINANCIAL STATEMENTS",
        "items": [
          "• Best way of showing the results of a group is to imagine that all the transactions of the group had been carried out by a single company and to prepare financial statements",
          "• Such statements are called Consolidated Financial Statements.",
          "• Consolidated financial statements should be prepared when the parent company has control over the subsidiary",
          "• For examination purposes control is usually established based on ownership of more than 50% of voting power Note that consolidated statements of cash flow are outside the F7 syllabus."
        ]
      },
      {
        "title": "• There are three IFRSs within the F7 syllabus relevant to the preparation of",
        "items": [
          "consolidated financial statements:",
          "• IFRS 3: Business Combinations",
          "• IFRS 10: Consolidated Financial Statements",
          "• IAS 28: Investments in Associates and Joint Ventures",
          "• Each company in a group prepares its own accounting records and annual financial statements in the usual way. From the individual companies' financial statements, the parent prepares consolidated financial statements.",
          "• In addition to the above accounting standards dealing with the preparation of consolidated financial statements, the IASB has now issued:",
          "• IFRS 12 Disclosure of Interests in Other Entities (not examinable in F7)."
        ]
      },
      {
        "title": "SEPARATE FINANCIAL STATEMENTS Company X",
        "items": [
          "• Separate Financial Statements are Parent’s own Financial Statements, showing assets, liabilities, equity Control and profit of the parent only",
          "• In these financial statements, the investments in                                     XY Group",
          "Company Y",
          "subsidiaries are presented in one line                                           Consolidated Financial",
          "Statements",
          "• In Separate financial statements, investments in subsidiaries and associates are accounted for either:",
          "• At cost",
          "• In accordance with IFRS 9 Financial Instruments",
          "• Using the equity method as described in IAS",
          "28 Investments In Associates and Joint              Company X - Parent   Company Y - Subsidiary",
          "Ventures                                            Separate Financial    Financial Statements",
          "Statements"
        ]
      },
      {
        "title": "Company A",
        "items": [
          "Parent             Separate Financial",
          "Statements Company A",
          "70%",
          "Company B",
          "Subsidiary AB Group Group Consolidated Financial Statements"
        ]
      },
      {
        "title": "EXEMPTION FROM PREPARATION OF",
        "items": [
          "CONSOLIDATED FINANCIAL STATEMENTS",
          "A parent need not present consolidated financial statements if and only if all of the following conditions are met:",
          "• The parent itself is a subsidiary (intermediate parent) and      Company A            Other Shareholders",
          "of Company B",
          "its owners have been informed about and do not disagree          Ultimate Parent",
          "to, the parent not preparing consolidated financial",
          "70%                  30%",
          "statements Company B",
          "• The intermediate parent's debt or equity instruments are        Intermediate Parent",
          "not traded in a public market 100%",
          "• The intermediate parent did not file its financial statements",
          "with a securities commission or other regulatory               Company C",
          "organization for the purpose of issuing any instruments in a public market",
          "• The ultimate parent company produces consolidated financial statements that comply with IFRS and are available for public use"
        ]
      },
      {
        "title": "SUBSIDIARY HELD FOR RESALE",
        "items": [
          "• If on acquisition a subsidiary meets the criteria to be classified as ‘held for sale’ in accordance with IFRS 5, then it must still be included in the Consolidated Accounts but accounted for in accordance with that standard (IFRS 5)",
          "• The parent's interest will be presented separately as a single figure on the face of the consolidated statement of financial position, rather than being consolidated like any other subsidiary",
          "• This might occur when a parent has acquired a group with one or more subsidiaries that do not fit into its long-term strategic plans and are therefore likely to be sold",
          "• In these circumstances the parent has clearly not acquired the investment with a view to long-term control of the activities, hence the logic of the exclusion"
        ]
      },
      {
        "title": "MATERIALITY",
        "items": [
          "• If a subsidiary is excluded on the grounds of immateriality, the case must be reviewed from year to year, and the parent would need to consider each subsidiary to be excluded on this basis, both individually and collectively",
          "• Ideally, a parent should consolidate all subsidiaries which it controls in all accounting periods, rather than report changes in the corporate structure from one period to the next."
        ]
      },
      {
        "title": "When exemption from the preparation of consolidated financial statements is",
        "items": [
          "permitted, IFRS 10 Consolidated Financial Statements requires that the following disclosures are made:",
          "• The fact that consolidated financial statements have not been presented;",
          "• A list of significant investments (subsidiaries, associates etc.) Including percentage shareholding, principle place of business and country of incorporation;",
          "• The bases on which those investments listed above have been accounted for in its separate financial statements.",
          "These reasons for not consolidating are not permitted according to IFRSs",
          "• Poor performance of the subsidiary",
          "• Poor financial position of the subsidiary",
          "• Differing activities of the subsidiary from the rest of the group."
        ]
      },
      {
        "title": "DIFFERENT REPORTING DATES/ NON-COTERMINOUS YEAR ENDS",
        "items": [
          "• Financial statements of the parent and its subsidiary are normally prepared for the same reporting date to facilitate preparation of consolidated financial statements",
          "• However, if a subsidiary has a reporting date different from the parent,",
          "• Subsidiary should prepare an additional set of financial statements as at the parent’s reporting date",
          "• If it is not possible to prepare an additional set of financial statements, the subsidiary's accounts may still be used for the consolidation, provided that:",
          "1. The gap between the reporting dates is three months or less",
          "2. Adjustments are made for the effects of significant transactions or other events that occur between the reporting dates"
        ]
      },
      {
        "title": "A parent has a year end of 31 December and its subsidiary has a year end",
        "items": [
          "of 31 October. Each year, the consolidated financial statements are prepared using financial information for the subsidiary at 31 October, adjusted for any significant transactions in November and December.",
          "1st Jan                                             31st Dec",
          "Parent’s Accounting Period",
          "Subsidiary’s Accounting Period",
          "1st Nov                                            31st Oct"
        ]
      },
      {
        "title": "UNIFORM ACCOUNTING POLICIES",
        "items": [
          "• If a member of a group uses accounting policies other than those adopted in the consolidated financial statements for similar transactions and events in similar circumstances, appropriate adjustments are made to that group member's financial statements in preparing the consolidated financial statements to ensure they match with the group’s accounting policies."
        ]
      },
      {
        "title": "Consolidation in SBR",
        "items": [
          "• Question 1 in the SBR exam will always test consolidated financial statements. However, the exam will not ask for the production of full consolidated financial statements. Instead, candidates will be required to produce extracts from these statements and to explain the accounting numbers that they have produced.",
          "• Some questions in this text require the production of full consolidated financial statements. This is to enable SBR candidates to revise, practice and develop a deeper understanding of consolidation techniques. Without this, you will find it difficult to tackle discursive exam-style questions."
        ]
      },
      {
        "title": "Business Combinations",
        "items": [
          "• The acquisition method (i.e. consolidation) is applied when one entity obtains control over another entity that constitutes a business.",
          "• If the assets acquired are not a business, the transaction should be accounted for as the purchase of an asset",
          "• A business must have processes that are able to convert acquired inputs into outputs.",
          "• Inputs are economic resources that can create outputs once processes are applied to them. Examples include property, plant and equipment, intangible assets, raw materials, and employees.",
          "• Processes are ‘any system, standard, protocol, convention or rule that when applied to an input or inputs, creates outputs or has the ability to contribute to the creation of outputs’. Processes are normally documented. However, employee knowledge and experience in following rules and conventions can also constitute a process",
          "• Outputs result from inputs and the processes applied to inputs. Outputs include goods, services and income."
        ]
      },
      {
        "title": "Group Parent",
        "items": [
          "Company A (Investor)",
          "Control",
          "Company B (Investee)",
          "Subsidiary"
        ]
      },
      {
        "title": "Concentration Test",
        "items": [
          "• The Board are aware that the definition of a business can be difficult and judgemental to apply. As such, there is an optional concentration test that preparers of financial statements can use to assess whether an acquired set of assets is not a business.",
          "• The concentration test is met (i.e. the acquired assets are not a business) if substantially all of the fair value of the total assets acquired is concentrated in a single identifiable asset or group of similar identifiable assets."
        ]
      },
      {
        "title": "Elements of a Business",
        "items": [
          "• If the concentration test is not met, or if the test is not applied, a more detailed assessment of the facts and circumstances is required to decide if a business has been acquired.",
          "• To meet the definition of a business, there must be inputs and processes that, when applied to acquired inputs, are capable of producing outputs. The processes acquired must be important and considerable (or, as IFRS 3 says, ‘substantive’).",
          "• Outputs are not required for an acquisition of assets to constitute a business. This is because some early stage entities may have engaged in significant research and development activities but not, as yet, finished any projects or generated any revenue.",
          "• If there are no outputs at the acquisition date then an acquired process is only substantive if:",
          "1. it is critical to convert an input to an output, and",
          "2. inputs acquired include a knowledgeable, skilled, organised workforce able to perform that process on other acquired inputs to produce outputs."
        ]
      },
      {
        "title": "Elements of a Business",
        "items": [
          "• If there are outputs at the acquisition date then an acquired process is substantive if it:",
          "1. is critical to continuing to produce outputs, and the inputs acquired include an organised workforce with the skills and knowledge to perform that process, or",
          "2. significantly contributes to the ability to continue producing outputs and is either rare or not capable of easy replacement.",
          "TUU 5 & 6"
        ]
      },
      {
        "title": "Acquisition Accounting",
        "items": [
          "• The acquisition method has the following requirements:",
          "1. Identifying the acquirer",
          "2. Determining the acquisition date",
          "3. Recognising and measuring the subsidiary's identifiable assets and liabilities",
          "4. Recognising goodwill (or a gain from a bargain purchase) and any noncontrolling interest."
        ]
      },
      {
        "title": "Identify the Acquirer",
        "items": [
          "• The acquirer is the entity that has assumed control over another entity. In a business combination, it is normally clear which entity has assumed control.",
          "• However, sometimes it is not clear as to which entity is the acquirer. For these cases, IFRS 3 provides guidance:",
          "1. The acquirer is normally the entity that has transferred cash or other assets within the business combination",
          "2. If the business combination has not involved the transfer of cash or other assets, the acquirer is usually the entity that issues its equity interests.",
          "• Other factors to consider are as follows:",
          "1. The acquirer is usually the entity whose (former) management dominates the combined entity",
          "2. The acquirer is usually the entity whose owners have the largest portion of voting rights in the combined entity",
          "3. The acquirer is normally the bigger entity.                      TUU 7 & TUU 8- H/W"
        ]
      },
      {
        "title": "Purchase Consideration: Share based Payment",
        "items": [
          "• Consideration transferred in exchange for control of a subsidiary could include replacement share-based payment schemes exchanged for share-based payments schemes held by the subsidiary’s employees.",
          "• If the acquirer is obliged to issue replacement share-based payments to employees of the subsidiary in exchange for their existing schemes, then the fair value of the replacement scheme must be allocated between:",
          "1. purchase consideration, and",
          "2. post-acquisition remuneration expense.",
          "• The amount allocated as purchase consideration cannot exceed the value of the original share scheme at the date of acquisition. The amount attributable to post-acquisition service is recognised in accordance with IFRS 2 Share-based Payments."
        ]
      },
      {
        "title": "Measurement Period",
        "items": [
          "• During the measurement period, IFRS 3 requires the acquirer in a business combination to retrospectively adjust the provisional amounts recognised at the acquisition date to reflect new information obtained about facts and circumstances that existed as of the acquisition date.",
          "• This would result in goodwill arising on acquisition being recalculated.",
          "• The measurement period ends no later than twelve months after the acquisition date."
        ]
      },
      {
        "title": "EXEMPTION FROM PREPARATION OF",
        "items": [
          "CONSOLIDATED FINANCIAL STATEMENTS",
          "A parent need not present consolidated financial statements if and only if all of the following conditions are met:",
          "• The parent itself is a subsidiary (intermediate parent) and     Company A             Other Shareholders",
          "of Company B",
          "its owners have been informed about and do not disagree          Ultimate Parent",
          "to, the parent not preparing consolidated financial",
          "70%                  30%",
          "statements Company B",
          "• The intermediate parent's debt or equity instruments are        Intermediate Parent",
          "not traded in a public market 100%",
          "• The intermediate parent did not file its financial statements",
          "with a securities commission or other regulatory               Company C",
          "organization for the purpose of issuing any instruments in a public market",
          "• The ultimate parent company produces consolidated financial statements that comply with IFRS and are available for public use"
        ]
      },
      {
        "title": "Exemptions from Consolidation Period",
        "items": [
          "Investment entities",
          "• An investment entity is defined by IFRS 10 as an entity that:",
          "1. obtains funds from investors and provides them with investment management services, and",
          "2. invests those funds to earn returns from capital appreciation, investment income, or both, and",
          "3. measures the performance of its investments on a fair value basis.",
          "• Investment entities do not consolidate an investment over which they have control. Instead, the investment is measured at fair value at each reporting date with gains and losses recorded in profit or loss."
        ]
      },
      {
        "title": "Exemptions from Consolidation Period",
        "items": [
          "Special purpose entities",
          "• A special purpose entity (SPE) is a subsidiary created by a parent company for a specific purpose. Since SPEs are separate legal entities, liable for their own debts, they might be used when the parent decides to embark on a new but risky venture. Alternatively, a parent company might set up a SPE to hold some of its debt, hence improving the parent’s separate statement of financial position.",
          "• There have been instances of groups not reporting SPEs in the group financial statements. This is frequently a breach of IFRS Standards. If a parent controls the SPE then its assets, liabilities, income and expenses must be consolidated."
        ]
      },
      {
        "title": "Joint Arrangement",
        "items": [
          "Company X                   Company Y                  A joint arrangement is an arrangement of",
          "(Investor)                  (Investor)",
          "which two or more parties have joint",
          "Joint Control                               Joint Control   control",
          "Joint Control Joint control is the contractually agreed sharing of control of an arrangement,",
          "Business                              which exists only when decisions about the",
          "Joint Arrangement                          relevant activities require the unanimous",
          "consent of the parties sharing control"
        ]
      },
      {
        "title": "Joint Arrangement",
        "items": [
          "Joint Operation                                             Joint Venture",
          "A joint operation is a joint arrangement          A joint venture is a joint arrangement",
          "whereby the parties that have joint               whereby the parties that have joint",
          "control of the arrangement have rights to         control of the arrangement have rights",
          "the assets, and obligations for the               to the net assets of the arrangement",
          "liabilities, relating to the arrangement Parties that have joint control are",
          "Parties that have joint control are called        called joint venturers",
          "joint operators",
          "Normally, there will not be a separate            This will normally be established in the",
          "entity established to conduct joint               form of a separate entity to conduct",
          "operations.                                       the joint venture activities."
        ]
      },
      {
        "title": "Joint Operations",
        "items": [
          "Example of a joint operation A and B decide to enter into a joint operation to produce a new product. A undertakes one manufacturing process and B undertakes the other. A and B have agreed that decisions regarding the joint operation will be made unanimously and that each will bear their own expenses and take an agreed share of the sales revenue from the product.",
          "If the joint operation meets the definition of a 'business' then the principles in IFRS 3 Business Combinations apply when an interest in a joint operation is acquired:",
          "1. Acquisition costs are expensed to profit or loss as incurred",
          "2. The identifiable assets and liabilities of the joint operation are measured at fair value",
          "3. The excess of the consideration transferred over the fair value of the net assets acquired is recognised as goodwill."
        ]
      },
      {
        "title": "Joint Operations",
        "items": [
          "• At the reporting date, the individual financial statements of each joint operator will recognise:",
          "1. its share of assets held jointly",
          "2. its share of liabilities incurred jointly",
          "3. its share of revenue from the joint operation",
          "4. its share of expenses from the joint operation.",
          "• The joint operator's share of the income, expenses, assets and liabilities of the joint operation are included in its individual financial statements and so they will automatically flow through to the consolidated financial statements."
        ]
      },
      {
        "title": "Joint Ventures",
        "items": [
          "Example of a joint venture A and B decide to set up a separate entity, C, to enter into a joint venture. A will own 55% of the equity capital of C, with B owning the remaining 45%. A and B have agreed that decision- making regarding the joint venture will be unanimous. Neither party will have direct right to the assets, or direct obligation for the liabilities of the joint venture; instead, they will have an interest in the net assets of entity C set up for the joint venture. In the individual financial statements, an investment in a joint venture can be accounted for:",
          "1. at cost",
          "2. in accordance with IFRS 9 Financial Instruments, or",
          "3. by using the equity method. In the consolidated financial statements, the interest in the joint venture entity will be accounted for using the equity method in accordance with IAS 28 Investments in Associates and Joint Ventures. The treatment of a joint venture in the consolidated financial statements is therefore identical to the treatment of an associate. TUU 13 & Illustration 5"
        ]
      },
      {
        "title": "IFRS 12 Disclosure of Interests in Other Entities",
        "items": [
          "• IFRS 12 is the single source of disclosure requirements for business combinations. Disclosure requirements include:",
          "1. disclosure of significant assumptions and judgements made in determining whether an investor has control, joint control or significant influence over an investee",
          "2. disclosure of the nature, extent and financial effects of its interests in joint arrangements and associates",
          "3. additional disclosures relating to subsidiaries with non-controlling interests, joint arrangements and associates that are individually material",
          "4. significant restrictions on the ability of the parent to access and use the assets or to settle the liabilities of its subsidiaries."
        ]
      },
      {
        "title": "Criticisms of IFRS 3 Business Combinations",
        "items": [
          "Fair values The requirement to fair value the assets and liabilities of the acquired subsidiary at the acquisition date makes it difficult to compare entities that grow via acquisitions with those that grow organically. Recognising the inventory of a subsidiary at its acquisition date fair value will reduce profit margins in the next period, thus reducing comparability year-on year. Intangible assets IFRS 3 requires entities to recognise separable intangibles at fair value at the acquisition date, but this is difficult and judgemental if no active market exists. Contingent consideration The calculation of the fair value of contingent consideration is subjective, increasing the risk of bias and reducing comparability. Contingent consideration may be linked to the success of a long-term development project. It has been argued that changes in the fair value of the consideration in such scenarios should be recorded against the development asset, rather than in profit or loss."
        ]
      },
      {
        "title": "Criticisms of IFRS 3 Business Combinations",
        "items": [
          "Goodwill",
          "• Some have argued that a gain on a bargain purchase should not be recognized in profit or loss, but rather in other comprehensive income, because it distorts the performance profile of an entity.",
          "• Goodwill impairment reviews are complex, subjective and time-consuming.",
          "• Performing annual impairment reviews in respect of goodwill, rather than amortising it, increases volatility in profit or loss.",
          "• Over time, purchased goodwill will be replaced by internally generated goodwill. Per IAS 38 Intangible Assets, internally generated goodwill should not be recognised as an asset. As such, some argue that purchased goodwill should be amortised, rather than be subject to annual impairment review."
        ]
      },
      {
        "title": "Criticisms of IFRS 3 Business Combinations",
        "items": [
          "NCI",
          "• Allowing a measurement choice for the NCI at acquisition reduces comparability between entities.",
          "• Measuring the fair value of the NCI can be problematic, and highly judgemental, if the entity is not listed."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "If one company owns more than 50% of the ordinary shares of another company, this will usually give the first company ‘control’ of the second company",
          "The first company (the parent company, P) has enough voting power to appoint all the directors of the second company (the subsidiary company, S)",
          "In strict legal terms P and S remain separate, but in economic substance they can be regarded as a single unit (a ‘group’)",
          "IFRS 10 states that investors should periodically consider whether control over an investee has been gained or lost"
        ],
        "answer": 0
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "In strict legal terms P and S remain separate, but in economic substance they can be regarded as a single unit (a ‘group’)",
          "IFRS 10 states that investors should periodically consider whether control over an investee has been gained or lost",
          "Control comprises of the following three elements:",
          "The first company (the parent company, P) has enough voting power to appoint all the directors of the second company (the subsidiary company, S)"
        ],
        "answer": 3
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Control comprises of the following three elements:",
          "Investor has power over the Investee when the investor has the right to direct Relevant Activities of the entity",
          "In strict legal terms P and S remain separate, but in economic substance they can be regarded as a single unit (a ‘group’)",
          "IFRS 10 states that investors should periodically consider whether control over an investee has been gained or lost"
        ],
        "answer": 2
      }
    ],
    "practice": [
      {
        "title": "Practice set",
        "question": "Which of the following definitions is not included within the definition of control per IFRS 10? Having power over the investee Having exposure, or rights, to variable returns from its investment with the investee Having the majority of shares in the investee Having the ability to use its power over the investee to affect the amount of the investor’s returns Which of the following situations is unlikely to represent control over an investee? Owning 55% and being able to elect 4 of the 7 directors Owning 51 %, but the constitution requires that decisions need the unanimous consent of shareholders Having currently exercisable options which would take the shareholding of the company to 55% Owning 40% of the shares, but having the majority of voting rights within the company Which of the following is NOT a condition which must be met for the parent to be exempt from producing consolidated financial statements? The activities of the subsidiary are significantly different to the rest of the group and to consolidate them would prejudice the overall group position The ultimate parent company produces consolidated financial statements that comply with IFRS Accounting Standards and are publicly available The parent’s debt or equity instruments are not traded in a public market The parent itself is a wholly-owned subsidiary or a partially owned subsidiary whose owners do not object to the parent not producing consolidated financial statements Which of the following statements regarding consolidated financial statements is correct? For consolidation, it may be acceptable to use financial statements of the subsidiary if the year-end differs from the parent by 2 months For consolidation, all companies within the group must have the same year-end All companies within a group must have the same accounting policy in their individual financial statements Only 100% subsidiaries need to be consolidated",
        "answer": "C – While having the majority of shares may be a situation which leads to control, it does not feature in the definition of control per IFRS 10. B – The fact that unanimous consent is required would suggest that there is no control over the investee. A – The activities of the subsidiary are irrelevant when making the decision as to whether to produce consolidated financial statements or not. A – IFRS 10 states that where the reporting date for a parent is different from that of a subsidiary, the subsidiary should prepare additional financial information as of the same date as the financial statements of the parent unless it is impracticable to do so. If it is impracticable to do so, IFRS 10 allows use of subsidiary financial statements made up to a date of not more than three months earlier or later than the parent's reporting date, with due adjustment for significant transactions or other events between the dates. The companies do not have to have the same policies in their individual financial statements, but adjustments will be made to prepare the consolidated financial statements using the group policies. All subsidiaries need to be consolidated, not just 100% owned ones."
      }
    ]
  },
  {
    "slug": "consolidated-financial-position",
    "title": "Consolidated Statement of Financial Position",
    "standard": "IFRS 10",
    "blocks": [
      {
        "title": "Group Parent",
        "items": [
          "Company A (Investor)",
          "Control",
          "Company B (Investee)",
          "Subsidiary"
        ]
      },
      {
        "title": "Mechanics of Consolidation : CSFP (1/3)",
        "items": [
          "• The basic principle of a Consolidated Statement of Financial Position (CSFP) is that it shows all assets, liabilities and equity of both the parent and subsidiary, as if it was single economic unit"
        ]
      },
      {
        "title": "Mechanics of Consolidation : CSFP (2/3)",
        "items": [
          "• Preparation of a CSFP follows a series of steps & adjustments as follows:",
          "Step 1 Working 1 : Establish the group structure",
          "Combine the parent’s and subsidiaries SFPs by adding line-by-line similar items of assets Step 2 and liabilities",
          "• Keep space for a new non-current asset called “Goodwill” – from Working 3",
          "Do the set of standard workings:",
          "• Working 2 : Net assets of the subsidiary Step 3 • Working 3 : Goodwill",
          "• Working 4 : Non-controlling interest",
          "• Working 5 : Group retained earnings"
        ]
      },
      {
        "title": "Mechanics of Consolidation : CSFP (3/3)",
        "items": [
          "For equity components:",
          "• Share capital and share premium             - Only show parent’s share capital and share premium",
          "Step 4   • Group retained earnings                     - From Working 5",
          "• Other reserves E.g. – Revaluation reserve - From relevant workings",
          "• Non-controlling interest (NCI)              - From Working 4"
        ]
      },
      {
        "title": "Owners of the parent",
        "items": [
          "Owners of the Group = Owners of the Parent",
          "Parent Group",
          "80%",
          "20%",
          "Subsidiary            NCI"
        ]
      },
      {
        "title": "W1 : Group Structure",
        "items": [
          "• Identify the parent and its subsidiary",
          "• How much of the subsidiary is owned by the parent",
          "• Date of acquisition and for how long parent has had control over subsidiary",
          "Company X",
          "70%                     X (parent) acquired 70% of Y (subsidiary) on 1st Jan 2020",
          "1st Jan 2020",
          "Company Y Group"
        ]
      },
      {
        "title": "W2 : Net Assets of Subsidiary",
        "items": [
          "Subsidiary",
          "• Fair Value of the assets acquired and                                          Statement of Financial Position",
          "Non-Current Assets                          USD",
          "liabilities assumed of the subsidiary (i.e. FV                        Property, Plant and Equipment              2,000",
          "of Net Assets) are shown by listing out the",
          "Assets Current Assets",
          "components of equity of the subsidiary at                             Inventory                                  1,200",
          "Receivables                                  600",
          "both acquisition date and reporting date                              Cash                                         600",
          "Total Assets                               4,400",
          "• A third column shows the post-acquisition Equity",
          "Net Assets",
          "change in net assets                                                  Stated Capital                               400",
          "Revaluation Reserve                          300",
          "Retained Earnings                          2,000",
          "2,700",
          "Non-Current Liabilities",
          "Acquisition                                    Reporting",
          "Liabilities",
          "Bank Loan                                  1,000",
          "Date                                          Date",
          "Current Liabilities",
          "Trade Payables                               700",
          "Total liabilities                          1,700",
          "Total Equity and Liabilities               4,400"
        ]
      },
      {
        "title": "W2 : Net Assets of Subsidiary",
        "items": [
          "A        B         C=B-A",
          "Acquisition   Reporting     Post-",
          "Date         Date      Acquisition",
          "Share capital                                    XXX      XXX          XXX",
          "Share premium                                    XXX      XXX          XXX",
          "Retained earnings                                XXX      XXX          XXX",
          "Revaluation surplus                              XXX      XXX          XXX",
          "Other reserves                                   XXX      XXX          XXX",
          "FV Adjustments                              XX/(XX)      XX/(XX)     XX/(XX)",
          "Net Assets of Subsidiary                         XXX      XXX          XXX",
          "Post-acquisition",
          "Acquisition                             Reporting",
          "Date                                   Date"
        ]
      },
      {
        "title": "W3 : Goodwill (1/4)",
        "items": [
          "Company Y Statement of Financial Position as at 31/12/2020",
          "Non-Current Assets                          USD",
          "Property, Plant and Equipment              2,000",
          "Company X",
          "Assets Current Assets",
          "Inventory                                  1,200",
          "Receivables                                  600",
          "Company X acquired                             Cash                                         600",
          "100% of Y for a purchase                          Total Assets                               4,400",
          "consideration of USD 3,000 on 31/12/2020 Equity",
          "Assets Net",
          "Stated Capital                               400",
          "Retained Earnings                          2,300",
          "2,700",
          "Company Y Non-Current Liabilities",
          "Liabilities",
          "Bank Loan                                  1,000",
          "Current Liabilities",
          "Trade Payables                               700",
          "Total Equity and Liabilities               4,400",
          "Unrecognized internally generated brand - 100"
        ]
      },
      {
        "title": "W3 : Goodwill (2/4)",
        "items": [
          "• Goodwill is an asset representing the future economic benefits arising from other assets acquired in a business combination that are not individually identified and separately recognized",
          "• Goodwill represents intangible elements of a business like reputation, customer loyalty and market share not separately recognized in the SFP",
          "• Goodwill at acquisition is calculated as follows:",
          "FV of Identifiable Assets",
          "Goodwill       =        FV of the",
          "Consideration",
          "+       NCI     -      Acquired and Liabilities",
          "Assumed (Net Assets)"
        ]
      },
      {
        "title": "W3 : Goodwill – Example (3/4)",
        "items": [
          "• X acquired 100% of Y at a cost of USD 500 Mn. On the acquisition date, the fair value of the identifiable net assets of Y was USD 450 Mn. What is the Goodwill at acquisition?",
          "FV of the                         FV of Net",
          "Goodwill     =      Consideration   +    NCI      -      Assets",
          "50         =          500         +     -       -       450",
          "• This is the premium that X was willing to pay for the business of Y"
        ]
      },
      {
        "title": "W3 : Goodwill (4/4)",
        "items": [
          "• Calculation of goodwill on acquisition can be detailed out as follows in W3:",
          "FV of the consideration transferred *                     XXX                 Deducted from",
          "Non-controlling interest on acquisition *                 XXX                 “Investment in",
          "Subsidiary”",
          "XXX                 when adding",
          "FV of the identifiable net assets acquired (from W2) *   (XXX)                line by line",
          "Goodwill on acquisition date                              XXX",
          "Shown in",
          "Impairment to date                                       (XXX)                Consolidated",
          "Goodwill at reporting date                                XXX                 SFP under",
          "non-current assets",
          "• * Note: All the values should be as at the acquisition date"
        ]
      },
      {
        "title": "W4: Non-Controlling Interest",
        "items": [
          "NCI at acquisition (from W3)                    XXX",
          "NCI % of post-acquisition reserves XXX (post acquisition reserves from W2)",
          "NCI at reporting date                           XXX",
          "Shown in the Consolidated SFP under Equity"
        ]
      },
      {
        "title": "Non-Controlling Interest on Acquisition (1/3)",
        "items": [
          "Company X                 NCI",
          "Company X",
          "100%                                 80%                     20%",
          "Company Y                           Company Y",
          "Group                              Group",
          "FV of Assets               1,000   FV of Assets               1,000",
          "FV of Liabilities          (800)   FV of Liabilities          (800)",
          "FV of Net Assets/ Equity     200   FV of Net Assets/ Equity     200"
        ]
      },
      {
        "title": "Non-Controlling Interest on Acquisition (2/3)",
        "items": [
          "• Non-controlling interest (NCI) is the equity (net assets) in a subsidiary not attributable, directly or indirectly, to a parent",
          "• Where the parent company acquires less than 100% of a subsidiary, there is a non- controlling interest",
          "• NCI value at acquisition can be calculated in one of two ways: 1• NCI’s % of the FV of identifiable net assets of the subsidiary (Proportion of Net Assets Method)",
          "2• At Fair Value"
        ]
      },
      {
        "title": "Non-Controlling Interest on Acquisition (3/3)",
        "items": [
          "1 Proportion of Net Assets Method",
          "• NCI value = NCI % * Fair value of identifiable net assets of the subsidiary at acquisition (from W2)",
          "• Goodwill calculated belongs only to the parent",
          "2 Fair Value Method",
          "• NCI value = Fair value of NCI's holding at acquisition (given in the exam)",
          "• It is normally equal to = No. of shares NCI owns × Subsidiary share price on acquisition date",
          "• Goodwill calculated belongs to both parent and NCI"
        ]
      },
      {
        "title": "W3 : Goodwill",
        "items": [
          "• Calculation of goodwill on acquisition can be detailed out as follows in W3:",
          "FV of the consideration transferred *                       XXX",
          "Non-controlling interest on acquisition *                   XXX",
          "XXX",
          "FV of the identifiable net assets acquired (from W2) *     (XXX)",
          "Goodwill on acquisition date                                XXX",
          "Impairment to date                                         (XXX)",
          "Goodwill at reporting date                                  XXX",
          "* Note: All the values should be as at the acquisition date"
        ]
      },
      {
        "title": "Non-Controlling Interest : Example",
        "items": [
          "X Ltd acquired 70% of Y Ltd in 20X9 at a cost of USD 500 Mn. The fair value of the identifiable net assets of Y Ltd on this date was USD 550 Mn and the fair value of the NCI was USD 180 Mn",
          "1. Calculate the value of goodwill at acquisition based on fair value of NCI",
          "2. Calculate the value of goodwill at acquisition based on proportion of net assets method",
          "1. Fair Value Method                                2. Proportion of Net Assets Method",
          "FV of consideration transferred         500         FV of consideration transferred         500",
          "NCI on acquisition (fair value)         180         NCI on acquisition (550 * 30%)          165",
          "680                                                 665",
          "Less: FV of identifiable net assets   (550)         Less: FV of identifiable net assets   (550)",
          "Goodwill                                130         Goodwill                                115",
          "Difference in goodwill is the goodwill that belongs to NCI"
        ]
      },
      {
        "title": "Non-Controlling Interest : Post Acquisition",
        "items": [
          "• Subsequent to acquisition, NCI is allocated its % of change in the reserves of the subsidiary from acquisition date to reporting date",
          "NCI at acquisition (from W3)                                     XXX",
          "NCI % of post-acquisition reserves XXX (post acquisition reserves from W2)",
          "NCI at reporting date                                            XXX"
        ]
      },
      {
        "title": "Company X acquires 80% Company Y on 31st Dec 2019. FV of NCI on acquisition was USD 600. Net assets of the",
        "items": [
          "subsidiary as at acquisition date and reporting date (31st Dec 2020) are as follows:",
          "NCI at acquisition(FV) 600",
          "Post-Acquisition          60",
          "NCI at Reporting Date 660",
          "Post-Acquisition Period                                            Company X                          NCI",
          "80%                         20%",
          "Acquisition Date                                Reporting Date",
          "31st Dec 2019                                   31st Dec 2020",
          "Retained Earnings – 160",
          "W2: Net           Acquisition    Reporting         Post-                                                         Retained Earnings – 40",
          "Revaluation Reserve – 80",
          "Assets                  Date         Date     Acquisition                                                      Revaluation Reserve – 20",
          "Stated                 1,000          1,000             -",
          "Capital",
          "Retained               1,000          1,200          200",
          "Earnings Company Y",
          "Revaluation               800           900          100",
          "Reserve Post-Acquisition",
          "2,800          3,100          300                          Retained Earnings - 200",
          "Revaluation Reserve - 100"
        ]
      },
      {
        "title": "Non-Controlling Interest : Post Acquisition",
        "items": [
          "Example (1/2) Mink Co acquired 80% of the USD 200 Mn stated capital of Nature Co on 1 January 2009. Retained earnings of Nature were USD 600 M and the revaluation surplus was USD 160 Mn. NCI had a fair value of USD 200 Mn at this date. In the year ended 31 December 2009, Nature made a profit of USD 120 Mn and a revaluation deficit of USD 20 Mn",
          "What is the amount of NCI in Nature at 31 December 2009 if:",
          "a. NCI is measured as a proportion of net assets?",
          "b. The NCI is measured at fair value?"
        ]
      },
      {
        "title": "Non-Controlling Interest : Post Acquisition",
        "items": [
          "Example (2/2) W4: NCI - Proportion of net assets method NCI at acquisition (20% * (200 + 600 + 160)) 192 NCI % of post-acquisition change in reserves 20 (20% * (120 – 20))",
          "NCI at reporting date                          212",
          "Shown in the Consolidated",
          "W4 : NCI - Fair value method                             SFP under Equity",
          "NCI at acquisition                             200",
          "NCI % of post-acquisition change in reserves 20 (20% * (120 – 20))",
          "NCI at reporting date                          220"
        ]
      },
      {
        "title": "W5 : Group Retained Earnings",
        "items": [
          "• W5 calculates the retained earnings that are attributable to the parent company’s shareholders",
          "Parent's retained earnings at reporting date                         XXX",
          "Parent's % of subsidiary's post-acquisition retained earnings XXX (post acquisition retained earnings from W2)",
          "Group retained earnings at reporting date                            XXX"
        ]
      },
      {
        "title": "Company X acquires 80% Company Y on 31st Dec 2019. Parent’s Retained Earnings as at 31st Dec 2020 was USD",
        "items": [
          "1,500. Net assets of the subsidiary as at acquisition date and reporting date (31st Dec 2020) are as follows:",
          "P’s retained earnings                       1,500",
          "Post-acquisition S’s retained earnings        160",
          "Group retained earnings at reporting date 1,660 Post-Acquisition Period",
          "Shareholders",
          "Acquisition Date                                Reporting Date                           of X",
          "31st Dec 2019                                   31st Dec 2020",
          "Company X                        NCI",
          "W2: Net           Acquisition    Reporting         Post-",
          "Assets                  Date         Date     Acquisition",
          "20%",
          "80%",
          "Stated                 1,000          1,000             -",
          "Capital",
          "Retained               1,000          1,200          200",
          "Retained Earnings – 160                         Retained Earnings – 40",
          "Earnings",
          "Revaluation               800           900          100",
          "Reserve",
          "2,800          3,100          300",
          "Company Y",
          "Post-Acquisition Retained Earnings - 200"
        ]
      },
      {
        "title": "W : Group Revaluation Reserve",
        "items": [
          "• To calculate the revaluation surplus that is attributable to the parent company’s shareholders",
          "Parent's revaluation reserve at reporting date                                      XXX",
          "Parent's % of subsidiary's post-acquisition revaluation reserve XXX (post acquisition revaluation reserves from W2)",
          "Group revaluation reserves at reporting date                                        XXX"
        ]
      },
      {
        "title": "Company X acquires 80% Company Y on 31st Dec 2019. Parent’s revaluation reserves as at 31st Dec 2020 was USD",
        "items": [
          "500. Net assets of the subsidiary as at acquisition date and reporting date (31st Dec 2020) are as follows:",
          "P’s revaluation reserves                                500",
          "P’s % post-acquisition S’s revaluation reserves          80",
          "Group revaluation reserve at reporting date             580",
          "Post-Acquisition Period",
          "Shareholders",
          "Acquisition Date                                Reporting Date                             of X",
          "31st Dec 2019                                   31st Dec 2020",
          "W2: Net           Acquisition    Reporting         Post-                               Company X                          NCI",
          "Assets                  Date         Date     Acquisition",
          "80%                      20%",
          "Stated                 1,000          1,000             -",
          "Capital",
          "Retained               1,000          1,200          200        Revaluation reserves – 80                         Revaluation reserves – 20",
          "Earnings",
          "Revaluation               800           900          100",
          "Reserve",
          "2,800          3,100          300",
          "Company Y",
          "Post-Acquisition Revaluation reserves - 100"
        ]
      },
      {
        "title": "Positive vs. Negative Goodwill",
        "items": [
          "Positive Goodwill",
          "• Goodwill will normally be a positive value. It is capitalized as an intangible non-current asset in Consolidated SFP",
          "• Tested at least annually for possible impairments",
          "• Goodwill is not amortized",
          "Negative Goodwill",
          "• Goodwill calculated can sometimes be a negative value",
          "FV of Identifiable Assets FV of the Consideration",
          "+        NCI           <          Acquired and Liabilities",
          "Assumed (Net Assets)"
        ]
      },
      {
        "title": "Negative Goodwill",
        "items": [
          "• IFRS 3 does not refer to this as negative goodwill (instead it is referred to as a Gain on Bargain Purchase), however this is the commonly used term",
          "• A negative goodwill is possible when the subsidiary is a loss-making company or when previous shareholders want to sell their shares quickly",
          "• Before recognizing a gain on a bargain purchase, the acquirer/parent must do the following: 1• Reassess whether it has correctly identified all of the assets acquired and all of the liabilities assumed of the subsidiary and must recognize any additional assets or liabilities that are identified in that review 2• The acquirer must then review the procedures used to measure:",
          "a. Identifiable assets acquired and liabilities assumed",
          "b. NCI in the acquiree (if any)",
          "c. Consideration transferred",
          "• If there is still a gain on bargain purchase, its credited to group retained earnings (W5)"
        ]
      },
      {
        "title": "W5 : Group Retained Earnings",
        "items": [
          "Parent's retained earnings at reporting date                    XXX",
          "Parent's % of subsidiary's post-acquisition retained earnings XXX",
          "Gain on bargain purchase                                        XXX",
          "Group retained earnings at reporting date                       XXX"
        ]
      },
      {
        "title": "Impairment of Goodwill (1/2)",
        "items": [
          "• When goodwill is impaired after acquisition, goodwill shown in the consolidated SFP must be after accounting for this impairment",
          "• How the impairment loss is shared between the parent and NCI depends on the method used to calculate NCI on acquisition",
          "1 Proportion of Net Assets Method",
          "• Goodwill calculated belongs only to the parent",
          "• Any subsequent impairment of goodwill will be charged to only the parent i.e group retained earnings",
          "DRDr Group Retained Earnings (W5)                     (GW impairment )",
          "CRCr Goodwill (W3)                                    (GW impairment)"
        ]
      },
      {
        "title": "W3 : Goodwill",
        "items": [
          "• Calculation of goodwill on acquisition can be detailed out as follows in W3:",
          "FV of the consideration transferred *                       XXX",
          "Non-controlling interest on acquisition *                   XXX",
          "XXX",
          "FV of the identifiable net assets acquired (from W2) *     (XXX)",
          "Goodwill on acquisition date                                XXX",
          "Impairment to date                                         (XXX)",
          "Goodwill at reporting date                                  XXX",
          "* Note: All the values should be as at the acquisition date"
        ]
      },
      {
        "title": "W5 : Group Retained Earnings",
        "items": [
          "Parent's retained earnings at reporting date                    XXX",
          "Parent's % of subsidiary's post-acquisition retained earnings XXX (post acquisition retained earnings from W2) Full goodwill impairment (if proportion of net assets method) (XXX)",
          "Group retained earnings at reporting date                       XXX"
        ]
      },
      {
        "title": "Impairment of Goodwill (2/2)",
        "items": [
          "2 Fair Value Method",
          "• Goodwill calculated belongs to both parent and NCI",
          "• Any subsequent impairment of goodwill will be charged to both Retained Earnings and NCI based on their ownership percentages in the subsidiary",
          "DRDr Group Retained Earnings (W5)            (GW impairment * P’s %)",
          "DRDr NCI (W4)                                (GW impairment * NCI’s %)",
          "CRCr Goodwill (W3)                           (GW impairment)"
        ]
      },
      {
        "title": "W4 & W5 W4",
        "items": [
          "NCI at acquisition (from W3)                                    XXX",
          "NCI % of post-acquisition reserves XXX (post acquisition reserves from W2)",
          "NCI % goodwill impairment (Fair value method only)              (XXX)",
          "NCI at reporting date                                           XXX",
          "W5",
          "Parent's retained earnings at reporting date                      XXX",
          "Parent's % of subsidiary's post-acquisition retained earnings XXX (post acquisition retained earnings from W2)",
          "Parent’s % of goodwill impairment (if fair value method)         (XXX)",
          "Group retained earnings at reporting date                         XXX"
        ]
      },
      {
        "title": "Fair Values",
        "items": [
          "• In consolidated financial statements the following two items need to be recorded at fair value",
          "1. Consideration transferred to acquire the subsidiary (in W3 : Goodwill)",
          "2. Identifiable assets acquired and liabilities assumed (net assets) of the subsidiary on acquisition date (in W2 : Net assets of the subsidiary)"
        ]
      },
      {
        "title": "FV of the Consideration Transferred (1/2)",
        "items": [
          "Mr. Smith                                               Company X",
          "Consideration",
          "Mr. Smith                    Transferred                Company X",
          "currently owns                                                now owns",
          "100% of        Mr. Smith                   Company X     100% of",
          "Company Y                                                 Company Y",
          "Shares of Company Y",
          "Company Y                                                 Company Y"
        ]
      },
      {
        "title": "FV of the Consideration Transferred",
        "items": [
          "• Consideration transferred by the parent to acquire subsidiary can take different forms:",
          "✓ Upfront cash payment",
          "✓   Share exchange                        Accounted for at",
          "✓   Deferred consideration                   Fair Value",
          "✓ Contingent consideration",
          "• Incidental costs of acquisition such as legal, accounting, valuation and other professional fees are not part of the consideration transferred and should be recognized as an expense of the acquirer as incurred"
        ]
      },
      {
        "title": "FV of the Consideration Transferred",
        "items": [
          "Share Exchange",
          "• A share exchange is when the parent issues its own shares in return for the shares of the subsidiary",
          "• The share price of parent’s shares (i.e. Fair Value) on acquisition date should be used to calculate the cost of investment",
          "• Share exchange is normally calculated based on a ratio.",
          "E.g.- Two shares of the parent company for every five shares of the subsidiary acquired (2 for 5)",
          "Shares of Company X (parent)",
          "Company X                                                            Mr. Smith",
          "Parent Shares of the Subsidiary, Company Y"
        ]
      },
      {
        "title": "FV of the Consideration Transferred",
        "items": [
          "Share Exchange",
          "• In parent’s separate financial statements, share exchange will be recorded as follows:",
          "DR Dr Investment in Subsidiary              XXXX",
          "CR CR Share capital                         XXXX (No. of shares of the parent issued * Nominal/par value of a share)",
          "CR Cr Share premium                         XXXX (No. of shares of the parent issued * share premium per share)"
        ]
      },
      {
        "title": "FV of the Consideration Transferred",
        "items": [
          "Deferred Consideration (1/2)",
          "• Deferred Consideration is a payment made by the parent to previous shareholders of the subsidiary on a later date, as opposed to on the date of acquisition",
          "• Fair Value of deferred consideration is calculated by discounting the amounts payable to present value at acquisition date (discounted using parent’s cost of capital)",
          "• In parent’s separate financial statements, deferred consideration is recorded as follows: Dr Investment in Subsidiary",
          "DR                                                 7,513,148",
          "Cr Deferred Consideration",
          "CR                                                 7,513,148",
          "Year 1                            Year 2                Year 3",
          "Payment of the",
          "Acquisition                         Parent’s cost of capital is 10%            Deferred Consideration",
          "Date USD 10,000,000",
          "Fair Value of the       $ 10,000,000",
          "=",
          "Deferred Consideration          (1 + 0.1)3",
          "= USD 7,513,148"
        ]
      },
      {
        "title": "FV of the Consideration Transferred",
        "items": [
          "Deferred Consideration (2/2)",
          "• Deferred consideration will surely be paid in the future, unlike contingent consideration, which might not be paid",
          "• Each year the discount is then \"unwound\". This increases the deferred liability each year and the discount is treated as a finance cost Dr Group Retained Earning (W5)(Finance Cost)",
          "DR                                                                          751,315",
          "Cr Deferred Consideration",
          "CR                                                                          751,315",
          "Year 1                       Year 2                      Year 3",
          "Payment of the",
          "Acquisition                    Parent’s cost of capital is 10%                  Deferred Consideration",
          "Date",
          "Fair Value of the Deferred Consideration after 1 year = USD 7,513,148 × (1 + 0.1)1 = USD 8,264,463",
          "Finance Cost = 8,264,463 − 7,513,148 = USD 751, 315"
        ]
      },
      {
        "title": "FV of the Consideration Transferred",
        "items": [
          "Contingent Consideration",
          "• A contingent consideration is an agreement to make a payment in the future IF certain conditions are satisfied",
          "E.g.- An agreement to pay USD 500,000 if the subsidiary achieves a net profit of USD 100,000 each year for the next two years",
          "• In parent’s separate financial statements, contingent consideration is recorded at fair value as follows:",
          "DRDr   Investment in Subsidiary                                 (Initial FV of the Contingent Consideration)",
          "CRCr   Contingent Consideration                                 (Initial FV of the Contingent Consideration)",
          "• Any changes in fair value are treated as a change in accounting estimate, therefore change is shown in retained earnings. If fair value increase, double entry to record it is:",
          "DRDr   Group Retained Earnings (W5)                           (Change in the FV of the Contingent Consideration)",
          "CRCr   Contingent Consideration                               (Change in the FV of the Contingent Consideration)"
        ]
      },
      {
        "title": "FV of the Consideration Transferred : Example",
        "items": [
          "ABC Ltd acquired 24 million (80%) of the ordinary shares of Y Ltd by offering a share-for-share exchange of two shares for every three shares acquired in Y Ltd, a cash payment of USD 1 per share now and a further USD 2 per share payable three years later and a further cash payment of USD 5 Mn four years later if Y Ltd achieves a specific sales level. FV of the contingent consideration was deemed as USD 4 Mn on acquisition date. ABC Ltd’s and Y Ltd’s shares have a current market value of USD 3 and USD 2 respectively. The cost of capital is 10%. FV of the identifiable net assets of Y Ltd on acquisition date was USD 100 Mn. Nominal value of a share of ANC Ltd is USD 2.",
          "1. Calculate the FV of the consideration transferred and the double entries to record it in ABC Ltd’s financial statements",
          "2. Show how the discount on the deferred consideration would be unwound",
          "3. Calculate goodwill on acquisition"
        ]
      },
      {
        "title": "FV of the Consideration Transferred : Example",
        "items": [
          "FV of the consideration transferred                                                      USD",
          "Share Exchange                              (24,000,000 * 2/3 * USD3)             48,000,000",
          "Upfront Cash Payment                        (24,000,000 * USD 1)                  24,000,000",
          "Deferred Consideration                      (24,000,000 * USD 2 * 1/(1+0.1)^3)    36,063,110",
          "Contingent Consideration                    (4,000,00)                             4,000,000",
          "112,063,110",
          "Double entries to record it in ABC Ltd’s separate financial statements",
          "DRDr Investment in Subsidiary                             112,063,110",
          "CRCR Cash                                                  24,000,000",
          "CRCr Share capital (24,000,000*2/3* 2)                     32,000,000",
          "CR   Share premium (24,000,000*2/3* 1)                     16,000,000",
          "CRCr Deferred Consideration                                36,063,110",
          "CRCr Contingent Consideration                               4,000,000"
        ]
      },
      {
        "title": "FV of the Consideration Transferred : Example",
        "items": [
          "Unwinding the discount on the deferred consideration",
          "Value of the deferred consideration at the end of each year:",
          "Initial liability                              36,063,110",
          "Year 1      (36,063,110 * 1.1)                 39,669,421",
          "Year 2      (39,669,421 * 1.1)                 43,636,364",
          "Year 3      (43,636,363 * 1.1)                 48,000,000",
          "Double entries to record unwinding of the discount in year 1 Finance cost for year 1 = 39,669,421 – 36,063,110 = 3,606,311",
          "DRDr Group Retained Earnings (W5) (Finance Cost)              3,606,311",
          "CR Cr Deferred Consideration                                  3,606,311"
        ]
      },
      {
        "title": "FV of the Consideration Transferred : Example",
        "items": [
          "W3 : Goodwill",
          "FV of the consideration transferred                            112,063,110",
          "Non-controlling interest on acquisition (100,000,000 * 20%)     20,000,000",
          "132,063,110",
          "FV of the identifiable net assets acquired                    (100,000,000)",
          "Goodwill on acquisition                                         32,063,110",
          "Illustration 2 & TUU 3"
        ]
      },
      {
        "title": "FV of Identifiable Net Assets (1/2)",
        "items": [
          "• As per IFRS 3, 1• All identifiable assets acquired and liabilities assumed of the subsidiary (Net assets) should be included in consolidated financial statements 2• All identifiable assets acquired and liabilities assumed must be measured at fair value at the date of acquisition for inclusion within the consolidated financial statements",
          "• An item is identifiable if it either:",
          "• Is separable - i.e. is capable of being separated or divided from the entity and sold, transferred, licensed, rented or exchanged either individually or together with a related contract, asset or liability or",
          "• Arises from contractual or other legal rights, regardless of whether those rights are transferable or separable from the entity or from other rights and obligations"
        ]
      },
      {
        "title": "FV of Identifiable Net Assets (2/2)",
        "items": [
          "• Identifiable assets acquired and the liabilities assumed as part of a business combination are recognized separately from goodwill in consolidated financial statements at the date of acquisition",
          "• This often results in recognition of assets in the consolidated financial statements that were previously not recognized by the subsidiary. E.g. internally generated intangible assets such as brands, publishing title and customer relationship",
          "• All non-identifiable assets acquired in a business combination are therefore represented by goodwill"
        ]
      },
      {
        "title": "FV of Identifiable Net Assets",
        "items": [
          "Exception to Recognition Rule A 'contingent liability' is:",
          "• A possible obligation that arises from past events whose existence will be confirmed only by the occurrence or non-occurrence of one or more uncertain future events not wholly within the control of the entity; or",
          "• A present obligation that arises from past events but is not recognised because it is not probable that economic outflow will be required to settle the obligation or it cannot be measured with sufficient reliability",
          "• A contingent liability of a subsidiary acquired in a business combination that is a present obligation for which the fair value can be measured reliably should be recognized in consolidated financial statements",
          "• Unlike in IAS 37, there is no requirement for an outflow of resources to be probable",
          "• A contingent liability that is a possible obligation is not recognized"
        ]
      },
      {
        "title": "FV of Identifiable Net Assets",
        "items": [
          "• Once all identifiable net assets (assets and liabilities) are identified, they should be included in the consolidated financial statements based on the fair value on the acquisition date",
          "• Therefore, on acquisition date, if subsidiary’s financial statement carry assets and liabilities at values different from their fair values, a fair value adjustment should be made Fair Value Adjustment to Net Assets of the Subsidiary",
          "• Adjustments to recognize all identifiable assets • Adjustments to measure all identifiable",
          "and liabilities of the subsidiary                    assets and liabilities of the subsidiary at",
          "fair value on acquisition date"
        ]
      },
      {
        "title": "FV of Identifiable Net Assets",
        "items": [
          "• Any fair value adjustment in respect of identifiable assets and liabilities of the subsidiary will affect the net assets of the subsidiary",
          "Net Assets    =        Assets      -     Liabilities",
          "• And as we saw before, net asset of the subsidiary is shown in W2. So all fair value adjustments are done to W2 : Net Assets of the Subsidiary",
          "• From W2, adjustments made to reporting date column must be taken to consolidated SFP"
        ]
      },
      {
        "title": "FV of Identifiable Net Assets : Example (1/4)",
        "items": [
          "Venice Ltd acquired 80% of Rome Ltd in 2010 at a cost of USD 500 Mn. The carrying amount of the net assets of Rome Ltd on the acquisition date and reporting date are as follows:",
          "USD Mn                     Acquisition Date   Reporting Date",
          "Share Capital                          300              300",
          "Retained Earnings                      100              150",
          "However the following differences in fair value on acquisition date were noticed (a) Rome Ltd has a brand that has not been recognized in its own financial statements. Fair value of this brand is USD 40 Mn. This brand has an indefinite useful life (b) A plot of land with a carrying amount of USD 65 Mn has a fair value of USD 75 Mn (c) A contingent liability with a fair value of USD 20 Mn. This liability is outstanding as at the reporting date",
          "1. Prepare W2: Net Assets of the Subsidiary",
          "2. How much is the goodwill on acquisition?"
        ]
      },
      {
        "title": "FV of Identifiable Net Assets : Example (2/4)",
        "items": [
          "W2 : Net Assets of the Subsidiary",
          "Acquisition    Reporting        Post-",
          "Date          Date         Acquisition",
          "Share Capital                     300            300              -",
          "Retained Earnings                 100            150             50",
          "FV Adj. Brand                      40             40              -",
          "FV Adj. Land                       10             10              -",
          "FV Adj. Contingent Liability      (20)           (20)             -",
          "FV of Net Assets                  430            480             50",
          "Adjusted in the consolidated SFP"
        ]
      },
      {
        "title": "FV of Identifiable Net Assets : Example (3/4)",
        "items": [
          "Venice Ltd Consolidated Statement of Financial Position",
          "Non-Current Assets",
          "Property, Plant and Equipment (Venice’s PPE + Rome’s PPE + 10 )     XXX",
          "Brand (Venice’s Brand + Rome’s Brand + 40 )                         XXX",
          "Non-Current Liability (Venice’s NCL + Rome’s NCL + 20)              XXX"
        ]
      },
      {
        "title": "FV of Identifiable Net Assets : Example (4/4)",
        "items": [
          "W3 : Goodwill",
          "1   FV of the Consideration Transferred               500",
          "2   Non-Controlling Interest (430 * 20%)               86",
          "3 FV of the Identifiable Net Assets Acquired (W2) (430)",
          "Goodwill on Acquisition                           156"
        ]
      },
      {
        "title": "Fair Value Adjustment : Post Acquisition",
        "items": [
          "• When the fair value adjustment on acquisition date on a depreciable asset was an upward adjustment",
          "✓ Subsidiary’s financial statements show a lower amount of depreciation, therefore more depreciation must be charged in the consolidated SFP",
          "• When the fair value adjustment on acquisition date on a depreciable asset was a downward adjustment",
          "✓ Subsidiary’s financial statements show a higher amount of depreciation, therefore less depreciation must be charged in the consolidated SFP",
          "• Depreciation adjustment is made to the reporting date column in W2 : Net assets of the subsidiary and from there taken to the consolidated SFP"
        ]
      },
      {
        "title": "FV Adjustment : Example (1/3)",
        "items": [
          "Venice Ltd acquired 80% of Rome Ltd on 1st Jan 2019 at a cost of USD 500 Mn. The carrying amount of the net assets of Rome Ltd on the acquisition date and reporting date (31st Dec 2020) are as follows:",
          "USD Mn                      Acquisition Date    Reporting Date",
          "Share Capital                           300               300",
          "Retained Earnings                       100               150",
          "However the following differences in fair value on acquisition date were noticed (a) Rome Ltd has a brand that has not been recognized in its own financial statements. Fair value of this brand is USD 40 Mn. This brand has a useful life of 5 years on acquisition date (b) A building with a carrying amount of USD 65m has a fair value of USD 75 Mn and a remaining useful life of 10 years",
          "1. Prepare W2: Net Assets of the Subsidiary"
        ]
      },
      {
        "title": "FV Adjustment : Example (2/3)",
        "items": [
          "W2 : Net Assets of the Subsidiary",
          "Acquisition       Reporting",
          "Date             Date         Post-Acquisition",
          "Stated Capital                             300               300                 -",
          "Retained Earnings                          100               150                50",
          "FV Adj. Brand                               40                40                 -",
          "FV Adj. Brand Amortization (40 * 2/5)        -               (16)              (16)",
          "FV Adj. Building (75 – 65)                  10                10                 -",
          "FV Adj. Building Dep. (10 * 2/10)            -               (2)                (2)",
          "FV of Net Assets                           430               482                32",
          "Adjusted in the consolidated SFP"
        ]
      },
      {
        "title": "FV Adjustment : Example (3/3)",
        "items": [
          "Venice Ltd Consolidated Statement of Financial Position",
          "Non-Current Assets Property, Plant and Equipment (Venice’s PPE + Rome’s PPE + 10 - 2) XXX",
          "Brand (Venice’s PPE + Rome’s PPE + 40 - 16)                          XXX"
        ]
      },
      {
        "title": "Fair Value Adjustment : Post Acquisition",
        "items": [
          "Fair value adjustments subsequently realized",
          "• An asset or liability subjected to a fair value adjustment on acquisition can be realized/sold subsequently. Then no adjustment is required in the reporting date column of W2, the fair value adjustment should only be done in acquisition date column. Eg. – Inventory"
        ]
      },
      {
        "title": "Intra-group Transactions",
        "items": [
          "• Intra-group transactions are transactions between group companies",
          "• Effect of intra-group transactions must be eliminated from the consolidated financial statements, as consolidated financial statements are prepared on the assumption of a single economic entity",
          "• Intra-group transactions include:",
          "• Inter-company sales and purchases",
          "• Inter-company lending and borrowing",
          "• Inter-company transfer of non-current assets"
        ]
      },
      {
        "title": "Inter-Company Receivable & Payables",
        "items": [
          "• If parent and subsidiary trade with each other on credit, this will lead to:",
          "• A receivables (current) account in one company’s balance sheet",
          "• A payables (current) account in the other company’s balance sheet",
          "• These are amounts owing within the group rather than outside the group and therefore they must not appear in the consolidated balance sheet",
          "• They are therefore cancelled against each other when making the Consolidated SFP"
        ]
      },
      {
        "title": "Company M",
        "items": [
          "Company X Parent",
          "Company Y            Payables USD 1,000",
          "Receivables USD 5,000 Subsidiary",
          "Cancelling the intra-group receivable balance XY Group Consolidated Statement of Financial Position",
          "Current Assets",
          "Receivables (P’s receivables + S’s receivables - 1,000)           XXX",
          "Current Liabilities",
          "Payables (P’s payables + S’s payables - 1,000)                    XXX",
          "Cancelling the intra-group payable balance"
        ]
      },
      {
        "title": "Cash/ Goods in Transit",
        "items": [
          "• Sometime, receivable and payable balances in the parent and subsidiary financial statements may not match exactly, due to in-transit items such as goods or cash",
          "• If the goods or cash are in transit between Parent and Subsidiary, make the following adjusting entries in the consolidated SFP",
          "• Cash in transit adjusting entry is: DRDr Cash CR Cr Receivables",
          "• Goods in transit adjusting entry is: DRDr Inventory CR Cr Payables",
          "• This adjustment is for the purpose of consolidation only",
          "• Once currents accounts of subsidiary & parent match, balances may be cancelled as before"
        ]
      },
      {
        "title": "Cash in Transit Cash USD",
        "items": [
          "2,000",
          "Company X                                                          Company Y",
          "Parent                                                          Subsidiary",
          "Original payable to Y   USD 7,000                              Original receivable from X   USD 7,000",
          "Cash transferred        USD(2,000)                             Cash received                        -",
          "Closing payable to Y    USD 5,000                              Closing receivable from Y    USD 7,000",
          "XY Group Consolidated Statement of Financial Position",
          "Current Assets",
          "Receivables (P’s receivables + S’s receivables - 2,000 – 5,000)              XXX",
          "Cash (P’s Cash + S’s Cash + 2,000)                                           XXX",
          "Cash in transit     Cancelling the intra-group",
          "Current Liabilities",
          "Payables (P’s payables + S’s payables – 5,000)                               XXX"
        ]
      },
      {
        "title": "Goods in Transit Inventory USD 3,000",
        "items": [
          "Company X                                                              Company Y",
          "Parent                                                             Subsidiary",
          "Original payable to Y   USD 7,000                                 Original receivable from X   USD 7,000",
          "Goods received                 -                                  Goods sent                   USD 3,000",
          "Closing payable to Y    USD 7,000                                 Closing receivable from X    USD 10,000",
          "XY Group Consolidated Statement of Financial Position",
          "Current Assets",
          "Receivables (P’s receivables + S’s receivables – 10,000)                           XXX",
          "Inventory (P’s Inventory + S’s Inventory + 3,000)                                  XXX",
          "Goods in transit Cancelling the intra-group Current Liabilities",
          "Payables (P’s payables + S’s payables + 3,000 – 10,000)                            XXX"
        ]
      },
      {
        "title": "Unrealized Profit",
        "items": [
          "• When one group company sells goods to another group company, the company that sold the goods will record a profit in its own financial statements",
          "• But in terms of the consolidated financial statements, such profits are Unrealized and must be eliminated from the consolidated financial statements, because consolidation assumes parent and subsidiary are a single economic entity",
          "• Such unrealized profits are realized when the company that bought the goods from the other group company sells them to a party outside the group",
          "• Unrealized profit may arise within a group scenario on:",
          "✓ Inventory sold between group companies",
          "✓ Non-current assets sold between group companies"
        ]
      },
      {
        "title": "Unrealized Profit in Inventory",
        "items": [
          "When one group company sells goods (inventory) to another, a number of adjustments may be needed",
          "• Current accounts must be cancelled, if there are outstanding receivable/ payable balances",
          "• Where goods are still held by a group company, any unrealized profit must be cancelled",
          "• Inventory must be adjusted to show the original cost to the group (i.e. cost to the company which purchased it from an outsider and then sold it to a group company )"
        ]
      },
      {
        "title": "Purchase USD 2,000                        Sales 2,500",
        "items": [
          "Company X                           Company Y",
          "Mr. Smith                                                               Subsidiary",
          "Parent",
          "Retained   USD 500                 Inventory USD 2,500",
          "Earnings",
          "Purchase USD 2,000",
          "Company X                           Company Y",
          "Mr. Smith                                                               Subsidiary",
          "Parent",
          "Inventory USD 2,000",
          "Group"
        ]
      },
      {
        "title": "Purchase                       Sales                              Sales",
        "items": [
          "USD 2,000   Company X          2,500           Company Y          3,200",
          "Mr. Smith                                                                             Mr. Jack",
          "Parent                           Subsidiary",
          "Retained                       Retained",
          "USD 500                           USD 700",
          "Earnings                       Earnings",
          "Purchase                                                          Sales",
          "USD 2,000   Company X                          Company Y          3,200",
          "Mr. Smith                                                                             Mr. Jack",
          "Parent                           Subsidiary",
          "Retained USD 1,200 Earnings",
          "Group"
        ]
      },
      {
        "title": "Unrealized Profit in Inventory : Process",
        "items": [
          "• Determine the value of closing inventory included in a group company’s own balance sheet which was purchased from another group company",
          "• Use markup (profit as a % of cost) or margin (profit as a % of sales) to calculate profit earned by the selling company on the that inventory",
          "• Adjust the sellers retained earnings and inventory line item in the consolidated SFP as shown in the next slide"
        ]
      },
      {
        "title": "Parent Company is the Seller",
        "items": [
          "DRDr Group retained earnings (W5) CRCr Group inventory (in CSFP)",
          "W5 : Group Retained Earnings",
          "Parent's Retained Earnings at Reporting Date                          XXX",
          "Parent's % of Subsidiary's Post-Acquisition Retained Earnings         XXX",
          "Unrealized Profit (If parent is the seller)                           (XXX)",
          "XXX",
          "Consolidated Statement of Financial Position Extract",
          "Current Assets",
          "Inventory (P’s Inventory + S’s Inventory - Unrealized Profit)                 XXX"
        ]
      },
      {
        "title": "Subsidiary Company is the Seller",
        "items": [
          "DRDr Subsidiary Retained Earnings (W2 – reporting date column) CRCr Group inventory (in CSFP)",
          "W2 : Net Assets of the Subsidiary",
          "Acquisition   Reporting     Post-",
          "Date         Date      Acquisition",
          "Stated Capital                                       XXX          XXX          XXX",
          "Retained Earnings                                    XXX          XXX          XXX",
          "Unrealized Profit (if subsidiary is the seller)        -          (XXX)        XXX",
          "XXX          XXX          XXX",
          "Consolidated Statement Consolidated Statement of of Financial Financial Position Position Extract Extract",
          "Current Assets",
          "Inventory (P’s Inventory + S’s Inventory - Unrealized Profit)                     XXX"
        ]
      },
      {
        "title": "Unrealized Profit in Non-Current Assets",
        "items": [
          "• If one group company sells a non-current asset to another group company, adjustments must be made in consolidated SFP to recreate the situation that would have existed if the sale had not occurred:",
          "• There would have been no profit on the sale",
          "• Depreciation would have been based on the original cost of the asset to the group",
          "• Carrying amount would be based on the original cost of the asset to the group",
          "• Adjustments needed depends on whether the seller was the parent or subsidiary"
        ]
      },
      {
        "title": "Parent is the Seller",
        "items": [
          "Two years ago parent sold a car to subsidiary for USD 60,000, when the remaining useful life was 3 years and the carrying amount of the car in parent’s financial statements was USD 45,000",
          "What has been                What should have been",
          "recorded in financial        recorded if we assume       Difference",
          "statements                   sale did not happen",
          "15,000                                              15,000",
          "Profit on sale                                                                            -",
          "(60,000 – 45,000)",
          "Acc. Dep. from date of the sale to                     40,000                     30,000                   10,000",
          "the reporting date                                (60,000×2/3)              (45,000×2/3)",
          "20,000                      15,000                   5,000",
          "Carrying value at reporting date",
          "(60,000 – 40,000)         (45,000 – 30,000)",
          "Dr Group Retained Earnings (W5)                                                                15,000",
          "Cr Subsidiary’s Retained Earnings (W2 – Reporting Date Colum)                                  10,000",
          "Cr PPE on the Consolidated SFP                                                                   5,000"
        ]
      },
      {
        "title": "Subsidiary is the Seller",
        "items": [
          "Three years ago subsidiary sold a car to the parent for USD 10,000, when the remaining useful life was 5 years and the carrying amount of the car in subsidiary’s financial statements was USD 5,000",
          "What has been                What should have been",
          "recorded in financial        recorded if we assume       Difference",
          "statements                   sale did not happen",
          "5,000                                              5,000",
          "Profit on sale                                                                            -",
          "(10,000 – 5,000)",
          "Acc. Dep. from date of the sale to                      6,000                      3,000                   3,000",
          "the reporting date                               (10,000 × 3/5)             (5,000 × 3/5)",
          "4,000                       2,000                  2,000",
          "Carrying value at reporting date",
          "(10,000 – 6,000)           (5,000 – 3,000)",
          "Dr Subsidiary’s Retained Earnings (W2 – Reporting Date Colum)                                    5,000",
          "Cr Group Retained Earnings (W5)                                                                  3,000",
          "Cr PPE on the Consolidated SFP                                                                   2,000"
        ]
      },
      {
        "title": "Midyear acquisitions",
        "items": [
          "• If a parent company acquires a subsidiary mid-year, the net assets at the date of acquisition must be calculated based on the net assets at the start of the subsidiary's financial year plus the profits of up to the date of acquisition",
          "• To calculate this, it is normally assumed that S earns profit after tax evenly over time. However, there may be exceptions to this. The most common one of these is an intragroup loan from the parent to the subsidiary",
          "• If this is the case, the subsidiary will have interest in the post acquisition period that it wouldn't have had in the pre acquisition period.",
          "Illustration 6, TUU 7"
        ]
      },
      {
        "title": "W1 : Group Structure",
        "items": [
          "Company X",
          "70%                X (parent) acquired 70% of Y (subsidiary) on 1st Jan 2020",
          "1st Jan 2020",
          "Company Y Group"
        ]
      },
      {
        "title": "W2 : Net Assets of Subsidiary",
        "items": [
          "Acquisition   Reporting     Post-",
          "Date         Date      Acquisition",
          "Stated Capital                                                      XXX          XXX          XXX",
          "Retained Earnings                                                   XXX          XXX          XXX",
          "Revaluation Surplus                                                 XXX          XXX          XXX",
          "FV Adjustment on acquisition                                        XXX          XXX          XXX",
          "FV Adjustment : Post Acquisition                                      -          XXX          XXX",
          "Unrealized Profit : When subsidiary is seller                         -          (XXX)       (XXX)",
          "Non-current asset transfer dep. : When subsidiary is the buyer        -          XXX          XXX",
          "FV of Net Assets of Subsidiary                                      XXX          XXX          XXX"
        ]
      },
      {
        "title": "W3 : Goodwill",
        "items": [
          "FV of the consideration transferred                     XXX",
          "Non-controlling interest on acquisition                 XXX",
          "XXX",
          "FV of the identifiable net assets acquired (from W2) (XXX)",
          "Goodwill on acquisition date                            XXX",
          "Impairment to date                                     (XXX)",
          "Goodwill at reporting date                              XXX"
        ]
      },
      {
        "title": "W4 : Non-Controlling Interest",
        "items": [
          "W4",
          "NCI at acquisition (from W3)                         XXX",
          "NCI % of post-acquisition reserves XXX (post acquisition reserves from W2) NCI % goodwill impairment (Fair value method only) (XXX)",
          "NCI at reporting date                                XXX"
        ]
      },
      {
        "title": "W5 : Group Retained Earnings",
        "items": [
          "Parent's Retained Earnings at Reporting Date                                         XXX",
          "Parent's % of Subsidiary's Post-Acquisition Retained Earnings                        XXX",
          "Finance cost/ FV Changes on Deferred and Contingent consideration                   XX/(XX)",
          "Goodwill Impairment *                                                                (XXX)",
          "Gain on Bargain Purchase                                                             XXX",
          "Unrealized Profit (If parent is the seller)                                          (XXX)",
          "Non-current asset transfer dep. (When parent is the buyer)                           XXX",
          "Group Retained Earnings                                                              XXX",
          "* If NCI measured at Fair Value – Total goodwill impairment * Parent’s ownership % If NCI measured at Proportion of Net Assets Method – Total goodwill impairment"
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "A standard group accounting FR question will provide the financial statements of a parent and at least one subsidiary, and will require the preparation of consolidated financial statements.",
          "The basic principle of a Consolidated Statement of Financial Position (CSFP) is that it shows all assets, liabilities and equity of both the parent and subsidiary, as if it was single economic unit",
          "investment in subsidiary (S) shown in parent’s (P’s) statement of financial position is replaced by net assets of S.",
          "cost of investment in S is effectively cancelled against ordinary share capital and reserves of the subsidiary, leaving goodwill as a balance."
        ],
        "answer": 0
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "investment in subsidiary (S) shown in parent’s (P’s) statement of financial position is replaced by net assets of S.",
          "cost of investment in S is effectively cancelled against ordinary share capital and reserves of the subsidiary, leaving goodwill as a balance.",
          "This produces a consolidated statement of financial position showing:",
          "The basic principle of a Consolidated Statement of Financial Position (CSFP) is that it shows all assets, liabilities and equity of both the parent and subsidiary, as if it was single economic unit"
        ],
        "answer": 3
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "This produces a consolidated statement of financial position showing:",
          "net assets of the whole group (P + S)",
          "investment in subsidiary (S) shown in parent’s (P’s) statement of financial position is replaced by net assets of S.",
          "cost of investment in S is effectively cancelled against ordinary share capital and reserves of the subsidiary, leaving goodwill as a balance."
        ],
        "answer": 2
      }
    ],
    "practice": [
      {
        "title": "Practice set",
        "question": "CONSOLIDATED SFP | OTQ 1 Petre owns 100% of the share capital of the following companies. The directors are unsure of whether the investments should be consolidated into the group financial statements of not. Identify whether the following companies should be consolidated or not. Consolidated Not to be consolidated Beta is a bank and its activity is so different from the engineering activities of the rest of the group that it would be meaningless to consolidate it. Delta is located in a country where local accounting standards are compulsory and these are not compatible with IFRS Standards used by the rest of the group. Gamma is located in a country where a military coup has taken place and Petre has lost control of the investment for the foreseeable future. 2 Tazer acquired Lowdown, an unincorporated entity, for $2.8 million. A fair value exercise performed on Lowdown’s net assets at the date of purchase showed: How would the purchase be reflected in the consolidated statement of financial position? A Record the net assets at their above values and credit profit or loss with $1.2 million B Record the net assets at their above values and credit goodwill with $1.2 million C Ignore the intangible asset ($500,000), recording the remaining net assets at their values shown above and crediting profit or loss with $700,000 D Record the purchase as a financial asset investment at $2.8 million 3 Which of the following definitions is not included within the definition of control per IFRS 10 Consolidated Financial Statements? A Having power over the investee B Having exposure, or rights, to variable returns from its investment with the investee C Having the majority of shares in the investee D Having the ability to use its power over the investee to affect the amount of the investor’s returns 4 Pamela acquired 80% of the share capital of Samantha on 1 January 20X1. Part of the purchase consideration was $200,000 cash to be paid on 1 January 20X4. The applicable cost of capital is 10%. What will the deferred consideration liability be at 31 December 20X2? A $150,262 B B $165,288 C $200,000 D $181,818 CONSOLIDATED SFP | OTQ 5 Philip acquired 85% of the share capital of Stanley on 1 October 20X1. The profit for the year ended 31 December 20X1 for Stanley was $36,000. Profits are deemed to accrue evenly over the year. At 31 December 20X1 Stanley’s statement of financial position showed: Equity share capital $200,000 Retained earnings $180,000 What were the net assets of Stanley on acquisition? $___________ ,000 6 West has a 75% subsidiary Life, and is preparing its consolidated statement of financial position as at 31 December 20X6. The carrying amount of property, plant and equipment in the two companies at that date is as follows: West $300,000 Life $60,000 On 1 January 20X6 Life had transferred some property to West for $40,000. At the date of transfer the property, which had cost $42,000, had a carrying amount of $30,000 and a remaining useful life of five years. What is the carrying amount of property, plant and equipment in the consolidated statement of financial position of West as at 31 December 20X6? $____________ ,000 7 Which TWO of the following situations are unlikely to represent control over an investee? A Owning 55% and being able to elect 4 of the 7 directors B Owning 51%, but the constitution requires that decisions need the unanimous consent of shareholders C Having currently exercisable options which would take the shareholding in the investee to 55% D Owning 40% of the shares but having majority of voting rights within the investee E Owning 35% of the ordinary shares and 80% of the preference shares of the investee 8 Identify if the following will be recognised as part of the cost of an investment in a subsidiary. Include in cost of investment Do not include in the cost of investment An agreement to pay a further $30,000 if the subsidiary achieves an operating profit of over $100,000 in the first 3 years after acquisition Professional fees of $10,000 in connection with the investment CONSOLIDATED SFP | OTQ The following scenario relates to questions On 1 April 20X4 Penfold acquired 80% of Superted’s equity shares in a share for share exchange. Penfold issued 2 shares for every 5 acquired in Superted. Penfold’s share price on 1 April 20X4 was $5.30. The share exchange has not yet been recorded. Extracts from the individual financial statements of Penfold and Superted as at 30 September 20X4 are shown below. Penfold Superted $000 $000 Property, plant and equipment 345,000 141,000 Trade receivables 32,400 38,000 Equity shares of $1 each 170,000 15,000 Other components of equity (share premium) 6,000 2,000 (i) During the year, Penfold traded with Superted, and had a payable of $6 million at 30 September 20X4. Superted’s receivable balance differed from this due to a $2 million payment from Penfold not being received until October 20X4. (ii) Penfold measures the non‐controlling interest at fair value. At the date of acquisition this was $7.2 million. (iii) Superted made a profit of $24 million for the year ended 30 September 20X4. (iv) Penfold sold an item of plant to Superted on 1 April 20X4 for $25 million when its carrying amount was $20 million. It had a remaining useful life of 5 years at this date. (v) Penfold also owns 30% of Arnold, an unrelated entity. Penfold are not able to appoint any members of the board of Arnold as the other 70% is held by another investor who is able to appoint all members of the board. 9 What will be reported as other components of equity on the consolidated statement of financial position as at 30 September 20X4? A $31,440,000 B $26,640,000 C $28,640,000 D $33,440,000 10 What will be reported as receivables on the consolidated statement of financial position as at 30 September 20X4? $_____________,000 11 What will be reported as non‐controlling interest on the consolidated statement of financial position as at 30 September 20X4? A $9,700,000 B $9,500,000 C $7,200,000 D $9,600,000 12 What will be reported as property, plant and equipment on the consolidated statement of financial position as at 30 September 20X4? $_____________,000 CONSOLIDATED SFP | OTQ 13 How should the investment in Arnold be recorded in the consolidated statement of financial position of Penfold? A A subsidiary B An associate C A financial instrument D A contingent asset",
        "answer": "CONSOLIDATED SFP | OTQ ANS 1. Consolidated Not to be consolidated Beta is a bank and its activity is so different from the engineering activities of the rest of the group that it would be meaningless to consolidate it. ✓ Delta is located in a country where local accounting standards are compulsory and these are not compatible with IFRS Standards used by the rest of the group. ✓ Gamma is located in a country where a military coup has taken place and Petre has lost control of the investment for the foreseeable future. ✓ The investment in Gamma no longer meets the definition of a subsidiary (ability to control) and therefore would not be consolidated. 2. A Is the correct treatment for a bargain purchase (negative goodwill)? 3. C While having the majority of shares may be a situation which leads to control, it does not feature in the definition of control per IFRS 10 Consolidated Financial Statements. 4. D At 31 December 20X2 the deferred consideration needs to be discounted to present value by one year. $200,000/1.1 = $181,818 If you chose C, you have not discounted the consideration. If you chose A, you have not unwound the discount. If you chose B, you have only done the first year calculation. 5. $371,000 To work out the net assets at acquisition, the retained earnings at acquisition must be calculated. The retained earnings at the end of the year are given as $180,000, and there has been a profit of $36,000 for the year. As Philip has owned Stanley for 3 months, then 3 months of this profit is regarded as postacquisition. Therefore $9,000 has been made since acquisition. Once this has been worked out, the retained earnings at acquisition can be calculated by deducting the post‐ acquisition retained earnings of $9,000 from the closing retained earnings of $180,000 to give $171,000. Net assets at acquisition = $200,000 share capital + $171,000 retained earnings = $371,000. 6. $352,000 The unrealised profit on the non‐current asset transfer needs to be removed. The carrying amount at the year‐end after the transfer is $32,000 ($40,000 less 1 year’s depreciation). The carrying amount of the asset if it had not been transferred would have been $24,000 ($30,000 less 1 year’s depreciation). Therefore the unrealised profit on the non‐current asset is $8,000 ($32,000 – $24,000) The total property, plant and equipment is $300,000 + $60,000 – $8,000 = $352,000. CONSOLIDATED SFP | OTQ ANS 7. B, E The fact that unanimous consent is required would suggest that there is no control over the investee. Preference shares carry no voting rights and therefore are excluded when considering the control held over an investee. 8. Include in cost of investment Do not include in cost of investment An agreement to pay a further $30,000 if the subsidiary achieves an operating profit of over $100,000 in the first 3 years after acquisition ✓ Professional fees of $10,000 in connection with the investment ✓ Any incidental costs associated with the acquisition should be expensed as incurred. Contingent consideration can all be included as part of the cost of an investment in a subsidiary. 9. B Share for share exchange: 15m × 80% = 12m shares acquired × 2/5 = 4.8m Penfold shares issued @ $5.30 = $25,440,000 consideration given for Superted. Penfold have issued 4.8m shares so 4.8m will be added to share capital with the remaining $20.64m added to other components of equity. As Penfold currently has $6m other components of equity, the total will be $26,640,000. If you selected C, you have added Superted’s other components of equity, and the subsidiary’s equity is not included in the consolidated equity. If you selected A, you have added the entire share consideration, and if you selected D, you have added the entire share consideration and Superted’s other components of equity. 10. $62,400,000 The cash‐in‐transit must be treated as if received. To do this, $2 million will be added to cash and deducted from receivables. This will leave a $6 million intra‐group receivable balance, which will then be removed along with the $6 million intra‐group payable balance. Total receivables = 32,400 + 38,000 – 2,000 – 6,000 = $62,400,000. 11. A The non‐controlling interest at acquisition will be $7.2 million. Penfold has owned Superted for 6 months so 6 months’ profit should be included in the consolidated financial statements for the year. Therefore the NCI’s share of this will be $2.4 million ($24 million × 6/12 × 20%). The sale of plant from Penfold to Superted requires an adjustment to the depreciation charge recorded within the accounts of Superted. The increase in value of $5 million will result in an additional depreciation charge of $0.5 million ($5m × 1/5 × 6/12) to be reversed as part of the PUP CONSOLIDATED SFP | OTQ ANS adjustment. The NCI’s share of this is $0.5m × 20% = $0.1 million. Therefore NCI = $7.2 million + $2.4 million + $0.1 million = $9.7 million. If you selected B, you deducted the PUP adjustment. If you selected C, you have taken the NCI at acquisition. If you selected D, you have ignored the PUP adjustment. 12. $481,500,000 The unrealised profit on the non‐current asset transfer needs to be removed. The carrying amount at the year‐end after the transfer is $22.5 million ($25 million less 6 months depreciation). The carrying amount of the asset if it had never been transferred would have been $18 million ($20 million less 6 months depreciation). Therefore the unrealised profit on the non‐current asset is $4.5 million. The total PPE is therefore $345 million + $141 million – $4.5 million = $481.5 million. 13. C There is no control or significant influence as Arnold is controlled by the other investor. Therefore the investment in Arnold will be held as an equity investment, which is a financial instrument"
      }
    ]
  },
  {
    "slug": "consolidated-profit-or-loss",
    "title": "Consolidated Statement of Profit or Loss",
    "standard": "IFRS 10",
    "blocks": [
      {
        "title": "Group Parent",
        "items": [
          "Company A (Investor)",
          "Control",
          "Company B (Investee)",
          "Subsidiary"
        ]
      },
      {
        "title": "Mechanics of Consolidation : CSPL (1/2)",
        "items": [
          "• The basic principle of a Consolidated Statement of Profit or Loss (CSPL) is that it shows incomes, expenses and profit of both the parent and subsidiary, as if it was a single economic unit"
        ]
      },
      {
        "title": "Mechanics of Consolidation : CSPL (2/2)",
        "items": [
          "• Preparation of a CSPL follows a series of steps & adjustments as follows:",
          "Step 1 Working 1 : Establish the group structure",
          "Combine the parent’s and subsidiaries own P&Ls by adding line-by-line similar items of Step 2 income and expenses, do not add profit (profit has to be calculated based on income and expenses)",
          "Step 3 Working 2 : NCI’s share of profit",
          "After consolidated net profit is shown, net profit value is split between:",
          "Step 4       • Owners of the parent company (balancing figure)",
          "• Non-controlling interest (from W2)"
        ]
      },
      {
        "title": "W1 : Group Structure",
        "items": [
          "• Identify the parent and its subsidiary",
          "• How much of the subsidiary is owned by the parent",
          "• Date of acquisition and for how long parent has had control over subsidiary",
          "Company X",
          "70%                     X (parent) acquired 70% of Y (subsidiary) on 1st Jan 2020",
          "1st Jan 2020",
          "Company Y Group"
        ]
      },
      {
        "title": "W2 : NCI’s share of profit",
        "items": [
          "A Subsidiary’ net profit as recorded in subsidiary’s own P&L XXX",
          "NCI share of profit (A * NCI%)                              XXX"
        ]
      },
      {
        "title": "Company X acquired 80% Company Y on 31st Dec 2019. Company X and Y made a net profit of USD42 Mn and",
        "items": [
          "USD16 Mn respectively for the year ended 31st Dec 2020.",
          "Net profit of X :     42.0",
          "Owners          Net profit from Y :   12.8",
          "of X           Total net profit :    54.8",
          "Company X",
          "NCI            NCI share of net profit : 3.2",
          "Net profit - 42",
          "80%                20%",
          "Net profit: 12.8                         Net profit : 3.2",
          "Company Y Net profit – 16"
        ]
      },
      {
        "title": "Example 1",
        "items": [
          "ABC acquired 75% of the USD20 million stated capital of Y Ltd on 31st Dec 2008. The summarised statements of profit or loss of the two companies for the year ending 31 December 2010 are set out below Statement of profit or loss for the year ended 31st Dec 2010",
          "Rs.                                      ABC Ltd          Y Ltd",
          "Sales revenue                            75,000        38,000",
          "Cost of sales                          (30,000)       (20,000)",
          "Gross profit                             45,000        18,000",
          "Administrative expenses                (14,000)        (8,000)",
          "Profit before tax                        31,000        10,000",
          "Income tax expense                     (10,000)        (2,000)",
          "Profit for the year                      21,000          8,000",
          "Prepare the consolidated statement of profit or loss for the year ended 31st Dec 2010"
        ]
      },
      {
        "title": "W1: Group structure                                                           W2: NCI’s share of profit",
        "items": [
          "ABC Ltd acquired 75% of Y Ltd on 31st Dec 2008                                Net profit of the subsidiary          8,000",
          "NCI’s share of profit (8,000 * 25%) 2,000",
          "ABC Group Consolidated statement of profit or loss for the year ended 31st Dec 2010",
          "Sales revenue                     (75,000 + 38,000)                113,000",
          "Cost of sales                     (30,000 + 20,000)                (50,000)",
          "Gross profit                                                        63,000",
          "Administrative expenses           (14,000 + 8,000)                 (22,000)",
          "Profit before tax                                                   41,000",
          "Income tax expense                (10,000 + 2,000)                 (12,000)",
          "Profit for the year                                                 29,000",
          "Profit attributable to:",
          "Owners of the parent                                                27,000",
          "Non-controlling interest          W2                                  2,000",
          "29,000"
        ]
      },
      {
        "title": "Intra-group Transactions",
        "items": [
          "• Intra-group transactions are transactions between group companies",
          "• Effect of intra-group transactions must be eliminated from the CSPL, as CSPL is prepared on the assumption of a single economic entity",
          "• Intra-group transactions include:",
          "• Inter-company sales and purchases",
          "• Interest on Inter-company lending and borrowing",
          "• Dividend payments by subsidiary to parent",
          "• Inter-company transfer of non-current assets"
        ]
      },
      {
        "title": "Inter-Company Sales & Purchases",
        "items": [
          "• If parent and subsidiary trade with each other, this will lead to:",
          "• A sales in one company’s statement of profit or loss",
          "• A purchase in the other company’s statement of profit or loss",
          "• These are purchases and sales due to transactions within the group, they must not appear in the CSPL",
          "• They are therefore removed when making the CSPL"
        ]
      },
      {
        "title": "Company M",
        "items": [
          "Company X Parent",
          "Company Y     Purchase USD 1,000",
          "Sales USD 5,000 Subsidiary",
          "XY Group                                                 Cancelling the intra-",
          "Consolidated Statement of Profit or Loss                                  group sales",
          "Sales (P’s sales + S’s sales - 1,000)               XXX",
          "Cost of sales (P’s COS + S’s COS - 1,000)           XXX                Cancelling the intra-group",
          "purchases (purchases is used in calculating COS)"
        ]
      },
      {
        "title": "Dividends",
        "items": [
          "• Dividend received by the parent from the subsidiary need to be eliminated in the CSPL, as its an income from a group company",
          "XY Group Consolidated Statement of Profit or Loss",
          "Investment Income (P’s Investment Income + S’s Investment Income - Dividend paid by S to P)        XXX",
          "• No adjustment in CSPL is required for dividends paid by parent to his shareholders, as it is recorded in consolidated statement of changes in equity",
          "• Only dividends paid by parent to its own shareholders appear in the consolidated statement of changes in equity",
          "• Any dividend income shown in the CSPL must arise from investments other than parent’s investment in subsidiaries or associates Illustration 1"
        ]
      },
      {
        "title": "Interest",
        "items": [
          "• If there is a loan between group companies the effect of any loan interest expense and income must be eliminated from the CSPL",
          "• The relevant amount of interest should be deducted from consolidated interest income and expenses",
          "XY Group Consolidated Statement of Profit or Loss",
          "Finance Income (P’s Finance Income + S’s Finance Income - interest on intra-group loans) XXX",
          "Finance Cost (P’s Finance Cost + S’s Finance Cost - Interest on intra-group loans)         XXX"
        ]
      },
      {
        "title": "Unrealized Profit",
        "items": [
          "• When one group company sells goods to another group company, the company that sold the goods will record a profit in its own P&L",
          "• But in terms of the consolidated financial statements, such profits are Unrealized and must be eliminated from the CSPL, because consolidation assumes parent and subsidiary are a single economic entity",
          "• Such unrealized profits are realized when the company that bought the goods from the other group company sells them to a party outside the group",
          "• Unrealized profit may arise within a group scenario on:",
          "✓ Inventory sold between group companies",
          "✓ Non-current assets sold between group companies"
        ]
      },
      {
        "title": "Unrealized Profit in Inventory",
        "items": [
          "• When one group company sells goods to another, a number of adjustments may be needed",
          "✓ Total value of the transaction need to be eliminated from sales and cost of sales",
          "✓ Where goods are still held by a group company, any unrealized profit on that inventory must be eliminated. This is done by adding the unrealized profit amount to cost of sales (thus decreasing the profit value)",
          "✓ If the seller was the subsidiary, unrealized profit should also be adjusted in the W2: NCI Share of Profit",
          "Illustration 2"
        ]
      },
      {
        "title": "Purchase USD 2,000                   Sales 2,500",
        "items": [
          "Company X                      Company Y",
          "Mr. Smith                                                        Subsidiary",
          "Parent",
          "Profit USD 500",
          "Purchase USD 2,000",
          "Company X                      Company Y",
          "Mr. Smith                                                        Subsidiary",
          "Parent",
          "Profit     USD 0",
          "Group"
        ]
      },
      {
        "title": "Purchase                           Sales                             Sales",
        "items": [
          "USD 2,000   Company X              2,500          Company Y          3,200",
          "Mr. Smith                                                                                Mr. Jack",
          "Parent                             Subsidiary",
          "Profit    Rs.500                  Profit      USD 700",
          "Purchase                                                             Sales",
          "USD 2,000   Company X                             Company Y          3,200",
          "Mr. Smith                                                                                Mr. Jack",
          "Parent                            Subsidiary",
          "Profit      USD 1,200",
          "Group"
        ]
      },
      {
        "title": "XY Group Cancelling the intra-group",
        "items": [
          "Consolidated Statement of Profit or Loss                              sales",
          "Sales (P’s Sales + S’s Sales - intra-group sales)                           XXX",
          "Removing unrealized profit",
          "Cost of Sales (P’s COS + S’s COS - intra-group sales + unrealized profit)   XXX      by adding to COS",
          "Cancelling the intra-group purchases (W2) NCI’s Share of Profit (purchases is a used to calculate COS)",
          "Subsidiary's net profit                                    XXX",
          "Less:",
          "PURP (if subsidiary is the seller only)              (XXX)",
          "Adjusted subsidiary profit                                 XXX",
          "NCI share (% NCI)                                          XXX"
        ]
      },
      {
        "title": "Unrealized Profit in Transfer of Non-current Assets",
        "items": [
          "• If one group company sells a non-current asset to another group company the following adjustments are needed in the CSPL:",
          "✓ Any profit or loss arising on the sale must be removed from the CSPL",
          "• This must only be adjusted in the year of sale",
          "✓ The depreciation charge must be adjusted so that it is based on the cost of the asset to the group (i.e depreciation the seller would have recorded)",
          "• This must be adjusted both in the year of sale and subsequent years till the asset is in use"
        ]
      },
      {
        "title": "Parent is the Seller",
        "items": [
          "At the beginning of the current year parent company sold a car to subsidiary for USD 6,000. The carrying value and remaining useful life of the car at the beginning of the year was USD 4,500 and 3 years XY Group Consolidated Statement of Profit or Loss",
          "Operating Expenses (P’s operating expenses + S’s operating expenses + 1,500 – 500 )                    XXX",
          "(W2) NCI’s Share of Profit                                                                 Excess depreciation",
          "Subsidiary's net profit                                     XXX",
          "Profit on Transfer",
          "Add:                                                                                          (6,000 – 4,500)",
          "Excess dep. on transferred asset                     500",
          "Adjusted subsidiary profit                                  XXX    Dep. charged by subsidiary (6,000/3)           2,000",
          "Dep. parent would have charged (4,500/3)       1,500",
          "NCI Share (% NCI)                                           XXX    Excess Dep.                                      500"
        ]
      },
      {
        "title": "Subsidiary is the Seller",
        "items": [
          "At the beginning of the current year subsidiary company sold a car to parent for USD 12,000. The carrying value and remaining useful life of the car at the beginning of the year was USD 9,000 and 3 years XY Group Consolidated Statement of Profit or Loss",
          "Operating Expenses (P’s operating expenses + S’s operating expenses + 3,000 – 1,000 )                   XXX",
          "(W2) NCI’s Share of Profit                                                                 Excess depreciation",
          "Subsidiary's net profit                                    XXX",
          "Profit on Transfer",
          "Less:                                                                                        (12,000 – 9,000)",
          "Profit on transfer on non-current asset            (3,000)",
          "Adjusted subsidiary profit                                 XXX     Dep. charged by parent (12,000/3)              4,000",
          "Dep. subsidiary would have charged (9,000/3) 3,000",
          "NCI Share (% NCI)                                          XXX     Additional Dep.                                1,000"
        ]
      },
      {
        "title": "Goodwill Impairment",
        "items": [
          "• When a goodwill impairment is identified in the current year, the impairment loss should be charged to the CSPL",
          "• Note that goodwill impairment will not be recorded in the own P&L of the parent or subsidiary, as goodwill is only recognized in the CSFP",
          "• Goodwill impairment is usually charged to operating expenses, however always follow instructions from the examiner",
          "• If NCI has been valued at Fair Value, a impairment expense must be removed from the W2: NCI Share of Profit."
        ]
      },
      {
        "title": "Impairment of goodwill (2/2)",
        "items": [
          "XY Group Consolidated Statement of Profit or Loss",
          "Operating Expenses (P’s + S’s + GW Impairment)                        XXX",
          "(W2) NCI’s Share of Profit",
          "Subsidiary's net profit                                        XXX",
          "Less: Goodwill impairment (FV Method Only)                (XX)",
          "Adjusted subsidiary profit                                     XXX",
          "NCI share (% NCI)                                              XXX"
        ]
      },
      {
        "title": "Fair Value Adjustments",
        "items": [
          "• On acquisition date, If the carrying amount of a depreciating non-current asset of the subsidiary is different to its fair value, fair value adjustments are done in W2: Net assets of the subsidiary in CSFP both for initial fair value difference and post-acquisition fair value depreciation",
          "• The fair value depreciation adjustment must also be done in the CSPL in respect of the current year depreciation",
          "• The subsidiary’s own P&L will include depreciation based on the carrying amount of the asset at acquisition date",
          "• The CSPL must include a depreciation charge based on the fair value of the asset on acquisition date",
          "• Difference in these depreciation must therefore be calculated and charged to the CSPL",
          "• Difference in depreciation must also be adjusted to the W2: NCI Share of Profit"
        ]
      },
      {
        "title": "Fair values adjustment",
        "items": [
          "XY Group Consolidated Statement of Profit or Loss",
          "Operating Expenses (P’s + S’s + FV Depreciation)                       XXX",
          "(W2) NCI’s Share of Profit",
          "Subsidiary's Net Profit *                                               XXX",
          "Less: FV Deprecation                                               (XX)",
          "Adjusted Subsidiary Profit                                              XXX",
          "NCI Share (% NCI)                                                       XXX"
        ]
      },
      {
        "title": "Mid-year Acquisition",
        "items": [
          "If a subsidiary is acquired part way through the year, then the subsidiary’s results should only be consolidated from the date of acquisition, i.e. the date on which control is obtained",
          "In practice this will require:",
          "• Time apportionment of the income and expenses of the subsidiary in the year of acquisition. For this purpose, unless indicated otherwise, assume that revenue and expenses are earned and incurred evenly",
          "• In W2: NCI share of net profit make sure only profit of the subsidiary earned after acquisition is taken to calculate NCI’s share"
        ]
      },
      {
        "title": "Mid-year Acquisition",
        "items": [
          "Subsidiary’s last 9 months’ income and expenses Parent’s full year income and expense",
          "1st Jan 2020    1st April 2020                                         31st Dec 2020",
          "Acquisition                                                Reporting",
          "date                                                      date"
        ]
      },
      {
        "title": "Other Comprehensive Income",
        "items": [
          "• Other comprehensive income of the parent and subsidiary are added together in the same way as income and expenses in the P&L",
          "• Total comprehensive income (net profit + OCI) is then allocated between the owners of the parent and non-controlling interest as we did for P&L",
          "• Total comprehensive income attributable to NCI is the total of the profit attributable to NCI (from W2) and OCI attributable to NCI"
        ]
      },
      {
        "title": "W2 : NCI’s share of profit",
        "items": [
          "Subsidiary’ net profit as recorded in sub’s own financial statements                              XXX",
          "Unrealized profit on inventory/ transferred non-current asset (if subsidiary is the seller) (XXX)",
          "Excess dep. on transferred non-current asset (if subsidiary is the buyer)                     XXX",
          "Goodwill impairment (If FV method)                                                            (XXX)",
          "Fair value depreciation                                                                       (XXX)",
          "A Subsidiary’s adjusted profit                                                                      XXX",
          "NCI share of profit (A * NCI%)                                                                    XXX",
          "Should be time apportioned, if it’s a mid-year acquisition"
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "The basic principle of a Consolidated Statement of Profit or Loss (CSPL) is that it shows incomes, expenses and profit of both the parent and subsidiary, as if it was a single economic unit",
          "Preparation of a CSPL follows a series of steps & adjustments as follows:",
          "Identify the parent and its subsidiary",
          "How much of the subsidiary is owned by the parent"
        ],
        "answer": 0
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Identify the parent and its subsidiary",
          "How much of the subsidiary is owned by the parent",
          "Date of acquisition and for how long parent has had control over subsidiary",
          "Preparation of a CSPL follows a series of steps & adjustments as follows:"
        ],
        "answer": 3
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Date of acquisition and for how long parent has had control over subsidiary",
          "Company X acquired 80% Company Y on 31st Dec 2019. Company X and Y made a net profit of USD42 Mn and USD16 Mn respectively for the year ended 31st Dec 2020.",
          "Identify the parent and its subsidiary",
          "How much of the subsidiary is owned by the parent"
        ],
        "answer": 2
      }
    ],
    "practice": []
  },
  {
    "slug": "associates-joint-ventures",
    "title": "Associates & Joint Ventures",
    "standard": "IAS 28 / IFRS 11",
    "blocks": [
      {
        "title": "IAS 28",
        "items": [
          "INVESTMENTS IN ASSOCIATES & JOINT VENTURES",
          "• Associate is an entity over which the investor has significant influence and that is neither a subsidiary nor an interest in a joint venture",
          "• Significant influence is the power to participate in the financial and operating policy decisions of the investee but is not control or joint control over those policies.",
          "• Significant influence is assumed with a shareholding of 20% to 50%",
          "Icon Business School"
        ]
      },
      {
        "title": "• This method of accounting for an associate is called Equity Accounting",
        "items": [
          "• In order to equity account, the parent company must already be producing consolidated financial statements",
          "• The equity method should not be used if:",
          "✓ The investment is classified as Held for Sale in accordance with IFRS 5 or",
          "✓ The parent is exempted from having to prepare consolidated accounts on the grounds that it is itself a wholly, or partially, owned subsidiary of another company",
          "Icon Business School"
        ]
      },
      {
        "title": "BASIC PRINCIPLES",
        "items": [
          "Consolidated Statement of Financial Position Includes:",
          "▪ 100% of the assets and liabilities of the parent and subsidiary company on a line by line basis (Do not include associate's assets and liabilities)",
          "▪ An ‘Investments in Associates’ line within non-current assets which includes the cost of the investment plus the group share of post-acquisition reserves",
          "▪ Remember to eliminate the cost of the investment in associate from parent’s investment value when adding line by line",
          "Consolidated Statement of Profit or Loss Includes:",
          "▪ 100% of the income and expenses of the parent and subsidiary company on a line by line basis (Do not include associate’s income and expenses)",
          "• One line ‘Share of Profit of Associates’ which includes the group share of any associate’s profit after tax Icon Business School"
        ]
      },
      {
        "title": "W6 Investment in Associate Company",
        "items": [
          "Cost of Investment                        XXX",
          "P’s % of A’s post acquisition reserve     XXX",
          "Less Impairment loss to-date (Associate) (XX)",
          "PURP (when P sells to A)              (XX)",
          "XXX",
          "Illustration 1 Icon Business School"
        ]
      },
      {
        "title": "ASSOCIATES IN THE CONSOLIDATED BALANCE SHEET",
        "items": [
          "W5 Group Retained Earnings",
          "100% Parent R/E                                         XXX",
          "P’s % of S’s post acquisition R/E                       XXX",
          "P’s % of A’s post acquisition R/E                       XXX",
          "Less Impairment of Goodwill loss to-date (Subsidiary) (XX)",
          "Impairment loss to-date (Associate)                (XX)",
          "PURP (where P sells to S)                          (XX)",
          "PURP (where P/S sells to A and A sells to P/S)     (XX)",
          "XXX",
          "P/S – Parent company or a subsidiary Icon Business School"
        ]
      },
      {
        "title": "Balances with the Associate",
        "items": [
          "• Generally the associate is considered to be outside the group. Therefore balances between group companies (parent and subsidiaries) and the associate will remain in the consolidated statement of financial position",
          "• If a group company trades with the associate, the resulting payables and receivables will remain in the consolidated statement of financial position",
          "Icon Business School"
        ]
      },
      {
        "title": "Unrealized Profit in Inventory",
        "items": [
          "• Unrealized profits on trading between group and associate must be eliminated to the extent of the investor's interest (i.e. % owned by parent).",
          "• Adjustment must be made for unrealized profit in inventory as follows:",
          "• Determine the value of closing inventory which is the result of a sale to or from the associate",
          "• Use markup/ margin to calculate the profit earned by the selling company",
          "• Calculate the Parent’s % of PURP",
          "• Make the required adjustments as below:",
          "TUU 1, 2 & 3",
          "Icon Business School"
        ]
      },
      {
        "title": "Unrealized Profit",
        "items": [
          "•Upstream Upstream Transaction (Associate sells to parent/subsidiary) Transactions Parent/ Sub",
          "• Consolidated P&L Dr Associate share of profit",
          "• Consolidated Balance Sheet Associate Dr Group retained earnings Cr Group Inventory",
          "• Downstream Downstream Transactions Transact (Parent/Subsidiary sells to Associate) Parent/ Sub",
          "• Consolidated P&L Dr Group Cost of Sales",
          "• Consolidated Balance Sheet Associate Dr Group retained earnings Cr Investment in associate",
          "Icon Business School"
        ]
      },
      {
        "title": "ASSOCIATES IN THE CONSOLIDATED P&L",
        "items": [
          "The equity method of accounting requires that the Consolidated Statement of Profit or Loss:",
          "• Does not include dividends from the associate (dividends from associate must be eliminated)",
          "• Instead includes Group Share of the Associate’s Profit (included below group profit from operations).",
          "W7 Share of Associate Profit",
          "Parent’s % of A’s profit after tax for the year                XXX",
          "Less:",
          "Impairment of associate for the current year               (XX)",
          "PURP (if A sells to P)                                     (XX)",
          "XXX",
          "Icon Business School"
        ]
      },
      {
        "title": "Trading with the associate",
        "items": [
          "• Generally the associate is considered to be outside the group",
          "• Therefore any sales or purchases between group companies and the associate are not eliminated and will remain part of the consolidated figures in the P&L",
          "• It is normal practice to instead adjust for the PURP in inventory. Only P’s % of the PURP must be adjusted",
          "• Dividends from associates are excluded from the consolidated P&L; the group share of the associate’s profit is included instead",
          "Illustration 2 & TUU 4",
          "Icon Business School"
        ]
      },
      {
        "title": "Joint Arrangement",
        "items": [
          "Company X                   Company Y                  A joint arrangement is an arrangement of",
          "(Investor)                  (Investor)",
          "which two or more parties have joint",
          "Joint Control                               Joint Control   control",
          "Joint Control Joint control is the contractually agreed sharing of control of an arrangement,",
          "Business                              which exists only when decisions about the",
          "Joint Arrangement                          relevant activities require the unanimous",
          "consent of the parties sharing control"
        ]
      },
      {
        "title": "Joint Arrangement",
        "items": [
          "Joint Operation                                             Joint Venture",
          "A joint operation is a joint arrangement          A joint venture is a joint arrangement",
          "whereby the parties that have joint               whereby the parties that have joint",
          "control of the arrangement have rights to         control of the arrangement have rights",
          "the assets, and obligations for the               to the net assets of the arrangement",
          "liabilities, relating to the arrangement Parties that have joint control are",
          "Parties that have joint control are called        called joint venturers",
          "joint operators",
          "Normally, there will not be a separate            This will normally be established in the",
          "entity established to conduct joint               form of a separate entity to conduct",
          "operations.                                       the joint venture activities."
        ]
      },
      {
        "title": "Joint Operations",
        "items": [
          "Example of a joint operation A and B decide to enter into a joint operation to produce a new product. A undertakes one manufacturing process and B undertakes the other. A and B have agreed that decisions regarding the joint operation will be made unanimously and that each will bear their own expenses and take an agreed share of the sales revenue from the product.",
          "If the joint operation meets the definition of a 'business' then the principles in IFRS 3 Business Combinations apply when an interest in a joint operation is acquired:",
          "1. Acquisition costs are expensed to profit or loss as incurred",
          "2. The identifiable assets and liabilities of the joint operation are measured at fair value",
          "3. The excess of the consideration transferred over the fair value of the net assets acquired is recognised as goodwill."
        ]
      },
      {
        "title": "Joint Operations",
        "items": [
          "• At the reporting date, the individual financial statements of each joint operator will recognise:",
          "1. its share of assets held jointly",
          "2. its share of liabilities incurred jointly",
          "3. its share of revenue from the joint operation",
          "4. its share of expenses from the joint operation.",
          "• The joint operator's share of the income, expenses, assets and liabilities of the joint operation are included in its individual financial statements and so they will automatically flow through to the consolidated financial statements."
        ]
      },
      {
        "title": "Joint Ventures",
        "items": [
          "Example of a joint venture A and B decide to set up a separate entity, C, to enter into a joint venture. A will own 55% of the equity capital of C, with B owning the remaining 45%. A and B have agreed that decision- making regarding the joint venture will be unanimous. Neither party will have direct right to the assets, or direct obligation for the liabilities of the joint venture; instead, they will have an interest in the net assets of entity C set up for the joint venture. In the individual financial statements, an investment in a joint venture can be accounted for:",
          "1. at cost",
          "2. in accordance with IFRS 9 Financial Instruments, or",
          "3. by using the equity method. In the consolidated financial statements, the interest in the joint venture entity will be accounted for using the equity method in accordance with IAS 28 Investments in Associates and Joint Ventures. The treatment of a joint venture in the consolidated financial statements is therefore identical to the treatment of an associate. TUU 13 & Illustration 5"
        ]
      },
      {
        "title": "Associates: Significant Influence",
        "items": [
          "• Significant influence is the power to participate in, but not control, the financial and operating policy decisions of an entity",
          "• The existence of significant influence normally entails at least one of the following:",
          "1. representation on the board of directors",
          "2. ability to influence policy making",
          "3. significant levels of transactions between the entity and the investee",
          "4. management personnel being shared between the entity and the investee",
          "5. provision of important technical information."
        ]
      },
      {
        "title": "Associates: General Principles",
        "items": [
          "• IAS 28 notes the following:",
          "1. The financial statements used to equity account for the associate should be drawn up to the investor’s reporting date. If this is not possible, then the difference in reporting dates should be less than three months.",
          "2. The associate's accounting policies should be harmonised with those of its investor.",
          "3. The investor should disclose its share of the associate's contingencies."
        ]
      },
      {
        "title": "ASSOCIATES IN THE CONSOLIDATED BALANCE SHEET",
        "items": [
          "W6 Investment in Associate Company",
          "Cost of Investment                                        XXX",
          "P’s % of A’s post acquisition reserve                     XXX",
          "Less",
          "Impairment loss to-date (Associate)                   (XX)",
          "PURP (when P sells to A)                              (XX)",
          "P% of excess depreciation on fair value adjustments (XX) XXX"
        ]
      },
      {
        "title": "ASSOCIATES IN THE CONSOLIDATED BALANCE SHEET",
        "items": [
          "W5 Group Retained Earnings",
          "100% Parent R/E                                            XXX",
          "P’s % of S’s post acquisition R/E                          XXX",
          "P’s % of A’s post acquisition R/E                          XXX",
          "Less",
          "Impairment of Goodwill loss to-date (Subsidiary)      (XX)",
          "Impairment loss to-date (Associate)                   (XX)",
          "PURP (where P sells to S)                             (XX)",
          "PURP (where P/S sells to A and A sells to P/S)        (XX)",
          "P% of excess depreciation on fair value adjustments (XX) XXX",
          "P/S – Parent company or a subsidiary"
        ]
      },
      {
        "title": "ASSOCIATES IN THE CONSOLIDATED P&L",
        "items": [
          "The equity method of accounting requires that the Consolidated Statement of Profit or Loss:",
          "• Does not include dividends from the associate (dividends from associate must be eliminated)",
          "• Instead includes Group Share of the Associate’s Profit (included below group profit from operations).",
          "W7 Share of Associate Profit",
          "Parent’s % of A’s profit after tax for the year               XXX",
          "Less:",
          "Impairment of associate for the current year              (XX)",
          "P% of excess depreciation on fair value adjustments       (XX)",
          "PURP (if A sells to P)                                    (XX)",
          "XXX",
          "Icon Illustration 3 Business School"
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Associate is an entity over which the investor has significant influence and that is neither a subsidiary nor an interest in a joint venture",
          "Significant influence is the power to participate in the financial and operating policy decisions of the investee but is not control or joint control over those policies.",
          "Significant influence is assumed with a shareholding of 20% to 50%",
          "The method of accounting for an associate is called Equity Accounting"
        ],
        "answer": 0
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Significant influence is assumed with a shareholding of 20% to 50%",
          "The method of accounting for an associate is called Equity Accounting",
          "In order to equity account, the parent company must already be producing consolidated financial statements",
          "Significant influence is the power to participate in the financial and operating policy decisions of the investee but is not control or joint control over those policies."
        ],
        "answer": 3
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "In order to equity account, the parent company must already be producing consolidated financial statements",
          "The equity method should not be used if:",
          "Significant influence is assumed with a shareholding of 20% to 50%",
          "The method of accounting for an associate is called Equity Accounting"
        ],
        "answer": 2
      }
    ],
    "practice": []
  },
  {
    "slug": "changes-in-group-structure",
    "title": "Changes in Group Structure",
    "standard": "IFRS 3 / IFRS 10",
    "blocks": [
      {
        "title": "Mid-year Acquisition",
        "items": [
          "• Covered in the CSFP and CSPL recordings"
        ]
      },
      {
        "title": "Step Acquisition",
        "items": [
          "• A step acquisition occurs when the parent company acquires control over the subsidiary in stages. This is achieved by buying blocks of shares at different times. Acquisition accounting is only applied at the date when control is achieved.",
          "• Any pre-existing equity interest in an entity is accounted for according to:",
          "1. IFRS 9 in the case of financial instruments",
          "2. IAS 28 in the case of associates and joint ventures",
          "3. IFRS 11 in the case of joint arrangements other than joint ventures."
        ]
      },
      {
        "title": "Step Acquisition",
        "items": [
          "• At the date when the equity interest is increased and control is achieved in consolidated FSs:",
          "1. Re-measure the previously held equity interest to fair value",
          "2. Recognize the resulting gain or loss in profit or loss for the year (or in other comprehensive income if the shares had been designated to be measured at fair value through other comprehensive income)",
          "3. Calculate goodwill and the non-controlling interest on either a partial or full basis.",
          "For the purposes of the goodwill calculation, the consideration will be the fair value of the previously held equity interest plus the fair value of the consideration transferred for the most recent purchase of shares at the acquisition date."
        ]
      },
      {
        "title": "Step Acquisition",
        "items": [
          "Subsidiary’s last 9 months’ income and expenses Parent’s full year income and expense",
          "1st Jan 2020     1st April 2020                                         31st Dec 2020",
          "Acquisition                                                Reporting",
          "date                                                      date"
        ]
      },
      {
        "title": "W3 : Goodwill",
        "items": [
          "• Calculation of goodwill on acquisition can be detailed out as follows in W3:",
          "FV of the previously held interest                       XXX",
          "Fair value of consideration for additional interest      XXX",
          "Non-controlling interest on acquisition                  XXX",
          "XXX",
          "FV of the identifiable net assets acquired (from W2) (XXX)",
          "Goodwill on acquisition date                             XXX",
          "Impairment to date                                      (XXX)",
          "Goodwill at reporting date                               XXX"
        ]
      },
      {
        "title": "Step Acquisition",
        "items": [
          "• Any gains and losses recognised in other comprehensive income from the re- measurement of any previously held equity interests cannot be reclassified to profit or loss.",
          "• Purchasing further shares in a subsidiary after control has been acquired (for example taking the group interest from 60% to 75%) is regarded as a transaction between equity holders. Goodwill is not recalculated. This situation is dealt with separately in this chapter.",
          "Illustration 2 and TUU 1"
        ]
      },
      {
        "title": "Control to Control Scenarios",
        "items": [
          "Increasing a shareholding in a subsidiary (e.g. 80% to 85%) When a parent company increases its shareholding in a subsidiary, this is not treated as an acquisition in the group financial statements. For example, if the parent holds 80% of the shares in a subsidiary and buys 5% more, then the relationship remains one of a parent and subsidiary. However, the NCI holding has decreased from 20% to 15%. The accounting treatment of the above situation is as follows:",
          "1. The NCI within equity decreases",
          "2. The difference between the consideration paid for the extra shares and the decrease in the NCI is accounted for within equity (normally, in 'other components of equity'). Note that no profit or loss arises on the purchase of the additional shares. Goodwill is not recalculated."
        ]
      },
      {
        "title": "Control to Control Scenarios",
        "items": [
          "Sale of shares without losing control (e.g. 80% to 75%) From the perspective of the group accounts, a sale of shares which results in the parent retaining control over the subsidiary is simply a transaction between shareholders. If the parent company holds 80% of the shares of a subsidiary but then sells a 5% holding, a relationship of control still exists. As such, the subsidiary will still be consolidated in the group financial statements. However, the NCI has risen from 20% to 25%. The accounting treatment of the above situation is as follows:",
          "1. The NCI within equity is increased",
          "2. The difference between the proceeds received and the increase in the non-controlling interest is accounted within equity (normally, in 'other components of equity'). Note that no profit or loss arises on the sale of the shares. Goodwill is not recalculated."
        ]
      },
      {
        "title": "Control to Control Scenarios",
        "items": [
          "TUU 6 – H/W & TUU 7"
        ]
      },
      {
        "title": "Subsidiary Acquired to Resell",
        "items": [
          "• A subsidiary acquired exclusively with a view to resale is not exempt from consolidation. However, if it meets the 'held for sale' criteria in IFRS 5 Non-current Assets Held for Sale and Discontinued Operations:",
          "1. it is presented in the financial statements as a disposal group classified as held for sale. This is achieved by amalgamating all its assets into one line item and all its liabilities into another",
          "2. it is measured, both on acquisition and at subsequent reporting dates, at fair value less costs to sell.",
          "3. Its results are aggregated into a single line on the face of the consolidated statement of profit or loss under discontinued operations. This is presented immediately after profit for the period from continuing operations.",
          "The 'held for sale' criteria in IFRS 5 include the requirements that:",
          "1. the subsidiary is available for immediate sale",
          "2. the sale is highly probable",
          "3. it is likely to be disposed of within one year of the date of its acquisition. A newly acquired subsidiary which meets these held for sale criteria automatically meets the criteria for being presented as a discontinued operation."
        ]
      },
      {
        "title": "Disposal of an Associate",
        "items": [
          "• When significant influence over an associate is lost - most likely as a result of a share sale – then the investment in the associate is derecognised. Any shares retained are likely to fall within the scope of IFRS 9 Financial Instruments and should be recognised at fair value.",
          "• A profit or loss on disposal will arise in the consolidated statement of profit or loss. This is calculated as follows:"
        ]
      },
      {
        "title": "Group Reorganization",
        "items": [
          "A group reorganisation (or restructuring) is any of the following: (a) the transfer of shares in a subsidiary from one group entity to another (b) the addition of a new parent entity to a group (c) the transfer of shares in one or more subsidiaries of a group to a new entity that is not a group entity but whose shareholders are the same as those of the group’s parent (d) the combination into a group of two or more companies that before the combination had the same shareholders (e) the acquisition of the shares of another entity that itself then issues sufficient shares so that the acquired entity has control of the combined entity."
        ]
      },
      {
        "title": "Group Reorganization",
        "items": [
          "Reorganisations and individual financial statements",
          "• A parent may reorganise the structure of its group by establishing a new entity as its parent. In this case, as long as certain criteria are met, the new parent records the cost of the original parent in its separate financial statements as the carrying amount of 'its share of the equity items shown in the separate financial statements of the original parent at the date of the reorganisation’. The criteria that must be met are as follows:",
          "• The new parent obtains control of the original parent by issuing equity instruments in exchange for existing equity instruments of the original parent",
          "• The assets and liabilities of the new group and the original group are the same immediately before and after the reorganization",
          "• The owners of the original parent before the reorganisation have the same absolute and relative interests in the net assets of the original group and the new group immediately before and after the reorganisation' The above rule also applies when an entity that is not a parent establishes a new entity as its parent."
        ]
      },
      {
        "title": "Group Reorganization",
        "items": [
          "Reorganisations and consolidated financial statements Assuming that all subsidiaries are 100% owned, a group reorganization generally has no impact on the consolidated financial statements. This is because assets and investments are being moved around within the group.",
          "TUU 9 – H/W"
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Covered in the CSFP and CSPL recordings",
          "A step acquisition occurs when the parent company acquires control over the subsidiary in",
          "stages. This is achieved by buying blocks of shares at different times. Acquisition",
          "accounting is only applied at the date when control is achieved."
        ],
        "answer": 0
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "stages. This is achieved by buying blocks of shares at different times. Acquisition",
          "accounting is only applied at the date when control is achieved.",
          "Any pre-existing equity interest in an entity is accounted for according to:",
          "A step acquisition occurs when the parent company acquires control over the subsidiary in"
        ],
        "answer": 3
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Any pre-existing equity interest in an entity is accounted for according to:",
          "IFRS 9 in the case of financial instruments",
          "stages. This is achieved by buying blocks of shares at different times. Acquisition",
          "accounting is only applied at the date when control is achieved."
        ],
        "answer": 2
      }
    ],
    "practice": []
  },
  {
    "slug": "group-disposals",
    "title": "Group Disposals",
    "standard": "IFRS 10 / IFRS 5",
    "blocks": [
      {
        "title": "Group Parent",
        "items": [
          "Company A",
          "Control",
          "Company B Subsidiary",
          "Icon Business School"
        ]
      },
      {
        "title": "Disposal of a Subsidiary",
        "items": [
          "• When a shareholding in a subsidiary is disposed of it must be reflected in:",
          "• The parent company’s individual accounts and",
          "• The group accounts (Consolidated accounts)"
        ]
      },
      {
        "title": "Disposal of a Subsidiary (1/2)",
        "items": [
          "• IFRS 10 requires the results of subsidiary to be included in the consolidated financial statements from:",
          "Acquisition Date                                     Disposal Date",
          "The date on which the investor                        The date the investor loses",
          "obtains control of the investee                         control of the investee",
          "• Where a subsidiary is disposed of in an accounting period:",
          "• Its results are consolidated until the date of disposal",
          "• A profit or loss on disposal is calculated and reported in the CSPL",
          "• All or some of the shares held in a subsidiary may be sold in an accounting period",
          "• However, only a full disposal of all the shares of the subsidiary need to be considered at this level"
        ]
      },
      {
        "title": "Disposal of a Subsidiary (2/2)",
        "items": [
          "• Where a subsidiary is sold, the impact on the consolidated financial statements is as follows:",
          "• Consolidated Statement of Financial Position",
          "• Neither the assets and liabilities of the subsidiary nor any equity and non-controlling interest is recognized at the reporting date",
          "• Remember that the statement of financial position is a 'snapshot in time' and if the subsidiary has been sold by the year end, then it will not be represented at all",
          "• Profit from disposal of the subsidiary should be recorded under W5: Group retained earnings",
          "• Consolidated Statement of Profit or Loss and Other Comprehensive Income",
          "• The incomes and expenses of the subsidiary are consolidated until the date of disposal",
          "• Therefore the subsidiary's incomes and expenses must be pro-rated/ time apportioned",
          "• A group profit or loss on disposal is reported"
        ]
      },
      {
        "title": "Consolidated SFP",
        "items": [
          "By the reporting date, as the subsidiary is no longer a part of the group, subsidiary’s assets, liabilities and equity are not shown in the CSFP as at the reporting date",
          "1st Jan 2020                           31st Oct 2020   31st Dec 2020",
          "Disposal Date     Reporting",
          "date"
        ]
      },
      {
        "title": "Consolidated SPL",
        "items": [
          "Subsidiary’s first 10 months’ income and expenses",
          "Parent’s full year income and expenses",
          "1st Jan 2020                                                        31st Oct 2020   31st Dec 2020",
          "Disposal Date     Reporting",
          "date"
        ]
      },
      {
        "title": "Profit on Disposal",
        "items": [
          "• Two profit or loss figures are relevant on the disposal of a subsidiary:",
          "• Profit or loss in the parent company's individual financial statements",
          "• Profit or loss figure in the consolidated financial statements",
          "• In both cases, the profit or loss is calculated as the difference between consideration received (disposal proceeds) and carrying amount, but the carrying amount of a subsidiary is different in the parent's individual financial statements and the consolidated financial statements"
        ]
      },
      {
        "title": "Profit on Disposal :",
        "items": [
          "Parent Company’s Individual FSs",
          "• Profit/loss on full disposal of a subsidiary in parent company’s individual financial statements is calculated as follows:",
          "Fair value of the consideration received                         XXX",
          "Remove this",
          "Carrying amount of the investment                               (XXX)                  from Parent’s",
          "Profit/ loss                                                     XXX                   Balance Sheet",
          "• In most cases, the carrying amount of the investment is cost in the parent's statement of financial position",
          "• The gain is reported as an exceptional item :",
          "• Must be disclosed separately on the face of the parent’s P&L",
          "• After profit from operations.",
          "• Any tax on the gain is calculated by looking at the tax on the gain in the parent's individual financial statements."
        ]
      },
      {
        "title": "Profit on Disposal :",
        "items": [
          "Consolidated FSs",
          "• Group profit/loss on full disposal of a subsidiary in consolidated financial statements is calculated as follows:",
          "Fair value of the consideration received                                                    XXX",
          "Carrying amount of the subsidiary",
          "Net assets of the subsidiary at disposal date                    XXX",
          "Goodwill at disposal date                                        XXX",
          "Less: NCI at disposal date                                      (XXX)                  (XXX)",
          "Profit/ loss                                                                                XXX",
          "Can be calculated as: Net assets opening balance + Profit of Sub till disposal – dividend paid before disposal +/- FV adjustments",
          "Prepare W2: net assets of the sub working as at disposal date instead of reporting date"
        ]
      },
      {
        "title": "Example : Disposal of a Subsidiary",
        "items": [
          "P Co has owned 80% of the shares in S Co for several years, acquired originally at a cost of $ 180m. At the date of acquisition, the fair value of the NCI was $ 50m and net assets were $ 200m. Since acquisition, there has been no impairment of goodwill On 1 September 20X4, P Co disposed of its shareholding in S Co for $ 285m when net assets of that company were $ 300m",
          "Required What profit on disposal is reported in: (i) P Co's individual financial statements (assuming that the investment is carried at cost)? (ii) The P Group consolidated financial statements?"
        ]
      },
      {
        "title": "Example : Disposal of a Subsidiary",
        "items": [
          "$ Million Parent Company’s Individual FSs",
          "Fair value of the consideration received                           285",
          "Carrying amount of the investment                                (180)",
          "Profit/ loss                                                       105",
          "Consolidated FSs",
          "Fair value of the consideration received                          285",
          "Carrying amount of the subsidiary Net assets of the subsidiary at disposal date 300",
          "Goodwill at disposal date (180+50-200)            30",
          "Less: NCI at disposal date (50+ 20%*(300-200))   (70)       (260)",
          "Profit/ loss                                                       25"
        ]
      },
      {
        "title": "Group Retained Earnings after Disposal",
        "items": [
          "Group retained earnings to be included in the CSFP after a disposal is calculated as follows: Method 1",
          "Parent’s retained earnings *                                                               XXX",
          "Profit/ loss on disposal in parent’s individual P&L                                        XXX",
          "Group retained earnings                                                                    XXX",
          "Method 2",
          "Parent’s retained earnings *                                                                   XXX",
          "Parent’s % subsidiary’s post-acquisition retained earnings until disposal date                 XXX",
          "Group profit/ loss on disposal in consolidated P&L                                             XXX",
          "Group retained earnings                                                                        XXX",
          "• Parent’s retained earnings before accounting for the profit/loss on disposal of subsidiary",
          "TUU 1 & 2"
        ]
      },
      {
        "title": "If Subsidiary Represents a Discontinued Operation",
        "items": [
          "• Disposing of a subsidiary may meet the definition of a discontinued operation in accordance with IFRS 5 and would then be presented as such",
          "• This would mean that in the statement of profit or loss, the disposal will be presented as one line 'Profit/(loss) from Discontinued Operations', rather than being consolidated line by line"
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "When a shareholding in a subsidiary is disposed of it must be reflected in:",
          "The parent company’s individual accounts and",
          "The group accounts (Consolidated accounts)",
          "IFRS 10 requires the results of subsidiary to be included in the consolidated financial statements from:"
        ],
        "answer": 0
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "The group accounts (Consolidated accounts)",
          "IFRS 10 requires the results of subsidiary to be included in the consolidated financial statements from:",
          "Where a subsidiary is disposed of in an accounting period:",
          "The parent company’s individual accounts and"
        ],
        "answer": 3
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Where a subsidiary is disposed of in an accounting period:",
          "Its results are consolidated until the date of disposal",
          "The group accounts (Consolidated accounts)",
          "IFRS 10 requires the results of subsidiary to be included in the consolidated financial statements from:"
        ],
        "answer": 2
      }
    ],
    "practice": []
  },
  {
    "slug": "adoption-new-standards-smes",
    "title": "First-time Adoption, New Standards & IFRS for SMEs",
    "standard": "IFRS 1 / IAS 8 / IFRS for SMEs",
    "blocks": [
      {
        "title": "First time adoption of International Financial Reporting Standards",
        "items": [
          "• Although not as significant as they once were, differences remain between IFRS Standards and national standards. Therefore, an accounting issue arises when an entity adopts IFRS Standards for the first time.",
          "• IFRS 1 First-time Adoption of International Financial Reporting Standards sets out the procedures to follow when an entity adopts IFRS Standards in its published financial statements for the first time.",
          "• IFRS 1 defines a first-time adopter as an entity that, for the first time, makes an explicit and unreserved statement that its annual financial statements comply with IFRS Standards.",
          "• There are five issues that need to be addressed when adopting IFRS Standards:",
          "1. The date of transition to IFRS Standards",
          "2. Which IFRS Standards should be adopted",
          "3. How gains or losses arising on adopting IFRS Standards should be accounted for",
          "4. The explanations and disclosures to be made in the year of transition",
          "5. The exemptions available."
        ]
      },
      {
        "title": "1. Date of Transition",
        "items": [
          "• The date of transition is the 'beginning of the earliest period for which an entity presents full comparative information under IFRS Standards in its first financial statements produced using IFRS Standards’",
          "• If an entity adopts IFRS Standards for the first time for the year ended 31 December 20X8 and presents one year of comparative information then the date of transition is 1 January 20X7 (i.e. the first day of the comparative period).",
          "• An opening IFRS statement of financial position should be produced as at the date of transition. This statement need not be published, but it will provide the opening balances for the comparative period."
        ]
      },
      {
        "title": "2. Which IFRS Standards Should be Adopted?",
        "items": [
          "• The entity should use the same accounting policies for all the periods presented. These policies should be based solely on IFRS Standards in force at the reporting date.",
          "• A major problem for entities preparing for the change-over is that IFRS Standards keep changing. Therefore an entity may apply an IFRS Standard that is not yet mandatory if that standard permits early application.",
          "• IFRS 1 states that the opening IFRS statement of financial position must:",
          "1. recognise all assets and liabilities required by IFRS Standards",
          "2. not recognise assets and liabilities not permitted by IFRS Standards",
          "3. reclassify all assets, liabilities and equity components in accordance with IFRS Standards",
          "4. measure all assets and liabilities in accordance with IFRS Standards.",
          "• An entity’s estimates at the date of transition to IFRS Standards should be consistent with estimates made for the same date in accordance with previous GAAP unless evidence exists that those estimates were wrong."
        ]
      },
      {
        "title": "3. Reporting Gains and Losses",
        "items": [
          "• Any gains or losses arising on the adoption of IFRS Standards should be recognised directly in retained earnings. They are not recognised in profit or loss."
        ]
      },
      {
        "title": "4. Explanations and Disclosures",
        "items": [
          "• Entities must explain how the transition to IFRS Standards affects their reported financial performance, financial position and cash flows.",
          "• When preparing its first statements under IFRS Standards, an entity may identify errors made in previous years. The correction of these errors must be disclosed separately.",
          "• When preparing statements in accordance with IFRS Standards for the first time, the fair value of property, plant and equipment, intangible assets and investment properties can be used as the 'deemed cost'. If so, the entity must disclose the aggregate of those fair values and the adjustment made to their carrying amounts under the previous GAAP."
        ]
      },
      {
        "title": "5. Exemptions",
        "items": [
          "• IFRS 1 grants limited exemptions in situations where the cost of compliance would outweigh the benefits to the user. For example:",
          "1. Previous business combinations do not have to be restated.",
          "2. An entity can choose to deem past translation gains and losses on an overseas subsidiary to be nil.",
          "3. An entity need not restate the borrowing cost component that was capitalised under previous GAAP at the date of transition."
        ]
      },
      {
        "title": "Implications of Adopting New Accounting Standards",
        "items": [
          "• Moving from local GAAP to International Financial Reporting Standards requires very careful planning and consideration. However, entities that have accounted under IFRS Standards for many years still need to be aware of the implications of adopting a new accounting standard. After all, the Board regularly revises existing IFRS Standards and issues new IFRS Standards.",
          "• Before adopting new accounting standards, an entity should always consider the following:",
          "• Transitional guidance – many newly issued accounting standards provide guidance on how to transition from an old accounting standard to a new one (e.g. from IAS 17 Leases to IFRS 16 Leases). If no guidance is provided, entities should apply IAS 8 Accounting Policies, Changes in Accounting Estimates and Errors.",
          "• Bonuses and performance related pay – adopting new accounting standards will probably affect profit and, therefore, profit-related bonuses. Such schemes may need to be redesigned.",
          "• IT systems – these might not be capable of dealing with the complex recognition, measurement or disclosure requirements of a new accounting standard.",
          "• Covenants on loans – key financial statement ratios might deteriorate as a result of implementing a new accounting standard. Loan conditions may need to be renegotiated with the bank to stop",
          "borrowings becoming repayable.                                                                   9"
        ]
      },
      {
        "title": "Implications of Adopting New Accounting Standards",
        "items": [
          "• Earnings per share – the requirements of a new standard might reduce profit, which will also reduce earnings per share (EPS). EPS is a key financial statement ratio used by potential and current investors.",
          "• Perception – analysts may view the move the IFRS Standards, or the early adoption of a newly issued standard, favourably.",
          "• Knowledge – the entity may need to spend time and money on training existing staff, or on recruiting new staff."
        ]
      },
      {
        "title": "Small and Medium Sized Entities",
        "items": [
          "Definition",
          "• A small or medium entity may be defined or characterized as follows:",
          "1. they are usually owner-managed by a relatively small number of individuals such as a family group, rather than having an extensive ownership base",
          "2. they are usually smaller entities in financial terms such as revenues generated and assets and liabilities under the control of the entity they usually have a relatively small number of employees",
          "3. they usually undertake less complex or difficult transactions which are normally the focus of a financial reporting standard.",
          "Small and medium-sized entities are entities that: (a) do not have public accountability, and (b) publish general purpose financial statements for external users."
        ]
      },
      {
        "title": "The Problem of Differential Reporting",
        "items": [
          "There are problems associated with having a set of reporting standards for small and medium entities:",
          "1. It can be difficult to define a small or medium entity.",
          "2. If a company ceases to qualify as a small or medium entity then there will be a cost and time burden in order to comply with full IFRS and IAS Standards.",
          "3. There may be comparability problems if one company applies full IFRS and IAS Standards whilst another applies the SMEs Standard."
        ]
      },
      {
        "title": "What is the effect of introducing the SMEs Standard?",
        "items": [
          "The SMEs Standard will be updated approximately every three years. In contrast, companies that use full IFRS and IAS Standards have to incur the time cost of ensuring compliance with regular updates. Accounting under full IFRS and IAS Standards necessitates compliance with approximately 3,000 disclosure points. In contrast, the SMEs Standard comprises approximately 300 disclosure points all contained within the one document. This significantly reduces the time spent and costs incurred in producing financial statements."
        ]
      },
      {
        "title": "Key omissions from the SMEs Standard",
        "items": [
          "The subject matter of several reporting standards has been omitted from the SMEs Standard, as follows:",
          "• Earnings per share (IAS 33)",
          "• Interim reporting (IAS 34)",
          "• Segmental reporting (IFRS 8)",
          "• Assets held for sale (IFRS 5) Omission of subject matter from the SMEs Standard is usually because the cost of preparing and reporting information exceeds the expected benefits which users would expect to derive from that information."
        ]
      },
      {
        "title": "Accounting choices disallowed under the SMEs Standard",
        "items": [
          "There are a number of accounting policy choices allowed under full IFRS and IAS Standards that are not available to companies that apply the SMEs Standard. Under the SMEs Standard:",
          "• Goodwill is always recognised as the difference between the cost of the business combination and the fair value of the net assets acquired. In other words, the fair value method for measuring the non-controlling interest is not available.",
          "• Intangible assets must be accounted for at cost less accumulated amortisation and impairment. The revaluation model is not permitted for intangible assets.",
          "• After initial recognition, investment property is remeasured to fair value at the year end with gains or losses recorded in profit or loss. The cost model can only be used if fair value cannot be measured reliably or without undue cost or effort."
        ]
      },
      {
        "title": "Key simplifications in the SMEs Standard",
        "items": [
          "The subject matter of other reporting standards has been simplified for inclusion within the SMEs Standard. Key simplifications to be aware of are as follows:",
          "• Borrowing costs are always expensed to profit or loss.",
          "• Whilst associates and jointly controlled entities can be accounted for using the equity method in the consolidated financial statements, they can also be held at cost (if there is no published price quotation) or fair value. Therefore, simpler alternatives to the equity method are available.",
          "• Depreciation and amortisation estimates are not reviewed annually. Changes to these estimates are only required if there is an indication that the pattern of an asset's use has changed.",
          "• Expenditure on research and development is always expensed to profit or loss.",
          "• If an entity is unable to make a reliable estimate of the useful life of an intangible asset, then the useful life is assumed to be ten years."
        ]
      },
      {
        "title": "Key simplifications in the SMEs Standard",
        "items": [
          "• Goodwill is amortised over its useful life. If the useful life cannot be reliably established then management should use a best estimate that does not exceed ten years.",
          "• On the disposal of an overseas subsidiary, cumulative exchange differences that have been recognised in other comprehensive income are not recycled to profit or loss.",
          "• There are numerous simplifications with regards to financial instruments. These include:",
          "1. Measuring most debt instruments at amortised cost.",
          "2. Recognising most investments in shares at fair value with changes in fair value recognised in profit or loss. If fair value cannot be measured reliably then the shares are held at cost less impairment."
        ]
      },
      {
        "title": "Advantages and Disadvantages of the SMEs Standard",
        "items": [
          "Advantages",
          "• There will be time and cost savings due to simplifications and omissions, particularly with regards to disclosure.",
          "• The SMEs Standard is worded in an accessible way.",
          "• All standards are located within one document so it is therefore easier and quicker to find the information required.",
          "Disadvantages",
          "• There are issues of comparability when comparing one company that uses full IFRS and IAS Standards and another which uses the SMEs Standard.",
          "• The SMEs Standard is arguably still too complex for many small companies. In particular, the requirements with regards to leases and deferred tax could be simplified."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "Although not as significant as they once were, differences remain between IFRS Standards and national",
          "standards. Therefore, an accounting issue arises when an entity adopts IFRS Standards for the first time.",
          "IFRS 1 First-time Adoption of International Financial Reporting Standards sets out the procedures to follow",
          "when an entity adopts IFRS Standards in its published financial statements for the first time."
        ],
        "answer": 0
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "IFRS 1 First-time Adoption of International Financial Reporting Standards sets out the procedures to follow",
          "when an entity adopts IFRS Standards in its published financial statements for the first time.",
          "IFRS 1 defines a first-time adopter as an entity that, for the first time, makes an explicit and unreserved",
          "standards. Therefore, an accounting issue arises when an entity adopts IFRS Standards for the first time."
        ],
        "answer": 3
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "IFRS 1 defines a first-time adopter as an entity that, for the first time, makes an explicit and unreserved",
          "statement that its annual financial statements comply with IFRS Standards.",
          "IFRS 1 First-time Adoption of International Financial Reporting Standards sets out the procedures to follow",
          "when an entity adopts IFRS Standards in its published financial statements for the first time."
        ],
        "answer": 2
      }
    ],
    "practice": []
  },
  {
    "slug": "interpretation-financial-statements",
    "title": "Interpretation of Financial Statements",
    "standard": "Financial statement analysis",
    "blocks": [
      {
        "title": "Interpretation of financial statements",
        "items": [
          "LIMITATIONS"
        ]
      },
      {
        "title": "EXAM FOCUS",
        "items": [
          "In the FR exam, ratios and interpretation are likely to be examined in two ways:",
          "objective test question (section A or B) – This is likely to involve the calculation of a ratio, or drawing a conclusion from a small piece of information given",
          "constructed response question (section C) – a constructed response question is likely to involve the calculation of a small number of ratios, followed by the analysis of a larger scenario, assessing a business.",
          "In a constructed response question, it is important to note what is being asked and to tailor the answer accordingly. For example, if the scenario relates to whether a loan should be given to a company, the answer should focus on items such as cash flow, ability to meet interest payments and current levels of debt.",
          "In a 20-mark interpretation question, candidates may be asked to interpret information for a single entity or a set of consolidated financial statements. A set of consolidated financial statements could include an addition or a disposal of a subsidiary.",
          "In all cases, it is essential to provide a conclusion."
        ]
      },
      {
        "title": "Users of financial statements",
        "items": [
          "When interpreting financial statements it is important to identify the users of financial statements and the information the users need:",
          "Shareholders and potential investors – primarily concerned with receiving an adequate return on their investment, but it must at least provide security and liquidity",
          "Suppliers and lenders – concerned with the security of their debt or loan",
          "Management – concerned with the trend and level of profits, since this is the main measure of their success."
        ]
      },
      {
        "title": "Ratio analysis",
        "items": [
          "In an examination question you may not have time to calculate all of the ratios presented in this chapter so you must make a choice:",
          "choose those relevant to the situation",
          "choose those relevant to the question",
          "make use of any additional information given in the question to help your choice.",
          "Most of the marks in an examination question will be available for sensible, well-explained and accurate comments on the key ratios."
        ]
      },
      {
        "title": "REVENUE",
        "items": [
          "Revenue is key in relation to performance and should always be commented on. Comments on revenue should not be limited to basic analysis such as 'Revenue has increased, which is good'.",
          "Comments should look to explain the;",
          "movement in revenue during the year,",
          "examining items such as new or discontinued products,",
          "new markets,",
          "promotional activity,",
          "lost customers, or",
          "anything relevant to the scenario.",
          "PERFORMANCE RATIOS"
        ]
      },
      {
        "title": "Gross profit margin",
        "items": [
          "Gross profit margin or percentage is:",
          "This is the margin that the entity achieves on its sales, and would be expected to remain reasonably constant.",
          "Since the ratio is affected by only a small number of variables, movements may be traced to a change in:",
          "selling prices – normally deliberate though sometimes unavoidable, e.g. because of increased competition or entry into a new market",
          "sales mix – often deliberate (company discontinuing some products) purchase cost – including carriage inwards or discounts",
          "production cost – materials, labour or production overheads",
          "A good way to analyse gross profit margin is to ask yourself:",
          "Are there any reasons why the selling price has changed?",
          "Are there any significant changes to the costs in the year?",
          "Has there been any indication of a change in sales mix?",
          "PERFORMANCE RATIOS"
        ]
      },
      {
        "title": "operating profit margin",
        "items": [
          "Operating profit margin is calculated as:",
          "An alternative to operating profit margin is to calculate net profit margin, using either profit for the year or profit before tax as the numerator.",
          "Any changes in operating profit margin should be considered further:",
          "Are the changes in line with changes in gross profit margin?",
          "Are the changes in line with changes in sales revenue?",
          "In an interpretation exam question, by the time you have reached operating profit, there are many more factors to consider in addition to gross profit margin comparisons, e.g. advertising costs, distribution expenses, irrecoverable debt write-offs. If you are provided with a breakdown of expenses, you can use this for further line-by-line comparisons. Bear in mind that:",
          "some costs are fixed or semi-fixed (e.g. property costs) and therefore not expected to change in line with revenue",
          "other costs are variable (e.g. packaging, commission).",
          "PERFORMANCE RATIOS"
        ]
      },
      {
        "title": "Return on capital employed (ROCE)",
        "items": [
          "ROCE is calculated as:",
          "ROCE shows the ability of the entity to turn its long-term financing into profit. Profit is measured as:",
          "Capital employed can be measured as:",
          "equity plus interest-bearing finance, i.e. the long-term finance supporting the business. Interest-bearing finance usually includes ALL lease liabilities, whether they are shown as current or non-current, or",
          "total assets less current liabilities",
          "ROCE for the current year should be compared to:",
          "the previous year ROCE",
          "the cost of borrowing",
          "other entities’ ROCE in the same industry.",
          "PERFORMANCE RATIOS"
        ]
      },
      {
        "title": "Return on capital employed (ROCE)",
        "items": [
          "Movements in ROCE should be analysed by looking for the reasons why profit has moved, and reasons for any changes in the long-term funding, such as loans or share issues to fund acquisition of non-current assets.",
          "It is important to note that ROCE can be significantly affected by an entity's accounting policies. An entity that revalues its non-current assets will have a revaluation surplus in equity. The revaluation surplus will make its ROCE lower than an entity that does not revalue its assets, making comparison meaningless.",
          "Similar to ROCE is return on equity (ROE):",
          "ROE can be used to show the return made for the year on the total equity in the business. Pre-tax ROE can also be calculated using profit before tax rather than profit after tax.",
          "PERFORMANCE RATIOS"
        ]
      },
      {
        "title": "Return on capital employed (ROCE)",
        "items": [
          "Treatment of associates and investments:",
          "Where the profit used in ROCE excludes investment income and profits from associates, the capital employed should also exclude the statement of financial position carrying amounts for associates and investments to give an accurate measure of trading performance.",
          "If the overall profit figure does include income from investments and associates, capital employed should include associates and investment balances. This approach ensures comparable profit and capital employed figures are used within ROCE.",
          "PERFORMANCE RATIOS"
        ]
      },
      {
        "title": "Net asset turnover",
        "items": [
          "The net asset turnover is calculated as:",
          "Capital employed can be calculated as equity plus interest-bearing debt. As an alternative, net assets (total assets less current liabilities) could also be used.",
          "It measures management’s efficiency in generating revenue from the net assets at its disposal:",
          "the higher the asset turnover, the greater the efficiency.",
          "Asset turnover can be subdivided into:",
          "non-current asset turnover (by making non-current assets the denominator) and",
          "working capital turnover (by making net current assets the denominator).",
          "PERFORMANCE RATIOS"
        ]
      },
      {
        "title": "Relationship between ratios",
        "items": [
          "ROCE can be subdivided into profit margin and asset turnover:",
          "x\t\t\t =",
          "Profit margin is often seen as an indication of the quality of products or services supplied (top-of-the-range products usually have higher margins).",
          "Asset turnover is often seen as a measure of how intensively the assets are worked.",
          "A trade-off may exist between margin and asset turnover.",
          "Low-margin businesses (e.g. food retailers) usually have a high asset turnover.",
          "Capital-intensive manufacturing industries (e.g. electrical equipment manufacturers) usually have relatively low asset turnover but higher margins.",
          "Two completely different strategies can achieve the same ROCE.",
          "Sell goods at a high profit margin with sales volume remaining low (e.g. designer dress shop).",
          "Sell goods at a low profit margin with very high sales volume (e.g. discount clothes store).",
          "PERFORMANCE RATIOS"
        ]
      },
      {
        "title": "Position",
        "items": [
          "Position analysis can be split into analysis of short-term liquidity (looking at working capital) and long-term solvency (focusing on debt levels)."
        ]
      },
      {
        "title": "Current ratio",
        "items": [
          "Current or working capital ratio is calculated as:",
          "The current ratio measures the adequacy of current assets to meet the liabilities as they fall due.",
          "A high or increasing figure may appear safe but should be regarded with suspicion as it may be due to:",
          "high levels of inventory and receivables (check working capital management ratios)",
          "high cash levels which could be put to better use (e.g. by investing in non current assets).",
          "WORKING CAPITAL RATIOS"
        ]
      },
      {
        "title": "QUICK ratio",
        "items": [
          "Where inventories are slow moving, the quick ratio probably provides a better indicator of short-term liquidity.",
          "Quick ratio (also known as the liquidity or acid test) ratio is calculated as:",
          "By eliminating inventory from current assets, quick ratio provides the acid test of whether the company has sufficient liquid resources (receivables and cash) to settle its liabilities.",
          "When interpreting the quick ratio, care should be taken over the status of the bank overdraft. A company with a low quick ratio may actually have no problem in paying its amounts due if sufficient overall overdraft facilities are available",
          "WORKING CAPITAL RATIOS"
        ]
      },
      {
        "title": "Cash",
        "items": [
          "As well as the working capital ratios below, it is also useful to comment on any movement in cash in the year.",
          "Identify where any major cash inflows have come from in the year.",
          "Identify where the cash has been used in the year.",
          "As far as possible, any comments should be made with reference to the scenario. A simple statement of 'cash has gone up, which is good' is unlikely to be worth many marks. A discussion should be based around whether cash has gone up from the company's performance or from other sources, such as taking on more debt.",
          "WORKING CAPITAL RATIOS"
        ]
      },
      {
        "title": "Inventory holding period",
        "items": [
          "Inventory holding period is calculated as:",
          "An alternative is to express the inventory turnover as a number of times per annum:",
          "An increasing number of days (or a diminishing turnover) implies that inventory is turning over less quickly which is regarded as a bad sign as it may indicate:",
          "lack of demand for the goods, poor inventory control, an increase in costs (storage, obsolescence, insurance, damage).",
          "However, an increase in days may not necessarily be bad where management are:",
          "buying inventory in larger quantities to take advantage of trade discounts, or",
          "increasing inventory levels to avoid stockouts.",
          "WORKING CAPITAL RATIOS"
        ]
      },
      {
        "title": "Receivables collection period",
        "items": [
          "Receivables collection period is normally expressed as a number of days:",
          "If the figure for credit sales is not available, revenue should be used. For many businesses total sales revenue can safely be used, because cash sales will be insignificant",
          "The collection period should be compared with the stated credit policy and previous period figures.",
          "An increasing receivables collection period is usually a bad sign, suggesting a lack of proper credit control which may lead to irrecoverable debts.",
          "It may however be due to:",
          "a deliberate policy to attract more trade, or",
          "a major new customer being allowed different terms",
          "Falling receivables days is usually a good sign, though it could indicate that the company is suffering a cash shortage.",
          "WORKING CAPITAL RATIOS"
        ]
      },
      {
        "title": "Payables payment period",
        "items": [
          "Payables payment period is usually expressed as:",
          "This represents the credit period taken by the company from its suppliers.",
          "The ratio is always compared to previous years:",
          "A long credit period may be considered favourable as it represents a source of free finance.",
          "However, a long credit period may indicate that the company is unable to pay more quickly because of liquidity problems.",
          "If the credit period is too long:",
          "the company may develop a poor reputation as a slow payer and may not be able to find new suppliers",
          "existing suppliers may decide to discontinue supplies",
          "the company may be losing out on worthwhile prompt payment discounts.",
          "WORKING CAPITAL RATIOS",
          "If Credit purchases is not available, use cost of sale"
        ]
      },
      {
        "title": "Working capital cycle (cash cycle)",
        "items": [
          "Working capital cycle is expressed as:",
          "=\t\t\t +\t\t -",
          "The working capital cycle shows the average length of time between paying production costs and receiving cash returns from the inventory.",
          "WORKING CAPITAL RATIOS"
        ]
      },
      {
        "title": "Long-term financial stability",
        "items": [
          "The main points to consider when assessing the long-term financial position are;",
          "Gearing",
          "Overtrading.",
          "LONG-TERM FINANCIAL STABILITY"
        ]
      },
      {
        "title": "GEARING",
        "items": [
          "Gearing ratios indicate:",
          "the degree of risk attached to the company, and",
          "the sensitivity of earnings and dividends to changes in profitability and activity level.",
          "Preference share capital is usually included as part of debt rather than equity since it carries the right to a fixed rate of dividend which is payable before the ordinary shareholders have any right to a dividend.",
          "Gearing will include all interest-bearing debt, and show it as a proportion of equity, or as a proportion of the total long-term financing (being equity plus interest-bearing debt).",
          "LONG-TERM FINANCIAL STABILITY"
        ]
      },
      {
        "title": "GEARING",
        "items": [
          "There are two methods commonly used to express gearing:",
          "Debt/equity ratio:",
          "Percentage of capital employed represented by borrowings:",
          "LONG-TERM FINANCIAL STABILITY"
        ]
      },
      {
        "title": "Interest cover",
        "items": [
          "Interest cover is expressed as:",
          "Interest cover indicates the ability of a company to pay interest out of profits generated:",
          "interest cover of less than two is usually considered unsatisfactory",
          "low interest cover indicates to shareholders that their dividends are at risk (because most profits are eaten up by interest payments) and",
          "the company may have difficulty financing its debts if its profits fall",
          "LONG-TERM FINANCIAL STABILITY"
        ]
      },
      {
        "title": "Overtrading",
        "items": [
          "Overtrading arises where a company expands its sales revenue rapidly without securing adequate long-term capital for its needs.",
          "The symptoms of overtrading are:",
          "inventory increasing, possibly more than proportionately to revenue",
          "receivables increasing, possibly more than proportionately to revenue",
          "cash and liquid assets declining",
          "trade payables increasing rapidly",
          "LONG-TERM FINANCIAL STABILITY"
        ]
      },
      {
        "title": "Overtrading",
        "items": [
          "The symptoms of overtrading simply imply that the entity has expanded without giving proper thought to the necessity of expanding its capital base.",
          "It has consequently continued to rely on its trade payables and, probably, its bank overdraft to provide the additional finance required.",
          "There will come a point where suppliers will withhold further supplies and bankers will refuse to honour further cheques until borrowings are reduced.",
          "The problem is that borrowings cannot be reduced until sales revenue is earned, which in turn cannot be achieved until production is completed, which is dependent upon materials being available and wages being paid.",
          "The overall result is a downward financial spiral and rapid financial collapse!",
          "LONG-TERM FINANCIAL STABILITY"
        ]
      },
      {
        "title": "Price / Earnings (P/E) ratio",
        "items": [
          "PE Ratio is expressed as:",
          "Represents the market’s view of the future prospects of the share.",
          "High P/E suggests that high growth is expected.",
          "The higher the P/E ratio, the faster the growth the market is expecting in the company’s future EPS. Correspondingly, the lower the P/E ratio, the lower the expected future growth.",
          "Another aspect of interpreting the P/E ratio is that a published EPS exists for a year, and therefore the P/E ratio given in a newspaper is generally based on an increasingly out-of-date EPS",
          "INVESTOR RATIOS"
        ]
      },
      {
        "title": "Dividend yield",
        "items": [
          "Dividend Yield is expressed as:",
          "Can be compared to the yields available on other investment possibilities",
          "The lower the dividend yield, the more the market is expecting future growth in the dividend, and vice versa.",
          "INVESTOR RATIOS"
        ]
      },
      {
        "title": "Dividend COVER",
        "items": [
          "Dividend Cover is expressed as:",
          "This is the relationship between available profits and the dividends payable out of the profits.",
          "The higher the dividend cover, the more likely it is that the current dividend level can be sustained in the future.",
          "INVESTOR RATIOS"
        ]
      },
      {
        "title": "Limitations of financial statements and ratio analysis",
        "items": [
          "Ratios are not predictive if they are based on historical information as the figures:",
          "Ignore future action by management.",
          "Can be manipulated by window dressing or creative accounting.",
          "May be distorted by differences in accounting policies.",
          "Example",
          "Asset values shown in the statement of financial position at historical cost may bear no resemblance to their current value or what it may cost to replace them. This valuation may result in a low depreciation charge and overstatement of profit in real terms. As a result of historical costs the financial statements do not show the real cost of using the non-current assets."
        ]
      },
      {
        "title": "Creative accounting",
        "items": [
          "Creative accounting refers to the accounting practices that are designed to mislead the view that the user of financial statements has on an entity’s underlying economic performance.",
          "Typically creative accounting is used to increase profits, inflate asset values or understate liabilities.",
          "Creative accounting techniques can also be used to manipulate the gearing level of a company. A company that is highly geared has high interest payments that reduce the amount of distributable profit available to shareholders and increases the risk associated with the company, making it more difficult to obtain future lending.",
          "Other reasons for creative accounting could include the desire to",
          "influence share price",
          "to keep the company’s financial results within agreed limits set by creditors",
          "personal incentives",
          "to pay less tax."
        ]
      },
      {
        "title": "Window dressing",
        "items": [
          "Window dressing is a method of carrying out transactions in order to distort and improve the position shown by the financial statements.",
          "Examples of window dressing include:",
          "a company might chase receivables more quickly at the year end to improve its bank balance;",
          "a company may change its depreciation estimate i.e. by increasing the expected useful life of an asset, the depreciation charge will be smaller resulting in increased profits, and",
          "an existing loan may be repaid immediately before the year end and then taken out again in the next financial year."
        ]
      },
      {
        "title": "Choice of accounting policies",
        "items": [
          "It is necessary to be able to assess the impact of accounting policies on the calculation of ratios.",
          "Comparison between businesses that follow different policies becomes a major issue if accounting standards give either choice or judgement to companies e.g. IAS 40 or IAS 16."
        ]
      },
      {
        "title": "Transactions with related parties",
        "items": [
          "If an entity trades with related parties, such as other entities within the same group or other entities run by the same directors, then these transactions may not be at market price.",
          "Examples of related party trading include purchase or sale transactions at rates other than market value or loans carrying interest rates not at market value.",
          "The impact of these transactions on the entity must be assessed to give a fair comparison with other entities.",
          "For related party transactions involving group companies, the aim will be to show the position if the trading subsidiary or associate entity was removed from the group and no longer enjoyed the benefit of such transactions."
        ]
      },
      {
        "title": "Seasonal trading",
        "items": [
          "Ratio analysis can be distorted when a company has seasonal trading.",
          "For example, a company may position its year-end to be after a particularly busy period so that inventory levels are lower than usual making the inventory count a less time-consuming process. This year end positioning, in turn, will generally mean that bank and receivables levels are higher and that trade payables are lower (assuming that suppliers have been paid for providing the inventory to meet demand for the busy period).",
          "The timing of such financial reporting would improve the appearance of the ratios and make the company seem more solvent.",
          "In comparison, if the financial statements had been prepared at a different period in time then the results could appear quite different."
        ]
      },
      {
        "title": "Inter-firm and sector comparison",
        "items": [
          "Comparing the financial statements of similar businesses can be misleading because:",
          "the businesses may use different accounting policies",
          "ratios may not be calculated according to the same formulae. For example, there are several possible definitions of gearing and ROCE.",
          "large organisations can achieve economies of scale, e.g. by negotiating extended credit periods, or discounts for bulk buying with suppliers, whereas these measures may not be available to smaller businesses, and may distort comparison.",
          "entities within the same industry can serve completely different markets and there may be differences in sales mix and product range. These can affect profitability and activity ratios such as profit margin and ratios of expenses to sales.",
          "Sector comparisons",
          "It can be useful to compare ratios for an individual company with the sector as a whole. However, it must also be noted that the sector will incorporate companies of different sizes so it may not be a like-for-like comparison."
        ]
      },
      {
        "title": "Specialised, not-for-profit and public sector organisations",
        "items": [
          "Not-for-profit and public sector organisations cover a range of entities, such as charities, schools, healthcare providers and government departments. Their main focus will to be to achieve certain objectives rather than make a profit.",
          "The main financial aim of specialised, not-for-profit and public sector organisations is not to achieve a profit or return on capital but to achieve value for money.",
          "Value for money is achieved by a combination of the three Es:",
          "Effectiveness – success in achieving its objectives/providing its service",
          "Efficiency – how well its resources are used",
          "Economy – keeping cost of inputs low.",
          "As profit and return are not so meaningful, many ratios will have little importance in these organisations, for example: ROCE, gearing and investor ratios in general.",
          "However such organisations must also keep control of income and costs therefore other ratios will still be important, such as working capital ratios."
        ]
      },
      {
        "title": "Specialised, not-for-profit and public sector organisations",
        "items": [
          "Not for profit and public sector organisations must keep control of income and costs therefore other ratios will still be important, such as working capital ratios.",
          "As the main aim of these organisations is to achieve value for money, other, non-financial ratios take on added significance:",
          "measures of effectiveness such as the time scale within which outpatients are treated in a hospital",
          "measures of efficiency such as the pupil-to-teacher ratio in a school",
          "measures of economy such as the teaching time of cheaper classroom assistants in a school as opposed to more expensive qualified teachers."
        ]
      },
      {
        "title": "Interpreting group financial statements",
        "items": [
          "A 20-mark interpretation question could involve transactions between a parent and a subsidiary, or an acquisition/disposal of a subsidiary.",
          "It is therefore essential that you are comfortable with the information contained within the relevant group-accounting material in terms of acquiring a subsidiary and any adjustments required for intra-group trading with a subsidiary. In addition to this, the calculation of profit or loss on disposal of a subsidiary from is also essential.",
          "A question involving group financial statements is likely to require you to make some adjustments, whether through making adjustments to consolidated figures, or looking at goodwill or the gain/loss on disposal.",
          "In this case, your analysis should consider the overall impact to the group as well as the underlying performance of individual companies if information is given about them.",
          "The relationships within the group should be considered. Look out for any transactions which may not be at fair value. These transactions could be an attempt to manipulate performance of a particular aspect of the group.",
          "The overall impact of the group adjustments on the financial statements should be considered, taking the adjustments into account in any trend analysis for future periods."
        ]
      },
      {
        "title": "Subsidiary acquired during the year",
        "items": [
          "Consolidated statement of profit or loss (CSPL):",
          "Income and expenses should increase due to the new subsidiary being included in the year",
          "The CSPL may not have a full year's results from the subsidiary, as the results will only be consolidated from the date of acquisition",
          "Acquisition costs may be included, which affect the performance of the group in the current period",
          "Margins will be affected as the newly acquired subsidiary is likely to have different margins to the rest of the group",
          "Consolidated statement of financial position:",
          "100% of the assets and liabilities of the subsidiary will be consolidated at the reporting date. This will mean that there could be significant increases in assets or liabilities depending on the position of the newly-acquired subsidiary.",
          "Working capital ratios, such as receivables collection period, are likely to change due to the new subsidiary having different credit terms to the rest of the group.",
          "Working capital ratios may also be affected adversely as the ratio uses the year-end assets or liabilities, but the income/expenses included may be time-apportioned in the statement of profit or loss. For example, a subsidiary with revenue for the year of $1,000,000 and closing receivables of $90,000 would have a receivables collection period of 33 days in its individual financial statements (90,000/1,000,000 × 365). If this had been acquired exactly halfway through the year, only $500,000 revenue would be included within the consolidated statement of profit or loss, with the full $90,000 of receivables included in the consolidated statement of financial position. This treatment would effectively give a receivables collection period of 66 days (90,000/500,000 × 365), creating a distorted picture.",
          "Return on capital employed and net asset turnover may decrease as the subsidiary's profit will be time apportioned, but any debt held by the subsidiary will be included in full at the reporting date.",
          "Future periods:",
          "Future years' statements of profit or loss will include a full year's results from the subsidiary so will show a more accurate reflection of the performance going forward.",
          "Any costs associated with the acquisition will not be included, giving a more accurate picture of the underlying performance.",
          "Subsidiary disposed of during the year",
          "Consolidated statement of profit or loss:",
          "The previous year's statement of profit or loss would include a full year's results from the disposed subsidiary",
          "The results for the current year may have the subsidiary shown as a discontinued operation (shown as one line below the profit for the year from the continuing operations) or have the results consolidated into income and expenses for the period up to the date of disposal",
          "The consolidated results may also include any gain/loss on disposal, which should be stripped out for comparative purposes",
          "Any costs associated with the disposal, such as professional fees or redundancies, may be included in the current period which would not be recognised in future periods",
          "Margins are likely to be incomparable, as the prior year will include the disposed subsidiary but the current year may only include the companies remaining in the group",
          "Statement of financial position:",
          "The previous year's statement of financial position would contain 100% of the assets and liabilities of the disposed subsidiary",
          "The current year's statement of financial position would contain none of the subsidiary’s assets and liabilities as the subsidiary will not be controlled at the reporting date",
          "Cash may be increased by the sales proceeds of the subsidiary",
          "Ratios such as working capital ratios, return on capital employed and net asset turnover may be distorted if some of the subsidiary's results are included in the statement of profit or loss, as no assets or liabilities from the subsidiary will be included in this calculation.",
          "Future periods:",
          "There will be no distortion of ratios due to the partial results of the subsidiary being included",
          "Future analysis could involve an examination of how the group have invested any proceeds raised from the disposal of the subsidiary"
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "In the FR exam, ratios and interpretation are likely to be examined in two ways:",
          "objective test question (section A or B) – This is likely to involve the calculation of a ratio, or drawing a conclusion from a small piece of information given",
          "constructed response question (section C) – a constructed response question is likely to involve the calculation of a small number of ratios, followed by the analysis of a larger scenario, assessing a business.",
          "In all cases, it is essential to provide a conclusion."
        ],
        "answer": 0
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "constructed response question (section C) – a constructed response question is likely to involve the calculation of a small number of ratios, followed by the analysis of a larger scenario, assessing a business.",
          "In all cases, it is essential to provide a conclusion.",
          "When interpreting financial statements it is important to identify the users of financial statements and the information the users need:",
          "objective test question (section A or B) – This is likely to involve the calculation of a ratio, or drawing a conclusion from a small piece of information given"
        ],
        "answer": 3
      },
      {
        "question": "Which statement is supported by the source material for this topic?",
        "options": [
          "When interpreting financial statements it is important to identify the users of financial statements and the information the users need:",
          "Shareholders and potential investors – primarily concerned with receiving an adequate return on their investment, but it must at least provide security and liquidity",
          "constructed response question (section C) – a constructed response question is likely to involve the calculation of a small number of ratios, followed by the analysis of a larger scenario, assessing a business.",
          "In all cases, it is essential to provide a conclusion."
        ],
        "answer": 2
      }
    ],
    "practice": [
      {
        "title": "Practice set",
        "question": "INTERPRETATION OF FINANCIAL STATEMENTS | QUE Test Your Understanding 5 The Pure Group operates in the farming industry and has operated a number of 100% owned subsidiaries for many years. Its financial statements for the last two years are shown below. The following information is relevant: (i) Pure has become increasingly worried about two major areas in its business environment. Firstly, there are concerns that reliance on large supermarkets is putting pressure on cash flow, as the supermarkets demand extended payment terms. Secondly, consistent increases in fuel prices mean that delivering the produce nationally is becoming extremely expensive. (ii) To manage these worries, Pure acquired 80% of Howard on 1 October 20X2. This was the first time Pure had acquired a subsidiary without owning 100%. Howard operates two luxury INTERPRETATION OF FINANCIAL STATEMENTS | QUE hotels, and Pure acquired Howard with a view to diversification and to provide a long-term solution to the cash flow concerns. (iii) The Pure group raised finance for the acquisition from a number of sources. Part of this came from the disposal of $11 million held in investments, making a $4.5 million gain on disposal, which is included within administrative expenses. (iv) Howard opened a third hotel in March 20X3, it’s largest yet. After poor initial reviews, Howard appointed a new marketing director in May 20X3. Following an extensive marketing campaign, online feedback had improved significantly. (v) The following ratios have been calculated for the year ended 30 September 20X2: Gross profit margin 59.1% Operating margin 8.5% Return on capital employed 7.4% Inventory turnover period 60 days Receivables collection period 83 days Required: (a) For the ratios provided above, prepare the equivalent figures for the year ended 30 September 20X3. (b) Analyse the performance and cash flow of Pure for the year ended 30 September 20X3, making specific reference to any concerns or expectations regarding future periods.",
        "answer": ""
      }
    ]
  }
]
