import React, { useState, useEffect, useRef } from 'react';
import { Clock, CheckCircle, XCircle, Trophy, BarChart2, Play, Pause, SkipForward, RefreshCw, BookOpen, Zap } from 'lucide-react';

// --- QUESTION BANK (60 Questions extracted from Course PDF) ---
// Topics: Legal System, Contract Formation, Vitiating Factors, Sale of Goods, Agency, Torts
const QUESTION_BANK = [
  // --- SET 1: Legal System & Intro ---
  {
    id: 1,
    question: "Which are the two (2) main branches of law under Ghana's Legal System?",
    options: [
      "Criminal Law and Common Law",
      "Tort Law and Contract Law",
      "Civil Law and Criminal Law",
      "Criminal Law and Equity"
    ],
    correct: 2, // C
    explanationEn: "The two main branches are Civil Law (disputes between individuals) and Criminal Law (offences against the State).",
    explanationFr: "Les deux principales branches sont le droit civil (litiges entre particuliers) et le droit pénal (infractions contre l'État)."
  },
  {
    id: 2,
    question: "Which branch of law preserves the interest of the state and prescribes punishment for offenders?",
    options: [
      "Criminal Law",
      "Contract Law",
      "Administrative Law",
      "Property Law"
    ],
    correct: 0, // A
    explanationEn: "Criminal Law deals with conduct that is considered an offence against the society/state and prescribes sanctions.",
    explanationFr: "Le droit pénal traite des conduites considérées comme des infractions contre la société/l'État et prescrit des sanctions."
  },
  {
    id: 3,
    question: "A tort is best defined as:",
    options: [
      "A law made by parliament",
      "A legally enforceable agreement",
      "A civil wrong giving the victim a right to sue for compensation",
      "A rule made by a court of law"
    ],
    correct: 2, // C
    explanationEn: "A tort is a civil wrong (other than breach of contract) that causes harm, for which the court imposes liability.",
    explanationFr: "Un délit civil est un tort civil (autre qu'une rupture de contrat) qui cause un préjudice, pour lequel le tribunal impose une responsabilité."
  },
  {
    id: 4,
    question: "The standard of proof in a civil trial is:",
    options: [
      "Beyond reasonable doubt",
      "On the balance of probabilities",
      "Beyond all doubt",
      "Suspicion of guilt"
    ],
    correct: 1, // B
    explanationEn: "In civil cases, the plaintiff must prove their case on the 'balance of probabilities' (more likely than not).",
    explanationFr: "Dans les affaires civiles, le plaignant doit prouver sa cause selon la 'prépondérance des probabilités' (plus probable que non)."
  },
  {
    id: 5,
    question: "Which source of law is NOT listed in Article 11 of the 1992 Constitution of Ghana?",
    options: [
      "The 1992 Constitution",
      "Enactments by Parliament",
      "Presidential Decree",
      "The Common Law"
    ],
    correct: 2, // C
    explanationEn: "Presidential Decrees are not listed as a source of law under Article 11, though existing laws (including past decrees) may still be valid.",
    explanationFr: "Les décrets présidentiels ne sont pas répertoriés comme source de droit en vertu de l'article 11, bien que les lois existantes puissent rester valides."
  },
  // --- SET 2: Contract Formation ---
  {
    id: 6,
    question: "A contract is defined as an agreement between parties that is:",
    options: [
      "Morally binding",
      "Enforceable by a court of law",
      "Always in writing",
      "Witnessed by a lawyer"
    ],
    correct: 1, // B
    explanationEn: "A contract is a voluntary agreement between parties that the law will enforce.",
    explanationFr: "Un contrat est un accord volontaire entre les parties que la loi fera respecter."
  },
  {
    id: 7,
    question: "Which of the following is NOT an essential element of a valid contract?",
    options: [
      "Offer and Acceptance",
      "Consideration",
      "Writing",
      "Intention to create legal relations"
    ],
    correct: 2, // C
    explanationEn: "Contracts can be oral. Writing is only required for specific types (e.g., sale of land, hire purchase).",
    explanationFr: "Les contrats peuvent être oraux. L'écrit n'est requis que pour des types spécifiques (ex: vente de terrain, location-vente)."
  },
  {
    id: 8,
    question: "An invitation to treat is:",
    options: [
      "A valid offer",
      "An acceptance of an offer",
      "An invitation to negotiate or receive offers",
      "A binding promise"
    ],
    correct: 2, // C
    explanationEn: "An invitation to treat (like goods in a shop window) invites others to make an offer.",
    explanationFr: "Une invitation à traiter (comme des marchandises en vitrine) invite les autres à faire une offre."
  },
  {
    id: 9,
    question: "The case of Carlill v Carbolic Smoke Ball Co. illustrates:",
    options: [
      "Unilateral contracts and general offers to the world",
      "The need for written contracts",
      "Revocation of offers",
      "Privity of contract"
    ],
    correct: 0, // A
    explanationEn: "It established that an offer can be made to the whole world and accepted by performance (unilateral contract).",
    explanationFr: "Il a établi qu'une offre peut être faite au monde entier et acceptée par l'exécution (contrat unilatéral)."
  },
  {
    id: 10,
    question: "According to the Postal Rule, acceptance is effective when:",
    options: [
      "The letter is received by the offeror",
      "The letter is read by the offeror",
      "The letter is posted",
      "The offeror decides to agree"
    ],
    correct: 2, // C
    explanationEn: "Under the Postal Rule (Adams v Lindsell), acceptance is complete as soon as the letter is posted.",
    explanationFr: "Selon la règle postale (Adams v Lindsell), l'acceptation est complète dès que la lettre est postée."
  },
  {
    id: 11,
    question: "Past consideration is generally:",
    options: [
      "Good consideration",
      "No consideration",
      "Sufficient only in business",
      "Valid if witnessed"
    ],
    correct: 1, // B
    explanationEn: "Consideration must be given in exchange for the promise. Acts done before the promise are 'past' and usually invalid.",
    explanationFr: "La contrepartie doit être donnée en échange de la promesse. Les actes accomplis avant la promesse sont 'passés' et généralement invalides."
  },
  {
    id: 12,
    question: "Which case established the doctrine of Promissory Estoppel?",
    options: [
      "Donoghue v Stevenson",
      "Central London Property Trust v High Trees House",
      "Balfour v Balfour",
      "Hadley v Baxendale"
    ],
    correct: 1, // B
    explanationEn: "The High Trees case established that a promise intended to be binding, intended to be acted on, and acted on, is binding.",
    explanationFr: "L'affaire High Trees a établi qu'une promesse destinée à être contraignante, destinée à être suivie d'effet, et suivie d'effet, est contraignante."
  },
  // --- SET 3: Vitiating Factors & Discharge ---
  {
    id: 13,
    question: "A false statement of fact inducing another into a contract is:",
    options: [
      "A term",
      "A condition",
      "A misrepresentation",
      "A mistake"
    ],
    correct: 2, // C
    explanationEn: "Misrepresentation is a false statement of fact made by one party to another, which induces them to enter the contract.",
    explanationFr: "La fausse déclaration est une fausse affirmation de fait faite par une partie à une autre, qui l'incite à conclure le contrat."
  },
  {
    id: 14,
    question: "Which type of mistake renders a contract void ab initio?",
    options: [
      "Mistake as to quality",
      "Unilateral mistake",
      "Common mistake where subject matter perished",
      "Mistake of law"
    ],
    correct: 2, // C
    explanationEn: "Common mistake (res extincta), where the subject matter ceases to exist before the contract, makes it void.",
    explanationFr: "L'erreur commune (res extincta), où l'objet cesse d'exister avant le contrat, le rend nul."
  },
  {
    id: 15,
    question: "Duress involves:",
    options: [
      "Undue influence by a doctor",
      "Inequality of bargaining power",
      "Threats of violence or illegitimate pressure",
      "Misunderstanding terms"
    ],
    correct: 2, // C
    explanationEn: "Duress is illegitimate pressure (often physical threats) used to force a party into a contract.",
    explanationFr: "La contrainte est une pression illégitime (souvent des menaces physiques) utilisée pour forcer une partie à conclure un contrat."
  },
  {
    id: 16,
    question: "A contract discharged by 'frustration' means:",
    options: [
      "One party is angry",
      "Performance has become impossible due to unforeseen events",
      "The contract was illegal from the start",
      "One party breached the contract"
    ],
    correct: 1, // B
    explanationEn: "Frustration occurs when an unforeseen event makes performance impossible or radically different (e.g., destruction of subject matter).",
    explanationFr: "La frustration survient lorsqu'un événement imprévu rend l'exécution impossible ou radicalement différente (ex: destruction de l'objet)."
  },
  {
    id: 17,
    question: "The remedy of 'Specific Performance' is usually granted for:",
    options: [
      "Sale of goods",
      "Personal services",
      "Sale of land/unique items",
      "Borrowing money"
    ],
    correct: 2, // C
    explanationEn: "Specific performance is an equitable remedy compelling a party to perform, usually for land or unique goods where damages are inadequate.",
    explanationFr: "L'exécution en nature est un recours équitable obligeant une partie à s'exécuter, généralement pour des terrains ou des biens uniques."
  },
  // --- SET 4: Sale of Goods ---
  {
    id: 18,
    question: "Under the Sale of Goods Act, 1962 (Act 137), 'Goods' include:",
    options: [
      "Land",
      "Money",
      "Movable property and growing crops",
      "Services"
    ],
    correct: 2, // C
    explanationEn: "Act 137 defines goods as movable property, including growing crops agreed to be severed.",
    explanationFr: "La loi 137 définit les marchandises comme des biens meubles, y compris les cultures sur pied convenues d'être coupées."
  },
  {
    id: 19,
    question: "In a sale of specific goods in a deliverable state, property passes:",
    options: [
      "When the goods are delivered",
      "When the price is paid",
      "When the contract is made",
      "When the buyer approves them"
    ],
    correct: 2, // C
    explanationEn: "For specific goods in a deliverable state, property passes when the contract is made (immaterial of payment/delivery time).",
    explanationFr: "Pour les marchandises spécifiques en état d'être livrées, la propriété est transférée lors de la conclusion du contrat."
  },
  {
    id: 20,
    question: "Which of the following implies that the seller has the right to sell the goods?",
    options: [
      "Implied condition as to title",
      "Implied warranty of quiet possession",
      "Implied condition of fitness",
      "Implied warranty of freedom from encumbrance"
    ],
    correct: 0, // A
    explanationEn: "There is an implied condition that the seller has the right to sell the goods (title) at the time property is to pass.",
    explanationFr: "Il existe une condition implicite selon laquelle le vendeur a le droit de vendre les marchandises (titre) au moment du transfert de propriété."
  },
  {
    id: 21,
    question: "In an F.O.B. (Free on Board) contract, risk passes to the buyer when:",
    options: [
      "Goods are delivered to the warehouse",
      "Goods cross the ship's rail",
      "Goods arrive at destination",
      "The buyer pays the price"
    ],
    correct: 1, // B
    explanationEn: "In classic FOB, risk passes when goods are safely put aboard the ship (cross the ship's rail).",
    explanationFr: "Dans un FOB classique, les risques sont transférés lorsque les marchandises sont mises à bord du navire (passent le bastingage)."
  },
  {
    id: 22,
    question: "Nemo dat quod non habet means:",
    options: [
      "No one gives who possesses not",
      "No one gives what he does not have",
      "Let the buyer beware",
      "The contract is void"
    ],
    correct: 1, // B
    explanationEn: "It means a seller cannot pass a better title than they themselves possess.",
    explanationFr: "Cela signifie qu'un vendeur ne peut transmettre un meilleur titre que celui qu'il possède lui-même."
  },
  // --- SET 5: Hire Purchase & Agency ---
  {
    id: 23,
    question: "Under the Hire-Purchase Act (NRCD 292), a fundamental requirement is that:",
    options: [
      "The agreement must be oral",
      "The agreement must be in writing and signed",
      "No deposit is required",
      "The goods must be new"
    ],
    correct: 1, // B
    explanationEn: "Hire-purchase agreements must be in writing and signed by the hirer and all other parties to be enforceable.",
    explanationFr: "Les contrats de location-vente doivent être écrits et signés par le locataire et toutes les autres parties pour être exécutoires."
  },
  {
    id: 24,
    question: "In a Hire-Purchase agreement, the property in goods passes:",
    options: [
      "Upon delivery",
      "Upon payment of the first installment",
      "Upon payment of the final installment/option fee",
      "It never passes"
    ],
    correct: 2, // C
    explanationEn: "Property remains with the owner until the hirer exercises the option to purchase (usually after final payment).",
    explanationFr: "La propriété reste au propriétaire jusqu'à ce que le locataire exerce l'option d'achat (généralement après le paiement final)."
  },
  {
    id: 25,
    question: "An agent acting for an undisclosed principal:",
    options: [
      "Is personally liable on the contract",
      "Cannot be sued",
      "Makes the contract void",
      "Acts illegally"
    ],
    correct: 0, // A
    explanationEn: "If the principal is undisclosed, the agent appears to be the contracting party and can be held personally liable.",
    explanationFr: "Si le mandant n'est pas divulgué, l'agent semble être la partie contractante et peut être tenu personnellement responsable."
  },
  {
    id: 26,
    question: "Ratification in agency means:",
    options: [
      "Firing an agent",
      "Approving an unauthorized act retrospectively",
      "Appointing a new agent",
      "Refusing to pay commission"
    ],
    correct: 1, // B
    explanationEn: "Ratification allows a principal to retroactively approve an act done by an agent without authority.",
    explanationFr: "La ratification permet à un mandant d'approuver rétroactivement un acte accompli par un agent sans autorisation."
  },
  {
    id: 27,
    question: "Vicarious liability in torts usually applies to:",
    options: [
      "Independent contractors",
      "Employer-Employee relationships",
      "Strangers",
      "Competitors"
    ],
    correct: 1, // B
    explanationEn: "Employers are vicariously liable for torts committed by employees in the course of their employment.",
    explanationFr: "Les employeurs sont civilement responsables des délits commis par leurs employés dans l'exercice de leurs fonctions."
  },
  // --- FILLING THE REST (28-60) WITH MIXED TOPICS ---
  {
    id: 28,
    question: "The 'neighbour principle' was established in:",
    options: ["Rylands v Fletcher", "Donoghue v Stevenson", "Hedley Byrne v Heller", "Grant v Australian Knitting Mills"],
    correct: 1,
    explanationEn: "Donoghue v Stevenson (the snail in the bottle) established the duty of care in negligence.",
    explanationFr: "Donoghue v Stevenson (l'escargot dans la bouteille) a établi le devoir de diligence en cas de négligence."
  },
  {
    id: 29,
    question: "Which of these is NOT a remedy for breach of contract?",
    options: ["Damages", "Injunction", "Specific Performance", "Imprisonment"],
    correct: 3,
    explanationEn: "Breach of contract is a civil wrong; imprisonment is a criminal sanction, not a contractual remedy.",
    explanationFr: "La rupture de contrat est un tort civil; l'emprisonnement est une sanction pénale, pas un recours contractuel."
  },
  {
    id: 30,
    question: "Caveat Emptor means:",
    options: ["Let the seller beware", "Let the buyer beware", "Goods must be perfect", "Delivery is free"],
    correct: 1,
    explanationEn: "Caveat Emptor ('Let the buyer beware') means the buyer assumes the risk of quality unless there is a warranty.",
    explanationFr: "Caveat Emptor ('Que l'acheteur prenne garde') signifie que l'acheteur assume le risque de qualité à moins d'une garantie."
  },
  {
    id: 31,
    question: "A Del Credere agent is one who:",
    options: ["Acts for free", "Guarantees the solvency of the third party", "Cannot sell goods", "Is a diplomat"],
    correct: 1,
    explanationEn: "A Del Credere agent promises to indemnify the principal if the third party fails to pay, usually for extra commission.",
    explanationFr: "Un agent Del Credere promet d'indemniser le mandant si le tiers ne paie pas, généralement contre une commission supplémentaire."
  },
  {
    id: 32,
    question: "In the case of Hadley v Baxendale, damages are limited to:",
    options: ["All losses", "Losses reasonably foreseeable at the time of contract", "Punitive damages", "None"],
    correct: 1,
    explanationEn: "Damages must be those arising naturally or those reasonably in the contemplation of parties at the time of contract.",
    explanationFr: "Les dommages doivent être ceux survenant naturellement ou ceux raisonnablement envisagés par les parties au moment du contrat."
  },
  {
    id: 33,
    question: "Quantum Meruit means:",
    options: ["Quantity of merit", "As much as he has earned", "Quality matters", "Quick money"],
    correct: 1,
    explanationEn: "It is a claim for reasonable remuneration for work done when no specific price was agreed.",
    explanationFr: "C'est une réclamation pour une rémunération raisonnable pour le travail effectué lorsqu'aucun prix spécifique n'a été convenu."
  },
  {
    id: 34,
    question: "A 'counter-offer' has the effect of:",
    options: ["Accepting the original offer", "Keeping the original offer open", "Destroying the original offer", "Pausing the negotiation"],
    correct: 2,
    explanationEn: "Hyde v Wrench established that a counter-offer rejects and destroys the original offer.",
    explanationFr: "Hyde v Wrench a établi qu'une contre-offre rejette et détruit l'offre originale."
  },
  {
    id: 35,
    question: "Which of these is a 'unilateral' mistake?",
    options: ["Both parties make the same error", "Parties are at cross-purposes", "Only one party is mistaken and the other knows", "Neither party is mistaken"],
    correct: 2,
    explanationEn: "Unilateral mistake occurs when one party is mistaken (e.g., about identity) and the other party is aware of it.",
    explanationFr: "L'erreur unilatérale se produit lorsqu'une partie se trompe (ex: sur l'identité) et que l'autre partie en est consciente."
  },
  {
    id: 36,
    question: "An 'auction with reserve' means:",
    options: ["The highest bidder must win", "There is a minimum price below which goods won't be sold", "Only rich people can bid", "No bids allowed"],
    correct: 1,
    explanationEn: "If there is a reserve price, the auctioneer is not bound to accept the highest bid if it is below the reserve.",
    explanationFr: "S'il y a un prix de réserve, le commissaire-priseur n'est pas tenu d'accepter l'offre la plus élevée si elle est inférieure à la réserve."
  },
  {
    id: 37,
    question: "The 'High Trees' case is associated with:",
    options: ["Consideration", "Promissory Estoppel", "Privity", "Offer"],
    correct: 1,
    explanationEn: "Central London Property Trust v High Trees House is the leading case for Promissory Estoppel.",
    explanationFr: "Central London Property Trust v High Trees House est l'affaire de référence pour l'Estoppel promissoire."
  },
  {
    id: 38,
    question: "Res Ipsa Loquitur means:",
    options: ["The king can do no wrong", "The thing speaks for itself", "No one is above law", "Respect the law"],
    correct: 1,
    explanationEn: "Used in negligence when the accident implies negligence (e.g., a barrel falling from a window).",
    explanationFr: "Utilisé en cas de négligence lorsque l'accident implique une négligence (ex: un tonneau tombant d'une fenêtre)."
  },
  {
    id: 39,
    question: "Which of the following terminates an offer?",
    options: ["Request for information", "Revocation before acceptance", "Acceptance", "Silence"],
    correct: 1,
    explanationEn: "An offer can be revoked at any time before acceptance (unless an option is purchased).",
    explanationFr: "Une offre peut être révoquée à tout moment avant l'acceptation (sauf si une option est achetée)."
  },
  {
    id: 40,
    question: "In agency, 'Delegatus non potest delegare' means:",
    options: ["An agent cannot delegate his authority", "An agent must work hard", "Delegation is good", "Principal is boss"],
    correct: 0,
    explanationEn: "A delegate cannot delegate; an agent selected for personal skill cannot pass duties to another.",
    explanationFr: "Un délégué ne peut déléguer; un agent choisi pour ses compétences personnelles ne peut transmettre ses fonctions à un autre."
  },
  {
    id: 41,
    question: "CIF stands for:",
    options: ["Cost, Insurance, Freight", "Cash In Fund", "Carry In Front", "Company Insurance Fund"],
    correct: 0,
    explanationEn: "CIF contracts include the cost of goods, insurance, and freight to the destination port.",
    explanationFr: "Les contrats CIF incluent le coût des marchandises, l'assurance et le fret jusqu'au port de destination."
  },
  {
    id: 42,
    question: "A contract with a minor for 'necessaries' is:",
    options: ["Void", "Voidable", "Valid and binding", "Illegal"],
    correct: 2,
    explanationEn: "Contracts for necessaries (food, clothing suitable to station in life) are binding on a minor.",
    explanationFr: "Les contrats pour le nécessaire (nourriture, vêtements adaptés au statut) sont contraignants pour un mineur."
  },
  {
    id: 43,
    question: "Which Act governs the Sale of Goods in Ghana?",
    options: ["Act 137", "Act 292", "Act 25", "Act 10"],
    correct: 0,
    explanationEn: "Sale of Goods Act, 1962 (Act 137).",
    explanationFr: "Loi sur la vente de marchandises, 1962 (Loi 137)."
  },
  {
    id: 44,
    question: "Exclusion clauses are interpreted:",
    options: ["Strictly against the party relying on them (Contra Proferentem)", "In favor of the drafter", "Always validly", "Randomly"],
    correct: 0,
    explanationEn: "The Contra Proferentem rule means ambiguous clauses are interpreted against the party who drafted them.",
    explanationFr: "La règle Contra Proferentem signifie que les clauses ambiguës sont interprétées contre la partie qui les a rédigées."
  },
  {
    id: 45,
    question: "Agency of Necessity typically arises in:",
    options: ["Banking", "Emergencies involving perishable goods", "Real Estate", "Teaching"],
    correct: 1,
    explanationEn: "It arises when an emergency forces a person to act for another to prevent loss (e.g., a ship master selling rotting cargo).",
    explanationFr: "Cela survient lorsqu'une urgence oblige une personne à agir pour une autre afin d'éviter une perte (ex: capitaine vendant une cargaison pourrissante)."
  },
  {
    id: 46,
    question: "Specific goods are:",
    options: ["Goods yet to be manufactured", "Goods identified and agreed upon at the time of contract", "Generic goods", "Future goods"],
    correct: 1,
    explanationEn: "Specific goods are identified at the time the contract is made (e.g., 'this specific car').",
    explanationFr: "Les marchandises spécifiques sont identifiées au moment de la conclusion du contrat (ex: 'cette voiture spécifique')."
  },
  {
    id: 47,
    question: "In a C.I.F. contract, the seller performs by delivering:",
    options: ["The goods", "The documents", "The ship", "The money"],
    correct: 1,
    explanationEn: "In CIF, the seller delivers documents (Bill of Lading, Insurance, Invoice) representing the goods.",
    explanationFr: "Dans un CIF, le vendeur livre des documents (Connaissement, Assurance, Facture) représentant les marchandises."
  },
  {
    id: 48,
    question: "A 'lien' is a right to:",
    options: ["Sell goods immediately", "Retain possession of goods until payment", "Destroy goods", "Use goods"],
    correct: 1,
    explanationEn: "An unpaid seller's lien allows them to keep the goods until the price is paid.",
    explanationFr: "Le privilège du vendeur impayé lui permet de conserver les marchandises jusqu'à ce que le prix soit payé."
  },
  {
    id: 49,
    question: "Battery requires:",
    options: ["Actual physical contact", "Fear of contact", "Damage to property", "Verbal abuse"],
    correct: 0,
    explanationEn: "Battery is the intentional and direct application of force to another person (contact).",
    explanationFr: "Les voies de fait (Battery) nécessitent l'application intentionnelle et directe de la force sur une autre personne (contact)."
  },
  {
    id: 50,
    question: "Which of these is NOT a duty of an agent?",
    options: ["Duty to account", "Duty to avoid conflict of interest", "Duty to make a profit", "Duty of care/skill"],
    correct: 2,
    explanationEn: "An agent must try their best but is not under an absolute duty to guarantee a profit.",
    explanationFr: "Un agent doit faire de son mieux mais n'est pas tenu de garantir un profit."
  },
  {
    id: 51,
    question: "Liquidated damages are:",
    options: ["A penalty", "A genuine pre-estimate of loss", "Unspecified damages", "Punitive"],
    correct: 1,
    explanationEn: "Liquidated damages are agreed upon in advance as a genuine estimate. Penalties are generally unenforceable.",
    explanationFr: "Les dommages-intérêts liquidés sont convenus à l'avance comme une estimation réelle. Les pénalités sont généralement inapplicables."
  },
  {
    id: 52,
    question: "The 'postal rule' does NOT apply to:",
    options: ["Letters of acceptance", "Telegrams", "Instantaneous communication (email/phone)", "Parcels"],
    correct: 2,
    explanationEn: "For instantaneous communication, acceptance is only valid when received/heard (Entores v Miles Far East).",
    explanationFr: "Pour la communication instantanée, l'acceptation n'est valide que lorsqu'elle est reçue/entendue (Entores v Miles Far East)."
  },
  {
    id: 53,
    question: "An unpaid seller can stop goods in transit if:",
    options: ["The buyer is insolvent", "The buyer is rude", "The price is too low", "He changes his mind"],
    correct: 0,
    explanationEn: "Stoppage in transit is a right available when the buyer becomes insolvent before receiving goods.",
    explanationFr: "L'arrêt en transit est un droit disponible lorsque l'acheteur devient insolvable avant de recevoir les marchandises."
  },
  {
    id: 54,
    question: "Assault (in tort) is:",
    options: ["Hitting someone", "Causing apprehension of immediate battery", "Insulting someone", "Stealing"],
    correct: 1,
    explanationEn: "Assault is an act causing the victim to fear immediate physical violence (no contact needed).",
    explanationFr: "L'agression est un acte amenant la victime à craindre une violence physique immédiate (aucun contact nécessaire)."
  },
  {
    id: 55,
    question: "A contract to commit a crime is:",
    options: ["Void", "Voidable", "Illegal and unenforceable", "Valid"],
    correct: 2,
    explanationEn: "Contracts with illegal objects are void and unenforceable by law.",
    explanationFr: "Les contrats ayant un objet illégal sont nuls et non exécutoires par la loi."
  },
  {
    id: 56,
    question: "Hire Purchase price consists of:",
    options: ["Cash price + Interest", "Cash price only", "Interest only", "Deposit only"],
    correct: 0,
    explanationEn: "The hire purchase price is the total sum payable (Cash Price + Interest/Charges).",
    explanationFr: "Le prix de location-vente est la somme totale payable (Prix au comptant + Intérêts/Frais)."
  },
  {
    id: 57,
    question: "Non est factum means:",
    options: ["It is not my deed", "It is not a fact", "No contract", "Not finished"],
    correct: 0,
    explanationEn: "A defense for a person who signed a document fundamentally different from what they thought (e.g., due to blindness/fraud).",
    explanationFr: "Une défense pour une personne qui a signé un document fondamentalement différent de ce qu'elle pensait (ex: cécité/fraude)."
  },
  {
    id: 58,
    question: "In contract law, 'privity' means:",
    options: ["Privacy", "Only parties to a contract can sue/be sued", "Private negotiations", "Priority"],
    correct: 1,
    explanationEn: "Privity of contract prevents third parties from enforcing a contract they are not part of.",
    explanationFr: "L'effet relatif du contrat empêche les tiers d'exécuter un contrat dont ils ne font pas partie."
  },
  {
    id: 59,
    question: "Goods sent on 'approval' or 'sale or return' become the buyer's property when:",
    options: ["He signifies approval", "He retains them beyond a reasonable time", "He resells them", "All of the above"],
    correct: 3, // D
    explanationEn: "Property passes on approval, adoption of transaction (resale), or keeping beyond fixed/reasonable time.",
    explanationFr: "La propriété est transférée lors de l'approbation, de l'adoption de la transaction (revente) ou de la conservation au-delà d'un délai fixé/raisonnable."
  },
  {
    id: 60,
    question: "Act 25 is known as:",
    options: ["Contracts Act, 1960", "Sale of Goods Act", "Hire Purchase Act", "Companies Act"],
    correct: 0,
    explanationEn: "Act 25 is the Contracts Act, 1960 of Ghana, which modified common law rules (e.g., consideration).",
    explanationFr: "La loi 25 est la loi sur les contrats de 1960 du Ghana, qui a modifié les règles de la common law (ex: contrepartie)."
  }
];

const MOTIVATIONAL_QUOTES = [
  "Keep pushing forward—you’re smarter than you think!",
  "Chaque étape compte, avance avec confiance!",
  "Success is the sum of small efforts repeated day in and day out.",
  "Your potential is endless. Keep going!",
  "Believe you can and you're halfway there.",
  "Focus on the progress, not the perfection.",
  "You are capable of amazing things.",
  "Knowledge is power. Keep building yours!",
  "Don't watch the clock; do what it does. Keep going.",
  "The expert in anything was once a beginner.",
  "Dream big and dare to fail.",
  "Education is the most powerful weapon which you can use to change the world."
];

// --- COMPONENTS ---

// 1. NEON CARD COMPONENT
const NeonCard = ({ children, className = "" }) => (
  <div className={`relative backdrop-blur-md bg-[#1C1C1C]/80 border border-[#00FFFF]/30 shadow-[0_0_15px_rgba(0,255,255,0.1)] rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,255,255,0.3)] hover:border-[#00FFFF]/60 ${className}`}>
    {children}
  </div>
);

// 2. PIE CHART COMPONENT
const ResultPieChart = ({ correct, total }) => {
  const percentage = (correct / total) * 100;
  const incorrect = total - correct;
  
  // SVG Calculations
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
  
  return (
    <div className="relative w-48 h-48 mx-auto my-6 animate-fade-in-up">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="50" fill="transparent" stroke="#FF3131" strokeWidth="20" />
        <circle 
          cx="60" cy="60" r="50" 
          fill="transparent" 
          stroke="#32CD32" 
          strokeWidth="20" 
          strokeDasharray={strokeDasharray}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-3xl font-bold text-white">{Math.round(percentage)}%</span>
        <span className="text-xs text-gray-400">Correct</span>
      </div>
    </div>
  );
};

export default function UniversityQuizApp() {
  // --- STATE ---
  const [gameState, setGameState] = useState('welcome'); // welcome, quiz, break, results
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]); // Stores { questionId, selected, correct }
  const [timer, setTimer] = useState(3600); // 60 mins
  const [breakTimer, setBreakTimer] = useState(300); // 5 mins
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showQuote, setShowQuote] = useState(false);
  
  const timerRef = useRef(null);

  // --- TIMER LOGIC ---
  useEffect(() => {
    if (gameState === 'quiz' && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
    } else if (gameState === 'quiz' && timer === 0) {
      finishQuiz();
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState, timer]);

  useEffect(() => {
    let breakInterval;
    if (gameState === 'break' && breakTimer > 0) {
      breakInterval = setInterval(() => setBreakTimer(t => t - 1), 1000);
    } else if (gameState === 'break' && breakTimer === 0) {
      resumeQuiz();
    }
    return () => clearInterval(breakInterval);
  }, [gameState, breakTimer]);

  // --- HANDLERS ---
  const startQuiz = () => {
    setGameState('quiz');
    setTimer(3600);
    setCurrentQIndex(0);
    setScore(0);
    setAnswers([]);
  };

  const handleOptionSelect = (optionIndex) => {
    if (showExplanation) return; // Prevent multiple clicks
    
    setSelectedOption(optionIndex);
    setShowExplanation(true);

    const currentQ = QUESTION_BANK[currentQIndex];
    const isCorrect = optionIndex === currentQ.correct;

    if (isCorrect) setScore(s => s + 1);

    // Save answer
    const newAnswers = [...answers, {
      id: currentQ.id,
      question: currentQ.question,
      selected: optionIndex,
      correct: currentQ.correct,
      explanationEn: currentQ.explanationEn,
      explanationFr: currentQ.explanationFr,
      options: currentQ.options
    }];
    setAnswers(newAnswers);

    // Motivational Quote Logic (Every 5 questions)
    if ((currentQIndex + 1) % 5 === 0 && (currentQIndex + 1) !== 60) {
      setTimeout(() => setShowQuote(true), 2000); // Show quote after explanation delay
    }
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    setSelectedOption(null);
    setShowQuote(false);

    // Check for Breaks (After Q20 and Q40)
    const nextIndex = currentQIndex + 1;
    if (nextIndex === 20 || nextIndex === 40) {
      setBreakTimer(300);
      setGameState('break');
    } else if (nextIndex < QUESTION_BANK.length) {
      setCurrentQIndex(nextIndex);
    } else {
      finishQuiz();
    }
  };

  const resumeQuiz = () => {
    setGameState('quiz');
    setCurrentQIndex(prev => prev + 1);
  };

  const finishQuiz = () => {
    setGameState('results');
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // --- RENDERERS ---

  if (gameState === 'welcome') {
    return (
      <div className="min-h-screen bg-[#1C1C1C] text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#1C1C1C] via-[#2C2C2C] to-[#1C1C1C] z-0"></div>
        <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-[#00FFFF]/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-[#C0C0C0]/10 rounded-full blur-[100px]"></div>

        <NeonCard className="max-w-2xl w-full z-10 text-center py-12 border-[#00FFFF]/50">
          <div className="mb-6 flex justify-center">
            <BookOpen size={64} className="text-[#00FFFF] animate-pulse" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-[#C0C0C0] to-[#00FFFF]">
            Commercial Law Mastermind
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            University of Ghana Business School (UGBS 203)
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <Clock className="text-[#00FFFF] mb-2" />
              <h3 className="font-bold text-white">60 Minutes</h3>
              <p className="text-sm text-gray-400">Comprehensive timed session.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <RefreshCw className="text-[#00FFFF] mb-2" />
              <h3 className="font-bold text-white">Break System</h3>
              <p className="text-sm text-gray-400">Smart pauses after Q20 & Q40.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <Zap className="text-[#00FFFF] mb-2" />
              <h3 className="font-bold text-white">Bilingual</h3>
              <p className="text-sm text-gray-400">Explanations in English & French.</p>
            </div>
          </div>

          <button 
            onClick={startQuiz}
            className="bg-[#00FFFF] text-[#1C1C1C] px-8 py-4 rounded-full font-bold text-xl hover:bg-white hover:shadow-[0_0_20px_#00FFFF] transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <Play size={24} fill="currentColor" /> Start Quiz
          </button>
        </NeonCard>
      </div>
    );
  }

  if (gameState === 'break') {
    return (
      <div className="min-h-screen bg-[#1C1C1C] text-white flex items-center justify-center p-4 z-50">
         <NeonCard className="max-w-lg w-full text-center border-[#32CD32]/50">
            <h2 className="text-4xl font-bold text-[#32CD32] mb-4">Break Time</h2>
            <p className="text-gray-300 mb-6">Take a breather. You've completed a segment.</p>
            <div className="text-6xl font-mono mb-8 text-white">{formatTime(breakTimer)}</div>
            
            <div className="flex gap-4 justify-center">
              <button 
                onClick={resumeQuiz}
                className="bg-transparent border-2 border-[#00FFFF] text-[#00FFFF] px-6 py-3 rounded-full font-bold hover:bg-[#00FFFF] hover:text-black transition-all"
              >
                Skip Break <SkipForward className="inline ml-2" size={20}/>
              </button>
            </div>
         </NeonCard>
      </div>
    );
  }

  if (gameState === 'results') {
    return (
      <div className="min-h-screen bg-[#1C1C1C] text-white p-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto pt-10">
          <NeonCard className="mb-8 text-center">
            <Trophy size={48} className="text-[#00FFFF] mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-2">Quiz Complete</h2>
            <p className="text-gray-400">Here is your performance summary</p>
            
            <ResultPieChart correct={score} total={QUESTION_BANK.length} />
            
            <div className="flex justify-center gap-8 mt-6">
               <div className="text-center">
                 <div className="text-2xl font-bold text-[#32CD32]">{score}</div>
                 <div className="text-xs text-gray-400 uppercase tracking-wider">Correct</div>
               </div>
               <div className="text-center">
                 <div className="text-2xl font-bold text-[#FF3131]">{QUESTION_BANK.length - score}</div>
                 <div className="text-xs text-gray-400 uppercase tracking-wider">Incorrect</div>
               </div>
            </div>
            
            <button 
              onClick={startQuiz}
              className="mt-8 bg-[#00FFFF] text-[#1C1C1C] px-8 py-3 rounded-full font-bold hover:bg-white transition-all flex items-center gap-2 mx-auto"
            >
              <RefreshCw size={20} /> Try Again
            </button>
          </NeonCard>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#00FFFF] mb-4">Detailed Review</h3>
            {answers.map((ans, idx) => (
              <NeonCard key={idx} className={`border-l-4 ${ans.selected === ans.correct ? 'border-l-[#32CD32]' : 'border-l-[#FF3131]'} text-left`}>
                 <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-lg text-white w-[90%]">{idx + 1}. {ans.question}</h4>
                    {ans.selected === ans.correct ? <CheckCircle className="text-[#32CD32]" /> : <XCircle className="text-[#FF3131]" />}
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-sm">
                    <div className={`p-3 rounded bg-white/5 border ${ans.selected === ans.correct ? 'border-[#32CD32]/50' : 'border-[#FF3131]/50'}`}>
                      <span className="block text-gray-400 text-xs uppercase">Your Answer</span>
                      {ans.options[ans.selected]}
                    </div>
                    <div className="p-3 rounded bg-white/5 border border-[#32CD32]/50">
                      <span className="block text-gray-400 text-xs uppercase">Correct Answer</span>
                      {ans.options[ans.correct]}
                    </div>
                 </div>

                 <div className="bg-[#00FFFF]/10 p-3 rounded mt-3">
                   <p className="text-sm text-gray-300 mb-1"><span className="text-[#00FFFF] font-bold">Explanation:</span> {ans.explanationEn}</p>
                   <p className="text-sm text-gray-400 italic"><span className="text-[#00FFFF] font-bold">Explication:</span> {ans.explanationFr}</p>
                 </div>
              </NeonCard>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- QUIZ SCREEN ---
  const currentQuestion = QUESTION_BANK[currentQIndex];

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background Ambient Light */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1C1C1C] via-[#00FFFF] to-[#1C1C1C]"></div>

        {/* Header: Timer & Progress */}
        <div className="w-full max-w-4xl flex justify-between items-center mb-6 z-10 px-4">
           <div className="flex items-center gap-2 text-[#00FFFF]">
             <Clock size={20} />
             <span className="font-mono text-xl">{formatTime(timer)}</span>
           </div>
           <div className="flex-1 mx-6 h-2 bg-gray-700 rounded-full overflow-hidden">
             <div 
               className="h-full bg-[#00FFFF] transition-all duration-500 shadow-[0_0_10px_#00FFFF]"
               style={{ width: `${((currentQIndex + 1) / QUESTION_BANK.length) * 100}%` }}
             ></div>
           </div>
           <div className="text-gray-400 font-mono">
             {currentQIndex + 1}/{QUESTION_BANK.length}
           </div>
        </div>

        {/* Motivational Quote Overlay */}
        {showQuote && (
          <div className="absolute inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm animate-fade-in">
             <div className="text-center max-w-lg p-8">
               <Trophy size={64} className="text-[#00FFFF] mx-auto mb-6 animate-bounce" />
               <h2 className="text-3xl font-bold text-white mb-4 italic">"{MOTIVATIONAL_QUOTES[(currentQIndex + 1)/5 % MOTIVATIONAL_QUOTES.length]}"</h2>
               <button 
                 onClick={nextQuestion} 
                 className="bg-[#00FFFF] text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
               >
                 Continue
               </button>
             </div>
          </div>
        )}

        {/* Question Card */}
        <NeonCard className="max-w-4xl w-full z-10 min-h-[400px] flex flex-col justify-between animate-slide-up">
           <div>
             <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white leading-relaxed">
               {currentQuestion.question}
             </h2>
             
             <div className="grid grid-cols-1 gap-4">
               {currentQuestion.options.map((opt, idx) => {
                 let optionClass = "bg-white/5 border-white/10 hover:bg-[#00FFFF]/10 hover:border-[#00FFFF]";
                 if (showExplanation) {
                   if (idx === currentQuestion.correct) optionClass = "bg-[#32CD32]/20 border-[#32CD32]";
                   else if (idx === selectedOption) optionClass = "bg-[#FF3131]/20 border-[#FF3131]";
                   else optionClass = "opacity-50";
                 }

                 return (
                   <button
                     key={idx}
                     onClick={() => handleOptionSelect(idx)}
                     disabled={showExplanation}
                     className={`p-4 rounded-lg border text-left transition-all duration-300 text-lg flex justify-between items-center ${optionClass}`}
                   >
                     <span>{opt}</span>
                     {showExplanation && idx === currentQuestion.correct && <CheckCircle className="text-[#32CD32]" />}
                     {showExplanation && idx === selectedOption && idx !== currentQuestion.correct && <XCircle className="text-[#FF3131]" />}
                   </button>
                 )
               })}
             </div>
           </div>

           {/* Explanation Footer */}
           {showExplanation && (
             <div className="mt-8 animate-fade-in">
                <div className="bg-[#1C1C1C]/90 p-6 rounded-lg border-l-4 border-[#00FFFF]">
                  <h3 className="text-[#00FFFF] font-bold mb-2 flex items-center gap-2">
                    <BookOpen size={18}/> Explanation
                  </h3>
                  <p className="text-white mb-3">{currentQuestion.explanationEn}</p>
                  <div className="h-px w-full bg-white/10 my-3"></div>
                  <h3 className="text-[#00FFFF] font-bold mb-2 text-sm">Explication (Français)</h3>
                  <p className="text-gray-400 italic text-sm">{currentQuestion.explanationFr}</p>
                </div>
                
                <div className="mt-6 flex justify-end">
                  {!showQuote && (
                    <button 
                      onClick={nextQuestion}
                      className="bg-[#00FFFF] text-black px-8 py-3 rounded-full font-bold hover:shadow-[0_0_15px_#00FFFF] transition-all flex items-center gap-2"
                    >
                      Next Question <SkipForward size={20} />
                    </button>
                  )}
                </div>
             </div>
           )}
        </NeonCard>
    </div>
  );
}