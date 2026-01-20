import React, { useState, useEffect, useRef } from 'react';
import { Play, Clock, CheckCircle, XCircle, BarChart2, Award, Pause, RefreshCw, ChevronRight } from 'lucide-react';
/**
 * DATA: 60 Questions based on the provided Microeconomics PDF.
 */
const questions = [
  // --- Section 1: Intro & Scarcity (Slides 1-10) ---
  {
    id: 1,
    question: "What is the fundamental problem in economics?",
    options: ["Inflation", "Scarcity", "Unemployment", "High Taxes"],
    correct: 1,
    explanationEn: "Scarcity is the fundamental problem because resources are limited while wants are unlimited.",
    explanationFr: "La rareté est le problème fondamental car les ressources sont limitées alors que les besoins sont illimités."
  },
  {
    id: 2,
    question: "Which branch of economics studies the choices of individuals and businesses?",
    options: ["Macroeconomics", "Microeconomics", "Econometrics", "Development Economics"],
    correct: 1,
    explanationEn: "Microeconomics studies the choices of individuals and businesses and how they interact.",
    explanationFr: "La microéconomie étudie les choix des individus et des entreprises et la façon dont ils interagissent."
  },
  {
    id: 3,
    question: "What is 'Opportunity Cost'?",
    options: ["The money paid for a good", "The value of the best alternative forgone", "The cost of production", "The price minus tax"],
    correct: 1,
    explanationEn: "Opportunity cost is the value of the best alternative that must be given up to get something.",
    explanationFr: "Le coût d'opportunité est la valeur de la meilleure alternative à laquelle on doit renoncer pour obtenir quelque chose."
  },
  {
    id: 4,
    question: "A 'Scale of Preference' lists wants in order of...",
    options: ["Price", "Importance", "Size", "Availability"],
    correct: 1,
    explanationEn: "A scale of preference lists all available wants in order of importance to the individual.",
    explanationFr: "Une échelle de préférence liste tous les besoins disponibles par ordre d'importance pour l'individu."
  },
  {
    id: 5,
    question: "Which of the following best describes 'Capital' as a factor of production?",
    options: ["Natural resources", "Human effort", "Man-made aids to production", "Risk-taking ability"],
    correct: 2,
    explanationEn: "Capital refers to man-made resources (machines, buildings) used to produce goods.",
    explanationFr: "Le capital désigne les ressources créées par l'homme (machines, bâtiments) utilisées pour produire des biens."
  },

  // --- Section 2: PPF & Methodology (Slides 11-45) ---
  {
    id: 6,
    question: "Points inside the Production Possibilities Frontier (PPF) represent...",
    options: ["Efficient production", "Unattainable production", "Inefficient production", "Ideally distributed goods"],
    correct: 2,
    explanationEn: "Points inside the PPF indicate that resources are underutilized or production is inefficient.",
    explanationFr: "Les points à l'intérieur de la FPP indiquent que les ressources sont sous-utilisées ou que la production est inefficace."
  },
  {
    id: 7,
    question: "If a PPF is bowed outward (concave), it implies...",
    options: ["Constant opportunity cost", "Decreasing opportunity cost", "Increasing opportunity cost", "Zero opportunity cost"],
    correct: 2,
    explanationEn: "A bowed-out PPF indicates increasing opportunity costs as you produce more of one good.",
    explanationFr: "Une FPP courbée vers l'extérieur indique des coûts d'opportunité croissants à mesure que l'on produit plus d'un bien."
  },
  {
    id: 8,
    question: "Normative economics deals with...",
    options: ["Facts and data", "What ought to be (value judgments)", "Testing theories", "Describing what is"],
    correct: 1,
    explanationEn: "Normative statements are about what 'ought' to be and involve value judgments.",
    explanationFr: "Les énoncés normatifs concernent ce qui « devrait » être et impliquent des jugements de valeur."
  },
  {
    id: 9,
    question: "A 'rational choice' is one where...",
    options: ["Cost exceeds benefit", "Marginal benefit equals or exceeds marginal cost", "No trade-offs are made", "Resources are wasted"],
    correct: 1,
    explanationEn: "Rational agents act when the marginal benefit of an action is greater than or equal to its marginal cost.",
    explanationFr: "Les agents rationnels agissent lorsque le bénéfice marginal d'une action est supérieur ou égal à son coût marginal."
  },
  {
    id: 10,
    question: "Economic models are used to...",
    options: ["Replicate reality exactly", "Simplify reality to explain specific features", "Eliminate scarcity", "Increase prices"],
    correct: 1,
    explanationEn: "Models simplify the complex real world to focus on key relationships and explain observed facts.",
    explanationFr: "Les modèles simplifient le monde réel complexe pour se concentrer sur les relations clés et expliquer les faits observés."
  },

  // --- Section 3: Demand (Slides 50-70) ---
  {
    id: 11,
    question: "According to the Law of Demand, holding other things constant...",
    options: ["Price and Quantity Demanded are positively related", "Price and Quantity Demanded are inversely related", "Income determines price", "Supply creates its own demand"],
    correct: 1,
    explanationEn: "The Law of Demand states that as price rises, quantity demanded falls (inverse relationship).",
    explanationFr: "La loi de la demande stipule que lorsque le prix augmente, la quantité demandée diminue (relation inverse)."
  },
  {
    id: 12,
    question: "For a 'Normal Good', an increase in income leads to...",
    options: ["A decrease in demand", "An increase in demand", "No change in demand", "A movement along the curve"],
    correct: 1,
    explanationEn: "Consumers buy more of a normal good when their income increases.",
    explanationFr: "Les consommateurs achètent plus d'un bien normal lorsque leur revenu augmente."
  },
  {
    id: 13,
    question: "If goods A and B are substitutes, an increase in the Price of A will...",
    options: ["Decrease demand for B", "Increase demand for B", "Have no effect on B", "Shift the supply of B"],
    correct: 1,
    explanationEn: "If the price of a substitute rises, people switch to the other good, increasing its demand.",
    explanationFr: "Si le prix d'un substitut augmente, les gens se tournent vers l'autre bien, augmentant ainsi sa demande."
  },
  {
    id: 14,
    question: "Complements are goods that are...",
    options: ["Consumed together", "Used in place of each other", "Produced by the same firm", "Always free"],
    correct: 0,
    explanationEn: "Complements (like cars and fuel) are consumed together.",
    explanationFr: "Les compléments (comme les voitures et le carburant) sont consommés ensemble."
  },
  {
    id: 15,
    question: "Which of the following causes a movement ALONG the demand curve?",
    options: ["Change in Income", "Change in Taste", "Change in the Price of the good", "Change in Population"],
    correct: 2,
    explanationEn: "A change in the good's own price causes a movement along the curve; other factors shift the curve.",
    explanationFr: "Une modification du prix du bien entraîne un mouvement le long de la courbe; d'autres facteurs déplacent la courbe."
  },

  // --- Section 4: Supply (Slides 72-87) ---
  {
    id: 16,
    question: "The Law of Supply states that there is a ______ relationship between price and quantity supplied.",
    options: ["Negative", "Positive", "Neutral", "Complex"],
    correct: 1,
    explanationEn: "Higher prices incentivize producers to supply more, creating a positive relationship.",
    explanationFr: "Des prix plus élevés incitent les producteurs à fournir davantage, créant une relation positive."
  },
  {
    id: 17,
    question: "An improvement in technology will cause the supply curve to...",
    options: ["Shift left", "Shift right", "Become vertical", "Become horizontal"],
    correct: 1,
    explanationEn: "Better technology lowers production costs, increasing supply (shift right).",
    explanationFr: "Une meilleure technologie réduit les coûts de production, augmentant l'offre (déplacement vers la droite)."
  },
  {
    id: 18,
    question: "If the cost of raw materials increases, supply will...",
    options: ["Increase", "Decrease", "Stay the same", "Fluctuate randomly"],
    correct: 1,
    explanationEn: "Higher production costs (input prices) decrease supply.",
    explanationFr: "Des coûts de production plus élevés (prix des intrants) réduisent l'offre."
  },
  {
    id: 19,
    question: "Market Supply is the ______ summation of individual supply curves.",
    options: ["Vertical", "Horizontal", "Diagonal", "Average"],
    correct: 1,
    explanationEn: "Market supply is found by adding up the quantities supplied by all producers at each price (horizontal sum).",
    explanationFr: "L'offre du marché est obtenue en additionnant les quantités fournies par tous les producteurs à chaque prix (somme horizontale)."
  },
  {
    id: 20,
    question: "Which factor does NOT shift the supply curve?",
    options: ["Weather", "Technology", "Price of the good itself", "Number of suppliers"],
    correct: 2,
    explanationEn: "The price of the good itself causes movement along the curve, not a shift.",
    explanationFr: "Le prix du bien lui-même provoque un mouvement le long de la courbe, et non un déplacement."
  },

  // --- Section 5: Equilibrium (Slides 88-116) ---
  {
    id: 21,
    question: "Equilibrium occurs where...",
    options: ["Demand exceeds Supply", "Supply exceeds Demand", "Quantity Demanded equals Quantity Supplied", "Prices are highest"],
    correct: 2,
    explanationEn: "Equilibrium is the point where the plans of buyers match the plans of sellers.",
    explanationFr: "L'équilibre est le point où les plans des acheteurs correspondent aux plans des vendeurs."
  },
  {
    id: 22,
    question: "If the market price is above equilibrium, there is a...",
    options: ["Shortage", "Surplus", "Balance", "Crisis"],
    correct: 1,
    explanationEn: "Prices above equilibrium mean Qs > Qd, resulting in a surplus.",
    explanationFr: "Les prix supérieurs à l'équilibre signifient Qs > Qd, ce qui entraîne un excédent."
  },
  {
    id: 23,
    question: "A price ceiling set below the equilibrium price results in...",
    options: ["Excess Supply", "Excess Demand (Shortage)", "Market Clearing", "Higher Quality"],
    correct: 1,
    explanationEn: "A price ceiling limits price, causing demand to exceed supply (shortage).",
    explanationFr: "Un prix plafond limite le prix, ce qui fait que la demande dépasse l'offre (pénurie)."
  },
  {
    id: 24,
    question: "If Demand increases and Supply stays constant, equilibrium price...",
    options: ["Falls", "Rises", "Stays the same", "Becomes zero"],
    correct: 1,
    explanationEn: "Higher demand pushes prices up.",
    explanationFr: "Une demande plus élevée fait monter les prix."
  },
  {
    id: 25,
    question: "Minimum wage is an example of a...",
    options: ["Price Ceiling", "Price Floor", "Quota", "Tax"],
    correct: 1,
    explanationEn: "A minimum wage is a price floor, setting a minimum price for labor.",
    explanationFr: "Le salaire minimum est un prix plancher, fixant un prix minimum pour le travail."
  },

  // --- Section 6: Elasticity (Slides 123-144) ---
  {
    id: 26,
    question: "Price Elasticity of Demand measures responsiveness of...",
    options: ["Price to Quantity", "Quantity Demanded to Price", "Income to Price", "Supply to Demand"],
    correct: 1,
    explanationEn: "It measures how much quantity demanded responds to a change in price.",
    explanationFr: "Il mesure la réaction de la quantité demandée à une variation de prix."
  },
  {
    id: 27,
    question: "If Demand is elastic, the coefficient is...",
    options: ["Less than 1", "Equal to 1", "Greater than 1", "Zero"],
    correct: 2,
    explanationEn: "Elastic demand means the % change in quantity is greater than % change in price (> 1).",
    explanationFr: "Une demande élastique signifie que le % de variation de la quantité est supérieur au % de variation du prix (> 1)."
  },
  {
    id: 28,
    question: "A good with many close substitutes tends to have...",
    options: ["Inelastic demand", "Elastic demand", "Unit elastic demand", "Perfectly inelastic demand"],
    correct: 1,
    explanationEn: "If substitutes are available, consumers easily switch when price rises, making demand elastic.",
    explanationFr: "Si des substituts sont disponibles, les consommateurs changent facilement lorsque le prix augmente, rendant la demande élastique."
  },
  {
    id: 29,
    question: "Cross-price elasticity is negative for...",
    options: ["Substitutes", "Complements", "Normal goods", "Inferior goods"],
    correct: 1,
    explanationEn: "For complements, if Price A rises, Demand B falls (inverse relationship = negative sign).",
    explanationFr: "Pour les compléments, si le Prix A augmente, la Demande B diminue (relation inverse = signe négatif)."
  },
  {
    id: 30,
    question: "Income elasticity is negative for which type of good?",
    options: ["Luxury goods", "Normal goods", "Inferior goods", "Essential goods"],
    correct: 2,
    explanationEn: "As income rises, people buy less of inferior goods (negative elasticity).",
    explanationFr: "À mesure que le revenu augmente, les gens achètent moins de biens inférieurs (élasticité négative)."
  },

  // --- Section 7: Consumer Behavior (Slides 148-176) ---
  {
    id: 31,
    question: "Marginal Utility is the...",
    options: ["Total satisfaction", "Average satisfaction", "Extra satisfaction from one more unit", "Cost of satisfaction"],
    correct: 2,
    explanationEn: "Marginal utility is the additional satisfaction gained from consuming one extra unit.",
    explanationFr: "L'utilité marginale est la satisfaction supplémentaire obtenue en consommant une unité supplémentaire."
  },
  {
    id: 32,
    question: "The Law of Diminishing Marginal Utility states that as consumption increases...",
    options: ["Total utility falls", "Marginal utility falls", "Marginal utility rises", "Prices fall"],
    correct: 1,
    explanationEn: "The extra satisfaction derived from each additional unit declines.",
    explanationFr: "La satisfaction supplémentaire tirée de chaque unité supplémentaire diminue."
  },
  {
    id: 33,
    question: "An Indifference Curve shows combinations of goods that yield...",
    options: ["Different utility", "The same utility", "Maximum profit", "Minimum cost"],
    correct: 1,
    explanationEn: "Consumers are indifferent between points on the curve because they provide equal satisfaction.",
    explanationFr: "Les consommateurs sont indifférents entre les points de la courbe car ils procurent une satisfaction égale."
  },
  {
    id: 34,
    question: "The slope of the budget line represents...",
    options: ["Total Income", "Marginal Utility", "Relative prices of the goods", "Preferences"],
    correct: 2,
    explanationEn: "The slope is determined by the ratio of the prices (-Px/Py).",
    explanationFr: "La pente est déterminée par le rapport des prix (-Px/Py)."
  },
  {
    id: 35,
    question: "Consumer equilibrium occurs where the Indifference Curve is...",
    options: ["Crossing the budget line", "Tangent to the budget line", "Below the budget line", "Vertical"],
    correct: 1,
    explanationEn: "Equilibrium is where the budget line is tangent to the highest possible indifference curve.",
    explanationFr: "L'équilibre se situe là où la ligne budgétaire est tangente à la courbe d'indifférence la plus élevée possible."
  },

  // --- Section 8: Production (Slides 180-202) ---
  {
    id: 36,
    question: "In the short run...",
    options: ["All inputs are variable", "At least one input is fixed", "No production occurs", "Technology is fixed"],
    correct: 1,
    explanationEn: "The short run is defined by the presence of fixed factors (like capital).",
    explanationFr: "Le court terme est défini par la présence de facteurs fixes (comme le capital)."
  },
  {
    id: 37,
    question: "Marginal Product (MP) intersects Average Product (AP) at AP's...",
    options: ["Minimum point", "Maximum point", "Starting point", "End point"],
    correct: 1,
    explanationEn: "MP pulls AP up when above it, and pushes it down when below. They cross at AP's max.",
    explanationFr: "Le Pm tire le PM vers le haut lorsqu'il est au-dessus, et vers le bas lorsqu'il est en dessous. Ils se croisent au maximum du PM."
  },
  {
    id: 38,
    question: "Diminishing Marginal Returns occurs in which stage of production?",
    options: ["Stage I", "Stage II", "Stage III", "Stage IV"],
    correct: 1,
    explanationEn: "Stage II is the rational zone where MP is falling but positive.",
    explanationFr: "L'étape II est la zone rationnelle où le Pm est en baisse mais positif."
  },
  {
    id: 39,
    question: "Isoquants represent combinations of inputs that produce...",
    options: ["Different outputs", "The same level of output", "Zero output", "Maximum profit"],
    correct: 1,
    explanationEn: "Isoquants are to production what indifference curves are to consumption (same output).",
    explanationFr: "Les isoquantes sont à la production ce que les courbes d'indifférence sont à la consommation (même production)."
  },
  {
    id: 40,
    question: "Returns to Scale refers to the long-run effect of changing...",
    options: ["One input", "Labor only", "All inputs proportionately", "Management style"],
    correct: 2,
    explanationEn: "Returns to scale examines output when ALL inputs are scaled up.",
    explanationFr: "Les rendements d'échelle examinent la production lorsque TOUS les intrants sont augmentés."
  },

  // --- Section 9: Costs (Slides 204-221) ---
  {
    id: 41,
    question: "Total Cost (TC) equals...",
    options: ["TFC - TVC", "TFC + TVC", "AFC + AVC", "MC x Q"],
    correct: 1,
    explanationEn: "Total Cost is the sum of Fixed Costs and Variable Costs.",
    explanationFr: "Le Coût Total est la somme des Coûts Fixes et des Coûts Variables."
  },
  {
    id: 42,
    question: "Which cost curve is always downward sloping?",
    options: ["Marginal Cost", "Average Variable Cost", "Average Fixed Cost", "Total Cost"],
    correct: 2,
    explanationEn: "AFC declines continuously as output increases because fixed cost is spread over more units.",
    explanationFr: "Le CFM diminue continuellement à mesure que la production augmente car le coût fixe est réparti sur plus d'unités."
  },
  {
    id: 43,
    question: "The Marginal Cost (MC) curve cuts the ATC curve at its...",
    options: ["Maximum", "Minimum", "Start", "End"],
    correct: 1,
    explanationEn: "MC intersects both ATC and AVC at their minimum points.",
    explanationFr: "Le Cm coupe le CTM et le CVM à leurs points minimums."
  },
  {
    id: 44,
    question: "Implicit costs are...",
    options: ["Out of pocket expenses", "Opportunity costs of self-owned resources", "Receipts", "Taxes"],
    correct: 1,
    explanationEn: "Implicit costs are indirect, like the salary a business owner forgoes to run their firm.",
    explanationFr: "Les coûts implicites sont indirects, comme le salaire auquel un propriétaire d'entreprise renonce pour diriger sa firme."
  },
  {
    id: 45,
    question: "Economies of scale cause the Long Run Average Cost curve to...",
    options: ["Slope upwards", "Slope downwards", "Be horizontal", "Be vertical"],
    correct: 1,
    explanationEn: "Economies of scale mean average costs fall as scale increases.",
    explanationFr: "Les économies d'échelle signifient que les coûts moyens baissent à mesure que l'échelle augmente."
  },

  // --- Section 10: Perfect Competition (Slides 227-291) ---
  {
    id: 46,
    question: "A firm in perfect competition is a...",
    options: ["Price Maker", "Price Taker", "Monopolist", "Regulator"],
    correct: 1,
    explanationEn: "Perfectly competitive firms are too small to influence the market price.",
    explanationFr: "Les entreprises en concurrence parfaite sont trop petites pour influencer le prix du marché."
  },
  {
    id: 47,
    question: "In Perfect Competition, the demand curve facing a single firm is...",
    options: ["Downward sloping", "Perfectly elastic (horizontal)", "Perfectly inelastic (vertical)", "Upward sloping"],
    correct: 1,
    explanationEn: "Since they are price takers, they can sell any amount at the market price.",
    explanationFr: "Comme elles sont preneuses de prix, elles peuvent vendre n'importe quelle quantité au prix du marché."
  },
  {
    id: 48,
    question: "Profit maximization occurs where...",
    options: ["TR = TC", "MR = MC", "Price = ATC", "TR is maximum"],
    correct: 1,
    explanationEn: "Firms maximize profit where the marginal revenue of the last unit equals its marginal cost.",
    explanationFr: "Les entreprises maximisent leurs profits là où le revenu marginal de la dernière unité est égal à son coût marginal."
  },
  {
    id: 49,
    question: "A firm should shut down in the short run if...",
    options: ["Price < ATC", "Price < AVC", "Price = MC", "Profit is zero"],
    correct: 1,
    explanationEn: "If price cannot even cover variable costs, the firm loses more by operating.",
    explanationFr: "Si le prix ne peut même pas couvrir les coûts variables, l'entreprise perd plus en continuant à opérer."
  },
  {
    id: 50,
    question: "In the long run, perfectly competitive firms make...",
    options: ["Supernormal profit", "Normal profit (Zero economic profit)", "Losses", "Monopoly profit"],
    correct: 1,
    explanationEn: "Entry and exit of firms drive economic profit to zero in the long run.",
    explanationFr: "L'entrée et la sortie des entreprises ramènent le profit économique à zéro à long terme."
  },

  // --- Section 11: Monopoly & Monopolistic Comp (Slides 296-343) ---
  {
    id: 51,
    question: "A Monopoly is a...",
    options: ["Price Taker", "Price Maker", "Government Agency", "Small firm"],
    correct: 1,
    explanationEn: "A monopolist controls the entire supply and can influence the price.",
    explanationFr: "Un monopoleur contrôle toute l'offre et peut influencer le prix."
  },
  {
    id: 52,
    question: "For a monopolist, Marginal Revenue (MR) is always...",
    options: ["Equal to Price", "Greater than Price", "Less than Price", "Zero"],
    correct: 2,
    explanationEn: "To sell more, a monopolist must lower price on all units, making MR < P.",
    explanationFr: "Pour vendre plus, un monopoleur doit baisser le prix sur toutes les unités, rendant Rm < P."
  },
  {
    id: 53,
    question: "Monopolies result in 'Deadweight Loss' because...",
    options: ["They produce too much", "They produce less than the socially efficient quantity", "They pay low wages", "They pay high taxes"],
    correct: 1,
    explanationEn: "Monopolies restrict output to raise prices, creating allocative inefficiency.",
    explanationFr: "Les monopoles restreignent la production pour augmenter les prix, créant une inefficacité allocative."
  },
  {
    id: 54,
    question: "Monopolistic Competition is characterized by...",
    options: ["Identical products", "Product differentiation", "One seller", "Blocked entry"],
    correct: 1,
    explanationEn: "Firms sell similar but not identical products (e.g., restaurants, clothes).",
    explanationFr: "Les entreprises vendent des produits similaires mais non identiques (ex: restaurants, vêtements)."
  },
  {
    id: 55,
    question: "In Monopolistic Competition, entry is...",
    options: ["Blocked", "Restricted", "Free", "Impossible"],
    correct: 2,
    explanationEn: "Like perfect competition, it is easy for new firms to enter or exit.",
    explanationFr: "Comme en concurrence parfaite, il est facile pour de nouvelles entreprises d'entrer ou de sortir."
  },

  // --- Section 12: Advanced & General Concepts (Review) ---
  {
    id: 56,
    question: "Which market structure has high barriers to entry?",
    options: ["Perfect Competition", "Monopolistic Competition", "Monopoly", "All of the above"],
    correct: 2,
    explanationEn: "Barriers like patents or control of resources protect monopolies.",
    explanationFr: "Des barrières comme les brevets ou le contrôle des ressources protègent les monopoles."
  },
  {
    id: 57,
    question: "The 'Shut-Down Point' is where Price equals...",
    options: ["Minimum ATC", "Minimum AVC", "Maximum MC", "Zero"],
    correct: 1,
    explanationEn: "Below minimum AVC, the firm cannot cover variable costs.",
    explanationFr: "En dessous du minimum du CVM, l'entreprise ne peut pas couvrir les coûts variables."
  },
  {
    id: 58,
    question: "If the cross-price elasticity is positive, the goods are...",
    options: ["Substitutes", "Complements", "Unrelated", "Inferior"],
    correct: 0,
    explanationEn: "Positive elasticity means if Price A goes up, Demand B goes up (Substitutes).",
    explanationFr: "Une élasticité positive signifie que si le Prix A augmente, la Demande B augmente (Substituts)."
  },
  {
    id: 59,
    question: "The difference between Total Revenue and Total Cost is...",
    options: ["Marginal Revenue", "Profit", "Opportunity Cost", "Sunk Cost"],
    correct: 1,
    explanationEn: "Profit = TR - TC.",
    explanationFr: "Profit = RT - CT."
  },
  {
    id: 60,
    question: "Which curve is 'U-shaped' due to the law of diminishing returns?",
    options: ["AFC", "TFC", "MC", "TR"],
    correct: 2,
    explanationEn: "Marginal Cost falls then rises due to diminishing marginal returns.",
    explanationFr: "Le coût marginal baisse puis augmente en raison des rendements marginaux décroissants."
  }
];

const quotes = [
  "Keep pushing forward—you’re smarter than you think!",
  "Chaque étape compte, avance avec confiance!",
  "Success is the sum of small efforts repeated day in and day out.",
  "Le succès est la somme de petits efforts répétés jour après jour.",
  "Believe you can and you're halfway there.",
  "Crois en toi et tu es déjà à mi-chemin.",
  "Focus on progress, not perfection.",
  "Concentrez-vous sur le progrès, pas sur la perfection.",
  "Microeconomics helps you make better decisions!",
  "La microéconomie vous aide à prendre de meilleures décisions!",
  "Don't stop when you're tired. Stop when you're done.",
  "Ne t'arrête pas quand tu es fatigué. Arrête-toi quand tu as fini."
];

export default function UniversityQuizApp() {
  // --- STATE ---
  const [screen, setScreen] = useState('start'); // 'start', 'quiz', 'result'
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { 0: 1, 1: 3... } (questionIndex: optionIndex)
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 mins in seconds
  const [isPaused, setIsPaused] = useState(false);
  const [showBreakModal, setShowBreakModal] = useState(false);
  const [breakTimer, setBreakTimer] = useState(300); // 5 mins
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [answeredCurrent, setAnsweredCurrent] = useState(false); // Has user answered current Q?
  const [motivation, setMotivation] = useState(null); // Current toast message

  const timerRef = useRef(null);

  // --- TIMER LOGIC ---
  useEffect(() => {
    if (screen === 'quiz' && !isPaused && !isBreakActive) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            finishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [screen, isPaused, isBreakActive]);

  // --- BREAK TIMER LOGIC ---
 useEffect(() => {
  let interval = null;
  if (isBreakActive && breakTimer > 0) {
    interval = setInterval(() => {
      setBreakTimer(prev => prev - 1);
    }, 1000);
  } else if (isBreakActive && breakTimer === 0) {
    endBreak();
  }
  return () => clearInterval(interval);
}, [isBreakActive, breakTimer, endBreak]); // ← Added endBreak
  // --- HELPERS ---
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const startQuiz = () => {
    setScreen('quiz');
    setCurrentQIndex(0);
    setScore(0);
    setUserAnswers({});
    setTimeRemaining(3600);
    setMotivation(null);
  };

  const handleOptionClick = (optionIndex) => {
    if (answeredCurrent) return;

    // Record answer
    const currentQ = questions[currentQIndex];
    const isCorrect = optionIndex === currentQ.correct;
    
    setUserAnswers(prev => ({ ...prev, [currentQIndex]: optionIndex }));
    if (isCorrect) setScore(prev => prev + 1);
    setAnsweredCurrent(true);
  };

  const nextQuestion = () => {
    // Motivational Toast Logic
    if ((currentQIndex + 1) % 5 === 0) {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setMotivation(randomQuote);
      setTimeout(() => setMotivation(null), 4000);
    }

    // Break Logic (After Q20 and Q40)
    if ((currentQIndex + 1) === 20 || (currentQIndex + 1) === 40) {
        setIsPaused(true);
        setShowBreakModal(true);
        setBreakTimer(300);
    } else {
        proceedToNext();
    }
  };

  const proceedToNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setAnsweredCurrent(false);
    } else {
      finishQuiz();
    }
  };

  const triggerBreak = () => {
    setShowBreakModal(false);
    setIsBreakActive(true);
    // Timer is already paused by the logic that opened the modal
  };

  const skipBreak = () => {
    setShowBreakModal(false);
    setIsPaused(false);
    proceedToNext();
  };

  const endBreak = () => {
    setIsBreakActive(false);
    setIsPaused(false);
    proceedToNext();
  };

  const finishQuiz = () => {
    clearInterval(timerRef.current);
    setScreen('result');
  };

  // --- COMPONENTS ---

  const PieChart = ({ value, max, size = 100, color = "#32CD32" }) => {
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / max) * circumference;

    return (
      <div className="relative flex justify-center items-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            stroke="#1C1C1C"
            strokeWidth={strokeWidth}
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <span className="absolute text-sm font-bold text-white">
          {Math.round((value / max) * 100)}%
        </span>
      </div>
    );
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen w-full font-sans text-white overflow-hidden relative"
         style={{
           background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 50%, #ffffff 100%)',
           color: '#1C1C1C'
         }}>
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-400 rounded-full blur-3xl mix-blend-multiply filter"></div>
         <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl mix-blend-multiply filter"></div>
      </div>

      {/* --- START SCREEN --- */}
      {screen === 'start' && (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center animate-fade-in">
          <div className="bg-white/30 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/50 max-w-2xl w-full transform hover:scale-105 transition duration-500">
            <div className="mb-6 flex justify-center">
               <Award className="w-20 h-20 text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
            </div>
            <h1 className="text-5xl font-extrabold mb-4 tracking-tight" 
                style={{ textShadow: '0 0 15px rgba(0, 255, 255, 0.6)', color: '#1C1C1C' }}>
              MicroEcon <span className="text-cyan-600">Mastery</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 font-medium">
              60 Questions • 60 Minutes • Bilingual Explanations
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left text-gray-800 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>One question at a time</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span>Scheduled breaks included</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart2 className="w-5 h-5 text-purple-500" />
                <span>Real-time progress tracking</span>
              </div>
               <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <span>Detailed bilingual feedback</span>
              </div>
            </div>
            <button 
              onClick={startQuiz}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-cyan-600 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-600 hover:bg-cyan-500 shadow-[0_0_20px_rgba(0,255,255,0.5)] active:scale-95"
            >
              Start Challenge
              <Play className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* --- QUIZ SCREEN --- */}
      {screen === 'quiz' && !isBreakActive && (
        <div className="min-h-screen flex flex-col items-center justify-start p-4 md:p-8 relative">
            
            {/* Header: Timer & Progress */}
            <div className="w-full max-w-4xl flex justify-between items-center mb-8 bg-white/40 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/40">
                <div className="flex items-center space-x-4">
                     <div className="text-3xl font-mono font-bold text-gray-800 flex items-center">
                        <Clock className={`w-6 h-6 mr-2 ${timeRemaining < 300 ? 'text-red-500 animate-pulse' : 'text-cyan-700'}`} />
                        {formatTime(timeRemaining)}
                     </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-right hidden md:block">
                        <div className="text-xs text-gray-600 uppercase font-bold tracking-wider">Progress</div>
                        <div className="font-bold text-gray-800">{currentQIndex + 1} / {questions.length}</div>
                    </div>
                    <PieChart value={currentQIndex} max={questions.length} size={50} color="#00FFFF" />
                </div>
            </div>

            {/* Motivational Toast */}
            {motivation && (
                <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-bounce-in">
                    <div className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center font-bold text-lg">
                        <Award className="mr-2 w-5 h-5" />
                        {motivation}
                    </div>
                </div>
            )}

            {/* Main Question Card */}
            <div className="w-full max-w-3xl flex-1 flex flex-col justify-center">
                <div className={`bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white transition-all duration-500 transform ${answeredCurrent ? '' : 'hover:-translate-y-2'}`}>
                    
                    {/* Question Text */}
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-snug">
                        {questions[currentQIndex].question}
                    </h2>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 gap-4 mb-8">
                        {questions[currentQIndex].options.map((option, index) => {
                            const isSelected = userAnswers[currentQIndex] === index;
                            const isCorrect = index === questions[currentQIndex].correct;
                            let btnClass = "w-full text-left p-5 rounded-xl text-lg font-medium transition-all duration-200 border-2 ";
                            
                            if (answeredCurrent) {
                                if (isCorrect) btnClass += "bg-green-100 border-green-500 text-green-800 shadow-[0_0_15px_rgba(50,205,50,0.4)]";
                                else if (isSelected) btnClass += "bg-red-100 border-red-500 text-red-800";
                                else btnClass += "bg-gray-100 border-transparent text-gray-400 opacity-60";
                            } else {
                                btnClass += "bg-white border-gray-200 text-gray-700 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:scale-[1.01]";
                            }

                            return (
                                <button 
                                    key={index}
                                    onClick={() => handleOptionClick(index)}
                                    disabled={answeredCurrent}
                                    className={btnClass}
                                >
                                    <span className="inline-block w-8 font-bold text-gray-400 mr-2">{String.fromCharCode(65 + index)}.</span>
                                    {option}
                                    {answeredCurrent && isCorrect && <CheckCircle className="inline float-right text-green-600 w-6 h-6" />}
                                    {answeredCurrent && isSelected && !isCorrect && <XCircle className="inline float-right text-red-600 w-6 h-6" />}
                                </button>
                            );
                        })}
                    </div>

                    {/* Explanation Section */}
                    {answeredCurrent && (
                        <div className="bg-blue-50 border-l-4 border-cyan-500 p-6 rounded-r-xl mb-6 animate-fade-in-up">
                            <h3 className="text-cyan-700 font-bold uppercase text-sm tracking-wide mb-2">Explanation / Explication</h3>
                            <p className="text-gray-800 mb-2">🇬🇧 {questions[currentQIndex].explanationEn}</p>
                            <p className="text-gray-600 italic">🇫🇷 {questions[currentQIndex].explanationFr}</p>
                        </div>
                    )}

                    {/* Action Bar */}
                    <div className="flex justify-end mt-4">
                        {answeredCurrent && (
                            <button 
                                onClick={nextQuestion}
                                className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-700 transition-colors flex items-center shadow-xl"
                            >
                                {currentQIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                                <ChevronRight className="ml-2 w-5 h-5" />
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
      )}

      {/* --- BREAK MODAL --- */}
      {showBreakModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
             <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center m-4 border-2 border-cyan-400">
                <Pause className="w-16 h-16 text-cyan-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Time for a Break?</h2>
                <p className="text-gray-600 mb-8">You've completed 20 questions! Taking a short rest improves retention.</p>
                <div className="flex flex-col gap-3">
                    <button onClick={triggerBreak} className="w-full bg-cyan-600 text-white py-3 rounded-xl font-bold hover:bg-cyan-500 shadow-lg">
                        Take 5 Minute Break
                    </button>
                    <button onClick={skipBreak} className="w-full bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200">
                        Skip & Continue
                    </button>
                </div>
             </div>
        </div>
      )}

      {/* --- ACTIVE BREAK SCREEN --- */}
      {isBreakActive && (
          <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-cyan-900 text-white relative overflow-hidden">
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
             <div className="z-10 text-center">
                 <h2 className="text-4xl font-bold mb-8 text-cyan-300">Break Time</h2>
                 <div className="text-9xl font-mono font-bold mb-12 tracking-tighter drop-shadow-[0_0_30px_rgba(0,255,255,0.6)]">
                    {formatTime(breakTimer)}
                 </div>
                 <p className="text-cyan-200 mb-8 max-w-md mx-auto">Stand up, stretch, or grab some water. Your brain consolidates memory during rest.</p>
                 <button onClick={endBreak} className="bg-white text-cyan-900 px-8 py-3 rounded-full font-bold hover:bg-cyan-100 transition shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                     Resume Quiz Now
                 </button>
             </div>
          </div>
      )}

      {/* --- RESULT SCREEN --- */}
      {screen === 'result' && (
        <div className="min-h-screen flex flex-col items-center justify-start p-8 overflow-y-auto">
             <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-10 max-w-4xl w-full shadow-2xl border border-white mt-10 mb-10">
                 <div className="text-center mb-10">
                    <div className="inline-block p-4 rounded-full bg-gray-100 mb-4 shadow-inner">
                        <Award className="w-16 h-16 text-yellow-500" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Quiz Complete!</h1>
                    <p className="text-gray-600">Here is your performance summary.</p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center">
                     <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
                         <PieChart value={score} max={questions.length} size={180} color={score > 30 ? "#32CD32" : "#FF3131"} />
                         <div className="mt-4 text-3xl font-bold text-gray-800">{Math.round((score/questions.length)*100)}% Score</div>
                         <div className="text-gray-500">{score} Correct / {questions.length} Total</div>
                     </div>
                     <div className="space-y-4">
                         <div className="bg-green-100 p-4 rounded-xl border border-green-200 flex justify-between items-center">
                             <span className="font-bold text-green-800 flex items-center"><CheckCircle className="w-5 h-5 mr-2"/> Correct</span>
                             <span className="font-bold text-2xl text-green-700">{score}</span>
                         </div>
                         <div className="bg-red-100 p-4 rounded-xl border border-red-200 flex justify-between items-center">
                             <span className="font-bold text-red-800 flex items-center"><XCircle className="w-5 h-5 mr-2"/> Incorrect</span>
                             <span className="font-bold text-2xl text-red-700">{questions.length - score}</span>
                         </div>
                         <div className="bg-blue-100 p-4 rounded-xl border border-blue-200 flex justify-between items-center">
                             <span className="font-bold text-blue-800 flex items-center"><Clock className="w-5 h-5 mr-2"/> Time Left</span>
                             <span className="font-bold text-2xl text-blue-700">{formatTime(timeRemaining)}</span>
                         </div>
                     </div>
                 </div>

                 <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Detailed Review</h3>
                 <div className="space-y-4">
                     {questions.map((q, i) => (
                         <div key={q.id} className={`p-5 rounded-xl border-l-4 ${userAnswers[i] === q.correct ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                             <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-gray-900 text-lg">Q{i+1}: {q.question}</h4>
                                {userAnswers[i] === q.correct 
                                    ? <CheckCircle className="text-green-500 shrink-0" />
                                    : <XCircle className="text-red-500 shrink-0" />
                                }
                             </div>
                             <p className="text-sm text-gray-600 mb-1"><span className="font-semibold">Your Answer:</span> {q.options[userAnswers[i]] || "Skipped"}</p>
                             <p className="text-sm text-green-700 mb-3"><span className="font-semibold">Correct Answer:</span> {q.options[q.correct]}</p>
                             <div className="text-sm bg-white/50 p-3 rounded-lg">
                                 <p className="mb-1"><strong>En:</strong> {q.explanationEn}</p>
                                 <p className="italic text-gray-600"><strong>Fr:</strong> {q.explanationFr}</p>
                             </div>
                         </div>
                     ))}
                 </div>

                 <div className="mt-12 text-center">
                     <button 
                        onClick={startQuiz}
                        className="bg-gray-900 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-700 shadow-xl transition-all transform hover:scale-105 flex items-center mx-auto"
                     >
                        <RefreshCw className="mr-2 w-5 h-5" />
                        Restart Quiz
                     </button>
                 </div>
             </div>
        </div>
      )}

      {/* Global CSS styles for custom animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-in {
            0% { transform: translate(-50%, -50px); opacity: 0; }
            60% { transform: translate(-50%, 10px); opacity: 1; }
            100% { transform: translate(-50%, 0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out; }
        .animate-bounce-in { animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55); }
      `}</style>
    </div>
  );
}
