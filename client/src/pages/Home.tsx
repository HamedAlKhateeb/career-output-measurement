/**
 * Design philosophy — أطلس المسارات: a warm, cartographic RTL workspace where
 * evidence is more visible than intention. One shared base, several measurable branches.
 */
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  ChevronLeft,
  CircleHelp,
  Code2,
  Compass,
  FileCheck2,
  FlaskConical,
  Gauge,
  Layers3,
  Map,
  PenLine,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type PathId = "math" | "mechanics" | "ai" | "software" | "product";

type LearningStep = {
  id: string;
  label: string;
  learn: string;
  measure: string;
  deliverable: string;
};

type Pathway = {
  id: PathId;
  title: string;
  eyebrow: string;
  color: "navy" | "teal" | "orange" | "blue" | "ink" | "rose";
  icon: typeof FlaskConical;
  purpose: string;
  minimumProject: string;
  transferable: string;
  criteria: { id: string; label: string; detail: string; weight: string }[];
  learning: LearningStep[];
  nextMove: string;
};

type ResearchTopic = {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  lane: "anchor" | "hybrid" | "ambitious" | "applied" | "reliable";
  icon: typeof FlaskConical;
  score: string;
  fit: string;
  pitch: string;
  minimumScope: string;
  market: string;
  risk: string;
  ask: string;
};

const PATHWAYS: Pathway[] = [
  {
    id: "math",
    title: "القاعدة الأكاديمية",
    eyebrow: "Applied Mathematics",
    color: "navy",
    icon: BookOpen,
    purpose: "تحويل الماجستير من شهادة عامة إلى دليل بحثي قابل للتقديم خارج مصر.",
    minimumProject: "ملف بحثي من 4–6 صفحات يشرح مسألة محددة في PDE أو FEA، مع مراجع وخطة تجربة أو thesis question.",
    transferable: "يخدم منح الماجستير، الدكتوراه، Scientific Computing وAI for Engineering.",
    criteria: [
      { id: "topic", label: "موضوع محدد", detail: "سؤال واحد قابل للبحث، لا قائمة اهتمامات.", weight: "أساسي" },
      { id: "literature", label: "3 مراجع حديثة", detail: "ملخص قصير لما ستبني عليه كل ورقة.", weight: "دليل" },
      { id: "artifact", label: "ملف بحثي أو عرض", detail: "PDF أو مستودع يشرح المسألة والخطوة التالية.", weight: "قابل للعرض" },
      { id: "mentor", label: "مراجعة أكاديمية", detail: "تعليق من مشرف أو أستاذ على الفكرة.", weight: "تحقق" },
    ],
    learning: [
      { id: "weak-form", label: "01 / الأساس الرياضي", learn: "الـweak form، شروط الحدود، ومعنى L2 error في مسألة elliptic بسيطة.", measure: "اشتق weak form بنفسك ثم حل 1D Poisson مع solution تحليلي وL2 error أقل من 5% على شبكة معقولة.", deliverable: "صفحتان اشتقاق + notebook أو ملف كود مع رسم الحل والخطأ." },
      { id: "convergence", label: "02 / التحقق العددي", learn: "mesh refinement وconvergence rate وكيف تقرأ error–DoF plot.", measure: "شغّل ثلاث درجات شبكة على الأقل، وارسم الخطأ مقابل عدد درجات الحرية واشرح النتيجة في 150 كلمة.", deliverable: "منحنى تقارب موثق وREADME قصير." },
      { id: "research-project", label: "03 / بوابة المشروع", learn: "صياغة سؤال بحثي صغير وربط solver بـbenchmark أو ورقة مرجعية.", measure: "أعد إنتاج benchmark واحد أو نتيجة منشورة، ثم غيّر عاملًا واحدًا فقط مثل coefficient أو geometry أو error indicator.", deliverable: "مستودع مشروع + صفحة مقارنة + سؤال thesis قابل للنقاش." },
    ],
    nextMove: "ثبّت سؤالًا واحدًا يمكن أن يصبح thesis أو proposal.",
  },
  {
    id: "mechanics",
    title: "المحاكاة والميكانيكا",
    eyebrow: "Computational Mechanics",
    color: "teal",
    icon: FlaskConical,
    purpose: "إثبات أن FEM وPDEs تحولت إلى نموذج عددي يمكن تشغيله وفحصه.",
    minimumProject: "مسألة 2D صغيرة في انتقال الحرارة أو المرونة: نموذج، شروط حدية، حل عددي، ورسم يوضح الخطأ أو التقارب.",
    transferable: "يخدم PhD، Simulation/CAE، Scientific Computing وScientific ML.",
    criteria: [
      { id: "problem", label: "مسألة فيزيائية واضحة", detail: "ماذا نمذجت؟ ولماذا هذا النموذج؟", weight: "أساسي" },
      { id: "solver", label: "Solver قابل للتشغيل", detail: "Python/FEniCS أو أداة مناسبة مع خطوات التشغيل.", weight: "تنفيذي" },
      { id: "validation", label: "تحقق أو مقارنة", detail: "حل تحليلي مبسط، baseline أو convergence study.", weight: "موثوقية" },
      { id: "report", label: "نتيجة قابلة للقراءة", detail: "README + رسمين + قرار تقني واضح.", weight: "قابل للعرض" },
    ],
    learning: [
      { id: "mechanics-base", label: "01 / الميكانيكا الأساسية", learn: "small strain، plane stress/plane strain، وشروط الحدود في elasticity أو heat transfer.", measure: "اشرح اختيارك لحالة plane stress أو plane strain، ثم احسب benchmark cantilever أو plate/heat بسيطًا وقارن quantity واحدة بمرجع معروف ضمن 5–10%.", deliverable: "مذكرة قرار فيزيائي + رسم displacement/temperature." },
      { id: "fem-workflow", label: "02 / سير عمل FEM", learn: "mesh، material model، boundary conditions، وpost-processing في Python/FEniCS أو الأداة المختارة.", measure: "شغّل النموذج بثلاث كثافات mesh، وبيّن أن quantity of interest لا تتغير بصورة جوهرية بعد مستوى refinement محدد.", deliverable: "ملف تشغيل قابل للتكرار + جدول mesh convergence." },
      { id: "mechanics-project", label: "03 / بوابة المشروع", learn: "تحديد تجربة عددية لها قرار هندسي، لا مجرد visualisation.", measure: "اختر parameter واحدًا أو geometry واحدًا، أنشئ 6 حالات تشغيل على الأقل، وقدّم recommendation قائمة على النتيجة والقيود.", deliverable: "case study من 4 صفحات أو README مع figures وقرار هندسي." },
    ],
    nextMove: "اختر مسألة صغيرة تنتهي خلال 3 أسابيع، لا مشروع محاكاة شامل.",
  },
  {
    id: "ai",
    title: "الذكاء الاصطناعي والبيانات",
    eyebrow: "AI · ML · Data",
    color: "orange",
    icon: BrainCircuit,
    purpose: "تحويل تعلم AI من محتوى استهلاكي إلى تجربة يمكن قياسها ومقارنتها.",
    minimumProject: "نموذج صغير على بيانات حقيقية أو هندسية: baseline، نموذج محسّن، مقياس أداء، وشرح لسبب النتيجة.",
    transferable: "يخدم Data/ML، AI Product، AI for Engineering وطلبات الدراسة.",
    criteria: [
      { id: "dataset", label: "بيانات موثقة", detail: "مصدر واضح، وصف للمتغيرات، وتنظيف مبدئي.", weight: "أساسي" },
      { id: "baseline", label: "Baseline صريح", detail: "لا تبدأ بالنموذج المعقد؛ قارن بخط أساس.", weight: "منهجي" },
      { id: "metric", label: "مقياس واحد مفهوم", detail: "Accuracy أو MAE أو F1 مع تفسير للسياق.", weight: "قابل للقياس" },
      { id: "story", label: "قصة قرار", detail: "ماذا تعلمت؟ وما القرار الذي تغيّر بسبب النموذج؟", weight: "منتجي" },
    ],
    learning: [
      { id: "data-foundation", label: "01 / دورة البيانات", learn: "تنظيف البيانات، train/validation/test split، data leakage، وbaseline بسيط.", measure: "خذ dataset واحدًا موثقًا، أنشئ data dictionary صغيرًا، وابنِ baseline قبل أي نموذج متقدم مع metric واحدة معلنة.", deliverable: "notebook نظيف + baseline metric + وصف بيانات." },
      { id: "ml-evaluation", label: "02 / تقييم النموذج", learn: "اختيار metric، cross-validation أو holdout، error analysis، والفرق بين performance وbusiness value.", measure: "قارن baseline بنموذج ثانٍ، ثم اعرض جدولًا يشرح لماذا تحسن أو لم يتحسن، مع فحص خطأ واحد على الأقل.", deliverable: "جدول مقارنة + 3 أمثلة أخطاء أو residual plot." },
      { id: "ai-project", label: "03 / بوابة المشروع", learn: "تحويل النموذج إلى مشروع قرار أو مشروع هندسي صغير.", measure: "اكتب سؤالًا محددًا، success threshold مسبقًا، وقرارًا كان سيتغير لو حقق النموذج هذا الحد.", deliverable: "project brief + رابط notebook/repo + صفحة نتائج." },
    ],
    nextMove: "استخدم بيانات صغيرة ونظيفة؛ المقياس الواضح أهم من حجم النموذج.",
  },
  {
    id: "software",
    title: "البرمجيات العلمية",
    eyebrow: "Python · Backend · Tools",
    color: "blue",
    icon: Code2,
    purpose: "بناء دليل أن الكود ليس تجربة مؤقتة، بل أداة يمكن لغيرك تشغيلها وفهمها.",
    minimumProject: "أداة Python صغيرة أو API بسيطة تحل مشكلة محددة، مع README وtest واحد على الأقل ومثال إدخال/إخراج.",
    transferable: "يخدم Scientific Software، Backend، AI، المشاريع المستقلة والعمل عن بعد.",
    criteria: [
      { id: "scope", label: "وظيفة واحدة واضحة", detail: "أداة لها مستخدم أو use case محدد.", weight: "أساسي" },
      { id: "repo", label: "مستودع منظم", detail: "README، إعداد تشغيل، وترخيص بسيط إن لزم.", weight: "قابل للفحص" },
      { id: "test", label: "اختبار أو تحقق", detail: "اختبار unit واحد أو تحقق واضح من المخرج.", weight: "جودة" },
      { id: "demo", label: "عرض قصير", detail: "GIF أو screenshot أو مثال API موثق.", weight: "قابل للعرض" },
    ],
    learning: [
      { id: "python-workflow", label: "01 / أساس الأداة", learn: "functions، data structures، NumPy/Pandas، plotting، وإدارة بيئة تشغيل واضحة.", measure: "اكتب script أو package صغيرًا يأخذ input من ملف ويخرج نتيجة أو رسمًا، ويعمل من بيئة نظيفة بخطوتي تشغيل فقط.", deliverable: "CLI أو script + requirements + example input/output." },
      { id: "quality-workflow", label: "02 / قابلية الصيانة", learn: "Git، تنظيم المشروع، exception handling، وtest بسيط لما يهم المستخدم.", measure: "أضف test واحدًا ناجحًا، وتحققًا من input غير صالح، وREADME يشرح من هو المستخدم وما المشكلة التي تحلها الأداة.", deliverable: "repository منظم + test + README." },
      { id: "software-project", label: "03 / بوابة المشروع", learn: "تحويل الكود إلى أداة تستخدم أو تُعرض، لا مجرد ملف تجربة.", measure: "قدّم ثلاث user flows أو أمثلة استخدام حقيقية، مع screenshot أو demo واحد يثبت النتيجة من البداية للنهاية.", deliverable: "مستودع قابل للعرض + demo + issue/roadmap واحد." },
    ],
    nextMove: "ابنِ أداة صغيرة يستخدمها شخص آخر، لا clone لتطبيق كبير.",
  },
  {
    id: "product",
    title: "المنتج التقني",
    eyebrow: "AI · Data Product",
    color: "ink",
    icon: BriefcaseBusiness,
    purpose: "تحويل تجربة Product Management إلى أثر ملموس يمكن عرضه في فرص AI أو Data Product.",
    minimumProject: "قرار منتج موثق: مشكلة مستخدم، فرضية، مقياس، تجربة أو إطلاق محدود، ونتيجة أو تعلم واضح.",
    transferable: "يخدم AI Product، Technical Product، العمل الدولي وخبرة السوق.",
    criteria: [
      { id: "problem", label: "مشكلة مستخدم", detail: "شخص محدد وسياق محدد، لا «تحسين المنتج».", weight: "أساسي" },
      { id: "hypothesis", label: "فرضية قابلة للاختبار", detail: "إذا فعلنا X، سيتغير Y بسبب Z.", weight: "منهجي" },
      { id: "metric", label: "مقياس سلوك", detail: "Activation، completion أو retention حسب السياق.", weight: "قابل للقياس" },
      { id: "decision", label: "قرار موثق", detail: "ماذا أبقيت أو أوقفت أو غيّرت؟", weight: "أثر" },
    ],
    learning: [
      { id: "problem-evidence", label: "01 / دليل المشكلة", learn: "Problem framing، user segment، وفرق الإشارة عن الرأي الشخصي.", measure: "وثّق ثلاث إشارات فعلية على الأقل: ملاحظات مقابلات حقيقية، تذاكر دعم، analytics، أو feedback موجود بالفعل؛ لا تُنشئ بيانات وهمية.", deliverable: "problem brief من صفحة واحدة مع مصادر الإشارات." },
      { id: "experiment-design", label: "02 / قرار قابل للاختبار", learn: "hypothesis، metric، success threshold، ومتى تتوقف التجربة.", measure: "اكتب فرضية بصيغة إذا/فإن، metric واحدة، وعتبة نجاح قبل التنفيذ، ثم اربطها بقرار محدد: build، iterate، أو stop.", deliverable: "experiment card أو PRD مختصر." },
      { id: "product-project", label: "03 / بوابة المشروع", learn: "تحويل العمل إلى case study مهنية دون كشف معلومات حساسة.", measure: "وثّق قرارًا حقيقيًا أو تجربة محدودة: ما المشكلة، ما الدليل، ماذا جُرّب، وما النتيجة أو التعلم، مع إخفاء أي بيانات داخلية.", deliverable: "case study من 2–4 صفحات أو عرض مختصر." },
    ],
    nextMove: "اختر feature واحدة في عملك الحالي يمكن أن يصبح لها case study منضبط.",
  },
];

const RESEARCH_TOPICS: ResearchTopic[] = [
  {
    id: "t1",
    code: "T1",
    title: "Adaptive Riesz–Caputo FEM",
    subtitle: "المسار الآمن والأقوى إشرافيًا",
    lane: "anchor",
    icon: BookOpen,
    score: "4.35",
    fit: "ملاءمة إشراف مباشرة",
    pitch: "طريقة عناصر محددة تكيفية لمعادلة انتشار كسرية ثنائية البعد من نوع Riesz–Caputo، مع تقدير خطأ بعدي يقارن الشبكة التكيفية بالشبكة الموحدة عند نفس كلفة الحساب.",
    minimumScope: "PDE واحدة + benchmark أو manufactured solution + adaptive mesh + منحنيات error–DoF وruntime.",
    market: "Numerical PDEs · FEM · error estimation · scientific computing",
    risk: "الخطر هو تكرار ورقة منشورة بتغيير اسم المعادلة فقط؛ يجب تثبيت إضافة مثل non-smooth data أو variable coefficient أو goal-oriented estimator.",
    ask: "هل يمكن أن نأخذ حالة ثنائية البعد أو معاملات متغيرة، ونبني error estimator نقارن به refinement التكيفي مع الشبكة الموحدة؟",
  },
  {
    id: "t2",
    code: "T2",
    title: "Inverse Fractional PDE + PINN",
    subtitle: "أفضل توازن بين AI وخط الأستاذ",
    lane: "hybrid",
    icon: BrainCircuit,
    score: "4.25",
    fit: "FEM قوي + ML امتداد منضبط",
    pitch: "تحديد عكسي لرتبة كسرية أو معامل انتشار من قياسات محدودة وضوضائية، باستخدام adaptive FEM كمرجع عددي ثم مقارنته بـfractional PINN واحد.",
    minimumScope: "مسألة انتشار واحدة + معامل مجهول واحد + بيانات صناعية من FEM + 2–3 مستويات ضوضاء + قياس parameter/solution error.",
    market: "Scientific ML · inverse problems · model calibration · AI for Engineering",
    risk: "المؤثر الكسري غير محلي؛ لا تبدأ بثلاثة مؤثرات أو بيانات حقيقية أو network كبير. اجعل نجاح الرسالة قائمًا حتى لو بقي الـPINN امتدادًا.",
    ask: "هل يمكن أن نصوغ مسألة inverse صغيرة في fractional diffusion، ونستخدم adaptive FEM كمرجع ثم نقارن fractional PINN بالخطأ والضوضاء؟",
  },
  {
    id: "t3",
    code: "T3",
    title: "Uncertainty-aware Neural Surrogate",
    subtitle: "خيار طموح للمحاكاة السريعة الموثوقة",
    lane: "ambitious",
    icon: Gauge,
    score: "3.70",
    fit: "PDE مناسب، UQ/Operator Learning متقدم",
    pitch: "بديل عصبي سريع لعائلة صغيرة من مسائل fractional heat أو diffusion، مع تقدير عدم يقين يحدد الحالات التي تحتاج FEM إضافيًا.",
    minimumScope: "PDE واحدة ذات 2–3 معاملات + بيانات FEM لعدد محدود من الحالات + DeepONet أو FNO واحد + اختبار خارج نطاق التدريب.",
    market: "operator learning · surrogate modeling · UQ · accelerated simulation",
    risk: "عالي المخاطرة للماجستير إذا بدأ مباشرة بـFNO أو digital twin؛ يحتاج data generation وحوسبة وتقييم uncertainty calibration.",
    ask: "هل ترى أن هذا يصلح كامتداد بعد بناء solver FEM موثوق، أم أنه يحتاج توجيهًا أو تعاونًا إضافيًا في ML؟",
  },
  {
    id: "t4",
    code: "T4",
    title: "Fractional Solar Heat + ROM",
    subtitle: "مسار تطبيقي في الحرارة والطاقة الشمسية",
    lane: "applied",
    icon: FlaskConical,
    score: "3.80",
    fit: "متصل بأعمال الحرارة والمجمعات الشمسية",
    pitch: "نموذج انتقال حرارة عابر من نوع كسري في مجمع حراري شمسي، مع adaptive FEM أو reduced-order model لقياس الدقة والزمن.",
    minimumScope: "نموذج حراري 2D واحد + حالة transient واحدة + FEM مرجعي + adaptive mesh أو POD/ROM بسيط + error/runtime.",
    market: "renewable energy simulation · thermal modeling · computational engineering",
    risk: "لا تجعل digital twin عنوانًا أوليًا. تحتاج معادلات ومعاملات أو benchmark واضحًا قبل الالتزام، وقد يفيد وجود متعاون في الطاقة الحرارية.",
    ask: "هل يوجد نموذج حراري أو benchmark أو تعاون قائم يمكن أن يجعل هذا التطبيق قابلًا للتحقق بدل أن يبقى عنوانًا عامًا؟",
  },
  {
    id: "t5",
    code: "T5",
    title: "Stochastic Fractional Adaptive FEM",
    subtitle: "المسار المتين للموثوقية الهندسية",
    lane: "reliable",
    icon: ShieldCheck,
    score: "4.00",
    fit: "يربط fractional FEM بالـstochastic FEM",
    pitch: "عناصر محددة تكيفية لمعادلة انتشار كسرية ذات معاملات مادية عشوائية، مع قياس كيف يتوزع الخطأ بين الشبكة وتمثيل عدم اليقين.",
    minimumScope: "PDE واحدة + coefficient عشوائي واحد أو اثنان + adaptive FEM + Monte Carlo أو stochastic collocation بسيط + error–cost curves.",
    market: "reliable simulation · uncertainty quantification · stochastic FEM",
    risk: "لا تجمع fractional PDE وadaptive FEM وUQ نظريًا كاملًا. أبقه على quantity of interest واحدة وcoefficient عشوائي بسيط.",
    ask: "هل يمكن أن نربط أعمال stochastic FEM بالأعمال الحديثة في adaptive fractional FEM، ونقيس توزيع الجهد بين mesh refinement وعدد العينات؟",
  },
];

const STORAGE_KEY = "atlas-output-measurement-v1";

function scoreForPath(path: Pathway, checked: Record<string, boolean>) {
  return Math.round((path.criteria.filter((item) => checked[`${path.id}.${item.id}`]).length / path.criteria.length) * 100);
}

function learningScoreForPath(path: Pathway, checked: Record<string, boolean>) {
  return Math.round((path.learning.filter((item) => checked[`${path.id}.${item.id}`]).length / path.learning.length) * 100);
}

function statusFor(score: number) {
  if (score === 100) return { label: "جاهز للعرض", className: "status-ready" };
  if (score >= 50) return { label: "قيد البناء", className: "status-growing" };
  return { label: "يحتاج دليل", className: "status-seed" };
}

function Ring({ value, size = 78 }: { value: number; size?: number }) {
  const radius = 29;
  const circumference = 2 * Math.PI * radius;
  const dash = (value / 100) * circumference;
  return (
    <div className="ring" style={{ width: size, height: size }} aria-label={`الجاهزية ${value}%`}>
      <svg viewBox="0 0 72 72" aria-hidden="true">
        <circle cx="36" cy="36" r={radius} className="ring-track" />
        <circle cx="36" cy="36" r={radius} className="ring-value" strokeDasharray={`${dash} ${circumference - dash}`} />
      </svg>
      <span>{value}<small>%</small></span>
    </div>
  );
}

export default function Home() {
  const [selectedId, setSelectedId] = useState<PathId>("math");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [learningChecked, setLearningChecked] = useState<Record<string, boolean>>({});
  const [selectedTopicId, setSelectedTopicId] = useState("t1");
  const [meetingTopics, setMeetingTopics] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as {
          selectedId?: PathId;
          checked?: Record<string, boolean>;
          notes?: Record<string, string>;
          learningChecked?: Record<string, boolean>;
          selectedTopicId?: string;
          meetingTopics?: Record<string, boolean>;
        };
        if (parsed.selectedId) setSelectedId(parsed.selectedId);
        if (parsed.checked) setChecked(parsed.checked);
        if (parsed.notes) setNotes(parsed.notes);
        if (parsed.learningChecked) setLearningChecked(parsed.learningChecked);
        if (parsed.selectedTopicId) setSelectedTopicId(parsed.selectedTopicId);
        if (parsed.meetingTopics) setMeetingTopics(parsed.meetingTopics);
      }
    } catch {
      // If local persistence is unavailable, the dashboard continues as an in-memory workspace.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ selectedId, checked, notes, learningChecked, selectedTopicId, meetingTopics }));
  }, [selectedId, checked, notes, learningChecked, selectedTopicId, meetingTopics, hydrated]);

  const selected = PATHWAYS.find((path) => path.id === selectedId) ?? PATHWAYS[0];
  const selectedScore = scoreForPath(selected, checked);
  const selectedStatus = statusFor(selectedScore);
  const completedCount = Object.values(checked).filter(Boolean).length;
  const allCount = PATHWAYS.reduce((sum, path) => sum + path.criteria.length, 0);
  const overall = Math.round((completedCount / allCount) * 100);
  const nextCriterion = selected.criteria.find((item) => !checked[`${selected.id}.${item.id}`]);
  const activePaths = PATHWAYS.filter((path) => scoreForPath(path, checked) > 0).length;
  const selectedLearningScore = learningScoreForPath(selected, learningChecked);
  const selectedLearningCompleted = selected.learning.filter((item) => learningChecked[`${selected.id}.${item.id}`]).length;
  const learningGate = selectedLearningCompleted === 3
    ? "جاهز لتحويل المخرج إلى مشروع قابل للعرض"
    : selectedLearningCompleted === 2
      ? "يمكنك بدء نسخة تجريبية صغيرة؛ لا توسع النطاق بعد"
      : "أكمل محطتين تعلم على الأقل قبل بدء مشروع كبير";
  const selectedTopic = RESEARCH_TOPICS.find((topic) => topic.id === selectedTopicId) ?? RESEARCH_TOPICS[0];
  const selectedMeetingCount = Object.values(meetingTopics).filter(Boolean).length;

  const measure = useMemo(
    () => [
      { label: "الأدلة المكتملة", value: `${completedCount}/${allCount}`, icon: FileCheck2 },
      { label: "الفروع النشطة", value: `${activePaths}/${PATHWAYS.length}`, icon: Layers3 },
      { label: "الجاهزية الكلية", value: `${overall}%`, icon: Gauge },
    ],
    [activePaths, completedCount, overall, allCount],
  );

  const toggleItem = (criterionId: string) => {
    const key = `${selected.id}.${criterionId}`;
    setChecked((current) => ({ ...current, [key]: !current[key] }));
  };

  const toggleLearningItem = (stepId: string) => {
    const key = `${selected.id}.${stepId}`;
    setLearningChecked((current) => ({ ...current, [key]: !current[key] }));
  };

  const resetProgress = () => {
    setChecked({});
    setNotes({});
    setLearningChecked({});
    setSelectedId("math");
    setMeetingTopics({});
    setSelectedTopicId("t1");
  };

  const toggleMeetingTopic = (topicId: string) => {
    setMeetingTopics((current) => ({ ...current, [topicId]: !current[topicId] }));
  };

  return (
    <div className="atlas-app" dir="rtl">
      <aside className="atlas-sidebar">
        <div className="brand-lockup">
          <img src="/manus-storage/atlas-route-mark_d831064a.png" alt="رمز أطلس المسارات" className="brand-mark" />
          <div>
            <p className="brand-eyebrow">ATLAS / 01</p>
            <h1>أطلس المسارات</h1>
          </div>
        </div>

        <div className="sidebar-copy">
          <p className="eyebrow">لوحة قياس شخصية</p>
          <p>لا تقِس النية؛ قِس الدليل الذي يبقى بعد انتهاء الأسبوع.</p>
        </div>

        <div className="atlas-stamp" aria-label="ختم نظام الأطلس">
          <img src="/manus-storage/atlas-route-mark_d831064a.png" alt="" />
          <span>نظام قياس<br />المسارات</span>
        </div>

        <nav className="path-nav" aria-label="فروع المسار">
          <p className="nav-label">فروعك القابلة للقياس</p>
          {PATHWAYS.map((path, index) => {
            const Icon = path.icon;
            const score = scoreForPath(path, checked);
            return (
              <button
                key={path.id}
                className={`path-nav-item ${selected.id === path.id ? "is-active" : ""}`}
                onClick={() => setSelectedId(path.id)}
                type="button"
              >
                <span className={`path-dot ${path.color}`}><Icon size={15} /></span>
                <span className="path-nav-text">
                  <strong>{path.title}</strong>
                  <small>{path.eyebrow}</small>
                </span>
                <span className="path-score">{String(index + 1).padStart(2, "0")}</span>
                <span className="path-mini-progress"><i style={{ width: `${score}%` }} /></span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="base-card">
            <Map size={18} />
            <div>
              <span>القاعدة المشتركة</span>
              <strong>ماجستير + عمل + دليل</strong>
            </div>
          </div>
          <button className="reset-button" onClick={resetProgress} type="button"><RotateCcw size={14} /> إعادة القياس</button>
        </div>
      </aside>

      <main className="atlas-main">
        <header className="topbar">
          <div>
            <p className="eyebrow">شجرة قرار شخصية / مسارات متوازية</p>
            <h2>حوّل الفروع إلى أدلة يمكن قياسها.</h2>
          </div>
          <div className="topbar-state">
            <span className="pulse-dot" />
            <span>الحالة تحفظ محليًا على هذا الجهاز</span>
          </div>
        </header>

        <section className="route-hero">
          <img src="/manus-storage/atlas-hero_f225fbfa.png" alt="خلفية خريطة مسارات مجردة" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <div className="hero-chip"><Compass size={16} /> حالة الشجرة الآن</div>
            <h3><em>{completedCount}</em> من {allCount}<br />دليلًا مكتملًا على الخريطة.</h3>
            <p>القاعدة ثابتة: ماجستير + عمل. الفروع لا تحتاج حسمًا الآن؛ تحتاج دليلًا صغيرًا يجعلها قابلة للمراجعة والانتقال.</p>
            <div className="hero-tree-status" aria-label="مفتاح حالة الشجرة">
              <span><i className="semantic-navy" /> القاعدة: ثابتة</span>
              <span><i className="semantic-teal" /> الدليل: قابل للنقل</span>
              <span><i className="semantic-orange" /> الفرع: قيد تجربة</span>
            </div>
            <div className="hero-footer">
              <span><Target size={15} /> المخرج الرئيسي لهذه الدورة: <b>{selected.title}</b></span>
              <button onClick={() => document.getElementById("measure")?.scrollIntoView({ behavior: "smooth" })} type="button">ابدأ القياس <ArrowLeft size={16} /></button>
            </div>
          </div>
          <div className="hero-marker marker-one"><span>01</span><i /></div>
          <div className="hero-marker marker-two"><span>02</span><i /></div>
        </section>

        <section className="metrics-grid" aria-label="مؤشرات التقدم">
          {measure.map((item) => {
            const Icon = item.icon;
            return (
              <div className="metric-card" key={item.label}>
                <span className="metric-icon"><Icon size={18} /></span>
                <div><small>{item.label}</small><strong>{item.value}</strong></div>
              </div>
            );
          })}
          <div className="metric-card metric-message">
            <Sparkles size={18} />
            <p>{overall === 0 ? "ابدأ بدليل واحد؛ لا تختر التخصص النهائي اليوم." : "كل بند منجز يجب أن يبقى قابلًا للعرض أو لإعادة الاستخدام."}</p>
          </div>
        </section>

        <section className="path-map-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">الخريطة الحية</p>
              <h3>فروعك لا تحتاج إلى قرار نهائي الآن.</h3>
            </div>
            <span className="section-note"><span className="legend-dot teal" /> مخرج مكتمل <span className="legend-dot orange" /> فرع قيد التجربة</span>
          </div>
          <div className="route-map">
            <div className="route-base"><span>القاعدة</span><strong>Applied Mathematics<br />+ العمل الحالي</strong></div>
            <div className="route-lines" aria-hidden="true"><i /><i /><i /><i /><i /></div>
            <div className="route-nodes">
              {PATHWAYS.map((path) => {
                const Icon = path.icon;
                const score = scoreForPath(path, checked);
                return (
                  <button
                    key={path.id}
                    className={`route-node ${path.color} ${selected.id === path.id ? "is-selected" : ""}`}
                    onClick={() => setSelectedId(path.id)}
                    type="button"
                  >
                    <span className="node-icon"><Icon size={18} /></span>
                    <strong>{path.title}</strong>
                    <small>{score}% جاهزية</small>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="workspace" id="measure">
          <div className="workspace-main">
            <div className="path-header">
              <div className="path-header-top">
                <span className="eyebrow">المسار المختار / {selected.eyebrow}</span>
                <span className={`status-pill ${selectedStatus.className}`}>{selectedStatus.label}</span>
              </div>
              <div className="path-title-row">
                <div><h3>{selected.title}</h3><p>{selected.purpose}</p></div>
                <Ring value={selectedScore} />
              </div>
            </div>

            <div className="minimum-project-card">
              <img src="/manus-storage/route-milestones_2d1f5e61.png" alt="عقد مسار مجردة" />
              <div className="minimum-copy">
                <span className="eyebrow"><FlaskConical size={14} /> الحد الأدنى القابل للبناء</span>
                <h4>{selected.minimumProject}</h4>
                <p><Layers3 size={15} /> <b>قابل للنقل:</b> {selected.transferable}</p>
              </div>
            </div>

            <div className="checklist-card">
              <div className="checklist-heading">
                <div><p className="eyebrow">قائمة الدليل</p><h4>متى يصبح المشروع قابلًا للقياس؟</h4></div>
                <span>{selected.criteria.filter((item) => checked[`${selected.id}.${item.id}`]).length} / {selected.criteria.length}</span>
              </div>
              <div className="checklist-items">
                {selected.criteria.map((criterion, index) => {
                  const key = `${selected.id}.${criterion.id}`;
                  const isDone = Boolean(checked[key]);
                  return (
                    <button className={`check-item ${isDone ? "is-done" : ""}`} onClick={() => toggleItem(criterion.id)} type="button" key={criterion.id}>
                      <span className="check-box">{isDone && <Check size={14} strokeWidth={3} />}</span>
                      <span className="check-index">{String(index + 1).padStart(2, "0")}</span>
                      <span className="check-copy"><strong>{criterion.label}</strong><small>{criterion.detail}</small></span>
                      <span className="weight-tag">{criterion.weight}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="workspace-side">
            <div className="next-card">
              <div className="next-icon"><ChevronLeft size={19} /></div>
              <p className="eyebrow">الخطوة التالية</p>
              <h4>{nextCriterion ? nextCriterion.label : "المسار جاهز للعرض"}</h4>
              <p>{nextCriterion ? nextCriterion.detail : "لديك الحد الأدنى من الدليل. حوّله إلى رابط أو ملف أو طلب فعلي."}</p>
              <div className="next-rule"><CircleHelp size={15} /> لا تبدأ بندًا جديدًا قبل أن تستطيع تسمية المخرج الذي سيبقى.</div>
            </div>

            <div className="note-card">
              <div className="note-heading"><PenLine size={16} /><span>سجل الدليل</span></div>
              <textarea
                value={notes[selected.id] ?? ""}
                onChange={(event) => setNotes((current) => ({ ...current, [selected.id]: event.target.value }))}
                placeholder="اكتب رابطًا، ملاحظة، أو اسم المخرج الذي تبنيه الآن…"
                aria-label="سجل الدليل للمسار المختار"
              />
              <small>يحفظ محليًا — مثال: رابط GitHub، اسم الـfeature، أو عنوان ورقة.</small>
            </div>

            <div className="rubric-card">
              <div className="rubric-image"><img src="/manus-storage/evidence-tiles_6d4becae.png" alt="رسم مجرد لأدلة المشروع" /></div>
              <p className="eyebrow">قاعدة القياس</p>
              <h4>لا تعتبره مشروعًا قبل وجود أربعة أشياء.</h4>
              <ul>
                <li><b>مشكلة:</b> ما الذي تحله؟</li>
                <li><b>أثر:</b> ما الذي تغيّر أو ما الذي تعلمته؟</li>
                <li><b>دليل:</b> رابط أو ملف أو نتيجة.</li>
                <li><b>قابلية نقل:</b> أي فرع آخر يستفيد منه؟</li>
              </ul>
            </div>
          </aside>
        </section>

        <section className="measurement-guide">
          <div className="guide-heading">
            <div><p className="eyebrow">من النية إلى الدليل</p><h3>كيف تقيس كل مخرج دون تحويل حياتك إلى dashboard؟</h3></div>
            <Button variant="outline" className="guide-button" onClick={() => setSelectedId("math")}>ارجع إلى القاعدة <ArrowLeft size={16} /></Button>
          </div>
          <div className="guide-grid atlas-guide-grid">
            <article><span>01</span><h4>عرّف المخرج</h4><p>ليس «أتعلّم AI»، بل «أبني baseline ونموذجًا ومقياس MAE على بيانات موثقة».</p></article>
            <article><span>02</span><h4>ضع حدًا أدنى</h4><p>اجعل أول نسخة صغيرة بما يكفي لتنتهي، لكنها حقيقية بما يكفي لأن يعرضها شخص آخر.</p></article>
            <article><span>03</span><h4>وثّق الدليل</h4><p>رابط، README، PDF، رسم، أو case study. ما لا يمكن عرضه لا يُحسب جاهزية كاملة.</p></article>
            <article><span>04</span><h4>راجع قابلية النقل</h4><p>اسأل: هل يخدم هذا المخرج أكثر من فرع؟ إن لم يفعل، فهل يبرر وقته؟</p></article>
          </div>
        </section>

        <section className="learning-ladder-section" id="learning-ladder">
          <div className="section-heading learning-heading">
            <div>
              <p className="eyebrow"><Target size={13} /> مقياس التعلم / {selected.eyebrow}</p>
              <h3>متى يصبح ما تعلمته كافيًا لتبدأ مشروعًا؟</h3>
            </div>
            <div className="learning-readiness"><Ring value={selectedLearningScore} size={58} /><span><b>{selectedLearningCompleted}/3</b><small>{learningGate}</small></span></div>
          </div>

          <div className="learning-brief">
            <div><span className="route-base-dot" /> تعلّم الأساس</div><i /><div><span className="route-evidence-dot" /> اختبره بدليل</div><i /><div><span className="route-decision-dot" /> افتح بوابة المشروع</div>
          </div>

          <div className="learning-steps">
            {selected.learning.map((step, index) => {
              const key = `${selected.id}.${step.id}`;
              const isDone = Boolean(learningChecked[key]);
              return (
                <button className={`learning-step ${isDone ? "is-done" : ""}`} type="button" onClick={() => toggleLearningItem(step.id)} key={step.id}>
                  <span className="learning-node">{isDone ? <Check size={16} strokeWidth={3} /> : String(index + 1).padStart(2, "0")}</span>
                  <span className="learning-copy">
                    <small>{step.label}</small>
                    <strong>{step.learn}</strong>
                    <em><Gauge size={14} /> <b>اختبار القياس:</b> {step.measure}</em>
                    <span className="learning-deliverable"><FileCheck2 size={14} /> {step.deliverable}</span>
                  </span>
                  <span className="learning-toggle">{isDone ? "مكتمل" : "ضع علامة عند الإنجاز"}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="research-topics-section" id="research-topics">
          <div className="section-heading research-heading">
            <div>
              <p className="eyebrow"><img src="/manus-storage/atlas-route-mark_d831064a.png" alt="" className="section-mark" /> خريطة اجتماع الإشراف</p>
              <h3>خمسة موضوعات: اعرض ثلاثة، واترك اثنين كبدائل واعية.</h3>
            </div>
            <div className="meeting-count"><Check size={14} /> اخترت للنقاش: <b>{selectedMeetingCount}/5</b></div>
          </div>

          <div className="research-intro">
            <span className="research-intro-icon"><Target size={18} /></span>
            <span className="route-key" aria-hidden="true"><i /><i /><i /></span>
            <p>لا تذهب بعنوان واسع مثل «AI for Engineering». اذهب بسؤال PDE، baseline عددي، مقياس خطأ، وامتداد واحد فقط. <b>الترتيب المقترح للاجتماع: T1 ثم T2 ثم T4.</b></p>
          </div>

          <div className="topic-grid">
            {RESEARCH_TOPICS.map((topic, index) => {
              const Icon = topic.icon;
              const inMeeting = Boolean(meetingTopics[topic.id]);
              return (
                <button
                  key={topic.id}
                  type="button"
                  className={`topic-card ${topic.lane} ${selectedTopic.id === topic.id ? "is-selected" : ""}`}
                  onClick={() => setSelectedTopicId(topic.id)}
                >
                  <span className="topic-order">{String(index + 1).padStart(2, "0")}</span>
                  <span className="topic-code"><Icon size={15} /> {topic.code}</span>
                  <strong>{topic.title}</strong>
                  <small>{topic.subtitle}</small>
                  <span className="topic-meta"><i /> {topic.fit}</span>
                  <span className="topic-score-badge">{topic.score} <small>/ 5</small></span>
                  {inMeeting && <span className="selected-meeting"><Check size={12} /> للاجتماع</span>}
                </button>
              );
            })}
          </div>

          <div className={`topic-workbench ${selectedTopic.lane}`}>
            <div className="topic-workbench-title">
              <span className="topic-large-code">{selectedTopic.code}</span>
              <div>
                <p className="eyebrow">موضوع نشط / {selectedTopic.fit}</p>
                <h4>{selectedTopic.title}</h4>
              </div>
              <div className="topic-score-readout"><strong>{selectedTopic.score}</strong><span>التقييم<br />المرجح / 5</span></div>
            </div>
            <div className="topic-route-legend"><i className="route-base-dot" /> قاعدة إشراف <span /> <i className="route-evidence-dot" /> دليل قابل للقياس <span /> <i className="route-decision-dot" /> امتداد/قرار</div>

            <div className="topic-workbench-grid">
              <div className="topic-pitch">
                <p className="eyebrow">فكرة البحث</p>
                <p>{selectedTopic.pitch}</p>
                <div className="topic-minimum"><FlaskConical size={16} /><span><b>أصغر نطاق صالح:</b> {selectedTopic.minimumScope}</span></div>
                <div className="topic-market"><Layers3 size={15} /><span><b>ما يمكن تسويقه:</b> {selectedTopic.market}</span></div>
              </div>
              <div className="topic-meeting-panel">
                <div className="topic-risk"><CircleHelp size={16} /><div><b>خطر يجب أن تذكره لنفسك</b><p>{selectedTopic.risk}</p></div></div>
                <div className="topic-question"><span>السؤال الذي تقوله للدكتور</span><blockquote>«{selectedTopic.ask}»</blockquote></div>
                <button type="button" className={`meeting-toggle ${meetingTopics[selectedTopic.id] ? "is-saved" : ""}`} onClick={() => toggleMeetingTopic(selectedTopic.id)}>
                  {meetingTopics[selectedTopic.id] ? <><Check size={15} /> أضيف إلى نقاط الاجتماع</> : <><Target size={15} /> أضف إلى نقاط الاجتماع</>}
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="atlas-footer">
          <span>أطلس المسارات — شجرة قرار قابلة للقياس</span>
          <span>القاعدة المشتركة أقوى من الرهان على فرع واحد.</span>
        </footer>
      </main>
    </div>
  );
}
