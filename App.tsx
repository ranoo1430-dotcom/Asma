import React, { useState, useMemo, useEffect } from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  Target,
  ClipboardCheck,
  FileSpreadsheet,
  Search,
  Plus,
  Bell,
  Moon,
  Sun,
  CheckCircle2,
  AlertTriangle,
  Clock,
  TrendingUp,
  Award,
  FileText,
  Upload,
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
  X,
  BarChart3,
  PieChart as PieChartIcon,
  ShieldAlert,
  Sparkles,
  BookOpen,
  Eye,
  Edit3,
  Menu,
  ArrowUpRight,
  Layers,
  FileCheck2,
  Image as ImageIcon,
  Trash2,
  FolderOpen,
  Save,
  QrCode,
  FileDown
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar
} from 'recharts';

const SCHOOL_PROFILE = {
  educationDept: 'الإدارة العامة للتعليم بالطائف - مكتب تعليم الطائف',
  schoolName: 'ابتدائية ومتوسطة التحفيظ الثانية بالطائف',
  principalName: 'أ. رانية العصيمي',
  principalRole: 'مديرة المدرسة'
};

const INITIAL_PROGRAMS = [
  {
    id: 1,
    code: 'PRG-01',
    name: 'نحو الإتقان',
    domain: 'نواتج التعلم ورعاية المتعلمين',
    subDomain: 'نواتج التعلم',
    type: 'تعليمي',
    owner: 'معلمات المواد المستهدفة',
    supervisor: 'وكيلة الشؤون التعليمية',
    quarter: 'Q1',
    status: 'مكتمل',
    progress: 96,
    targetScore: 100,
    strategicGoal: 'تحسين جودة التعليم والتعلم ورفع مستوى إتقان الطالبات للمهارات الأساسية بما يسهم في تحسين نواتج التعلم.',
    detailedGoal: 'رفع مستوى إتقان الطالبات للمهارات الأساسية المستهدفة وفق نتائج القياس التشخيصي وتحليل نتائج الاختبارات المعيارية (نافس).',
    kpiName: 'نسبة الطالبات المتقنات للمهارات المستهدفة في القياس البعدي',
    baseline: 68,
    postScore: 84,
    targetImprovement: 10,
    beneficiariesCount: 420,
    beneficiariesTargetPct: 90,
    budgetSource: 'ذاتي / الإدارة',
    budgetAmount: 2500,
    location: 'الفصول الدراسية',
    procedures: [
      'تشخيص مستوى الطالبات وتحديد فجوات التعلم عبر نتائج نافس',
      'تصنيف الطالبات وفق مستويات الإتقان وتصميم خطط علاجية وإثرائية',
      'متابعة تقدم الطالبات بقياسات دورية وتنفيذ القياس البعدي'
    ],
    satisfaction: { students: 92, teachers: 95, parents: 89 },
    evaluation: { effectiveness: 95, efficiency: 92, sustainability: 90, impact: 96, evaluator: 'مشرفة الجودة والقياس' },
    evidences: [
      { id: 'ev-1', name: 'تقرير تحليل نتائج نافس والقياس التشخيصي.pdf', type: 'PDF', date: '1448/04/12' },
      { id: 'ev-2', name: 'شواهد الخطط العلاجية ولوحة التعزيز.jpg', type: 'صورة', date: '1448/05/03' }
    ],
    correctiveActions: []
  },
  {
    id: 2,
    code: 'PRG-02',
    name: 'اقرأ أفكر أستنتج',
    domain: 'نواتج التعلم ورعاية المتعلمين',
    subDomain: 'نواتج التعلم',
    type: 'تعليمي',
    owner: 'معلمات اللغة العربية',
    supervisor: 'وكيلة الشؤون التعليمية',
    quarter: 'Q1',
    status: 'منتظم',
    progress: 85,
    targetScore: 90,
    strategicGoal: 'تنمية مهارات القراءة والفهم القرائي لدى الطالبات، ورفع قدرتهن على فهم النصوص وتحليلها واستنتاج المعلومات منها.',
    detailedGoal: 'رفع نسبة الطالبات المتقنات لمهارات الفهم القرائي المستهدفة بمقدار 10% عن خط الأساس بنهاية العام الدراسي.',
    kpiName: 'نسبة الطالبات المتقنات لمهارات القراءة والفهم القرائي في القياس البعدي',
    baseline: 64,
    postScore: 76,
    targetImprovement: 10,
    beneficiariesCount: 420,
    beneficiariesTargetPct: 90,
    budgetSource: 'ذاتي / الإدارة',
    budgetAmount: 1800,
    location: 'الفصول الدراسية ومصادر التعلم',
    procedures: [
      'قياس قبلي لمهارات القراءة والفهم القرائي وتحليل الفجوات',
      'تطبيق استراتيجيات القراءة العميقة وأنشطة علاجية وإثرائية',
      'تنفيذ القياس البعدي ومقارنة النتائج وتحليل الأثر'
    ],
    satisfaction: { students: 88, teachers: 91, parents: 86 },
    evaluation: { effectiveness: 88, efficiency: 86, sustainability: 84, impact: 87, evaluator: 'وكيلة الشؤون التعليمية' },
    evidences: [
      { id: 'ev-3', name: 'سجل رصد مهارات الفهم القرائي.pdf', type: 'PDF', date: '1448/04/25' }
    ],
    correctiveActions: []
  },
  {
    id: 3,
    code: 'PRG-03',
    name: 'التفكير الرياضي وحل المشكلات',
    domain: 'نواتج التعلم ورعاية المتعلمين',
    subDomain: 'نواتج التعلم',
    type: 'تعليمي',
    owner: 'معلمات الرياضيات',
    supervisor: 'وكيلة الشؤون التعليمية',
    quarter: 'Q2',
    status: 'متعثر',
    progress: 58,
    targetScore: 85,
    strategicGoal: 'تحسين جودة التعليم والتعلم ورفع مستوى نواتج التعلم في الرياضيات.',
    detailedGoal: 'تنمية مهارات التفكير الرياضي وحل المشكلات لدى الطالبات بنسبة 10% عن خط الأساس.',
    kpiName: 'نسبة الطالبات المتقنات لمهارات التفكير الرياضي وحل المشكلات',
    baseline: 60,
    postScore: 65,
    targetImprovement: 10,
    beneficiariesCount: 410,
    beneficiariesTargetPct: 90,
    budgetSource: 'ذاتي / الإدارة',
    budgetAmount: 2000,
    location: 'الفصول الدراسية',
    procedures: [
      'قياس قبلي للمهارات المستهدفة وتحديد الأولويات',
      'تطبيق استراتيجيات التفكير الرياضي وحل المشكلات والمواقف التطبيقية',
      'متابعة تقدم الطالبات بقياسات دورية ومقارنتها بالقبلي'
    ],
    satisfaction: { students: 76, teachers: 82, parents: 79 },
    evaluation: { effectiveness: 64, efficiency: 68, sustainability: 62, impact: 60, evaluator: 'مشرفة الرياضيات' },
    evidences: [
      { id: 'ev-4', name: 'أوراق عمل حل المشكلات الرياضية.pdf', type: 'PDF', date: '1448/05/10' }
    ],
    correctiveActions: [
      {
        id: 'ca-101',
        title: 'تكثيف حصص المعالجة الأسبوعية لمهارات الاستدلال الرياضي للصفوف العليا',
        owner: 'منسقة قسم الرياضيات',
        dueDate: '2026-12-05',
        status: 'قيد التنفيذ'
      }
    ]
  },
  {
    id: 4,
    code: 'PRG-04',
    name: 'قيمنا وهويتنا (بصمة ارتقاء)',
    domain: 'رعاية المتعلمين',
    subDomain: 'القيم والهوية والمناسبات',
    type: 'سلوكي / قيمي',
    owner: 'الموجهة الطلابية ورائدة النشاط',
    supervisor: 'وكيلة شؤون الطالبات',
    quarter: 'Q1',
    status: 'مكتمل',
    progress: 98,
    targetScore: 100,
    strategicGoal: 'تعزيز القيم والأخلاق والهوية الوطنية لدى جميع الطالبات.',
    detailedGoal: 'خفض نسبة المخالفات السلوكية المسجلة وتعزيز الممارسات الإيجابية ومشاركة 100% في فعاليات الهوية الوطنية.',
    kpiName: 'نسبة الانخفاض في المخالفات السلوكية ونسبة المشاركة في برامج الهوية الوطنية',
    baseline: 72,
    postScore: 94,
    targetImprovement: 20,
    beneficiariesCount: 430,
    beneficiariesTargetPct: 100,
    budgetSource: 'ذاتي',
    budgetAmount: 3000,
    location: 'الفصول الدراسية ومرافق المدرسة',
    procedures: [
      'تفعيل مبادرة بصمة ارتقاء الأسبوعية وتكريم بطاقات نجم الأخلاق',
      'تخصيص 5 دقائق من حصص النشاط لورش التسامح والوعي الفكري',
      'تفعيل المناسبات الوطنية ومواسم الطاعات ورصد السلوك في نظام نور'
    ],
    satisfaction: { students: 96, teachers: 94, parents: 95 },
    evaluation: { effectiveness: 96, efficiency: 94, sustainability: 92, impact: 95, evaluator: 'وكيلة شؤون الطالبات' },
    evidences: [
      { id: 'ev-5', name: 'تقرير رصد التميز السلوكي في نظام نور.pdf', type: 'PDF', date: '1448/04/28' }
    ],
    correctiveActions: []
  },
  {
    id: 5,
    code: 'PRG-05',
    name: 'سفراء الرؤية (العمل التطوعي)',
    domain: 'رعاية المتعلمين',
    subDomain: 'القيم والهوية والمناسبات',
    type: 'وطني / اجتماعي',
    owner: 'رائدة النشاط ومنسقة الأمن والسلامة',
    supervisor: 'وكيلة شؤون الطالبات',
    quarter: 'Q2',
    status: 'منتظم',
    progress: 82,
    targetScore: 85,
    strategicGoal: 'تعزيز المواطنة الفاعلة والعمل التطوعي والمحافظة على الممتلكات العامة لدى الطالبات.',
    detailedGoal: 'إشراك 80% من الطالبات في مبادرة تطوعية واحدة على الأقل وتنفيذ 4 مبادرات تطوعية وخفض حالات العبث بنسبة 10%.',
    kpiName: 'نسبة الطالبات المشاركات في الأعمال التطوعية ونسبة انخفاض إتلاف الممتلكات',
    baseline: 55,
    postScore: 78,
    targetImprovement: 20,
    beneficiariesCount: 360,
    beneficiariesTargetPct: 80,
    budgetSource: 'ذاتي',
    budgetAmount: 1500,
    location: 'كافة مرافق المدرسة',
    procedures: [
      'تشكيل فرق عمل طلابية (أصدقاء البيئة، حماة المدرسة)',
      'إطلاق مسابقة فصلي أجمل لتعزيز المسؤولية المجتمعية',
      'تنفيذ مبادرات تطوعية في مصادر التعلم وحديقة المدرسة'
    ],
    satisfaction: { students: 91, teachers: 89, parents: 90 },
    evaluation: { effectiveness: 85, efficiency: 88, sustainability: 82, impact: 86, evaluator: 'رائدة النشاط' },
    evidences: [
      { id: 'ev-6', name: 'سجل الساعات التطوعية للطالبات.pdf', type: 'PDF', date: '1448/05/14' }
    ],
    correctiveActions: []
  },
  {
    id: 6,
    code: 'PRG-06',
    name: 'صناع المستقبل (رعاية الموهوبات)',
    domain: 'رعاية المتعلمين',
    subDomain: 'الفئات الخاصة والموهوبات',
    type: 'إثرائي / تعليمي',
    owner: 'منسقة الموهوبين والهيئة التعليمية',
    supervisor: 'إدارة المدرسة',
    quarter: 'Q2',
    status: 'منتظم',
    progress: 88,
    targetScore: 90,
    strategicGoal: 'توفير بيئة تعليمية حاضنة ومحفزة للطلبة الموهوبين لتنمية قدراتهم العقلية والابتكارية.',
    detailedGoal: 'إشراك 90% من الطالبات الموهوبات في برامج إثرائية وزيادة المجتازات لمقياس موهبة ومسابقات إبداع ونسمو بنسبة 10%.',
    kpiName: 'نسبة الطالبات الموهوبات المشاركات في البرامج الإثرائية والمجتازات لمقياس موهبة',
    baseline: 70,
    postScore: 84,
    targetImprovement: 10,
    beneficiariesCount: 65,
    beneficiariesTargetPct: 90,
    budgetSource: 'الإدارة',
    budgetAmount: 4500,
    location: 'مصادر التعلم ومختبر العلوم',
    procedures: [
      'حصر الطلبة المتميزين وتوزيع استمارات الترشيح المبدئي',
      'تدريب الطالبات المرشحات على نماذج مقياس موهبة',
      'تنفيذ المسابقات العلمية وتأهيل المشاريع لأولمبياد إبداع'
    ],
    satisfaction: { students: 95, teachers: 93, parents: 96 },
    evaluation: { effectiveness: 91, efficiency: 89, sustainability: 88, impact: 93, evaluator: 'منسقة الموهوبات' },
    evidences: [
      { id: 'ev-7', name: 'قائمة المرشحات لمقياس موهبة وإبداع.pdf', type: 'PDF', date: '1448/05/18' }
    ],
    correctiveActions: []
  },
  {
    id: 7,
    code: 'PRG-07',
    name: 'بيئة دامجة',
    domain: 'رعاية المتعلمين',
    subDomain: 'ذوات الإعاقة وصعوبات التعلم',
    type: 'رعاية / دعم',
    owner: 'الموجهة الطلابية ومعلمات التربية الخاصة',
    supervisor: 'وكيلة الشؤون التعليمية',
    quarter: 'Q1',
    status: 'مكتمل',
    progress: 100,
    targetScore: 100,
    strategicGoal: 'توفير بيئة مدرسية آمنة وداعمة تراعي احتياجات الطالبات ذوات الاحتياجات الخاصة وتعزز دمجهن.',
    detailedGoal: 'توفير خدمات الدعم والتهيئة المناسبة للطالبات ذوات الاحتياجات الخاصة بنسبة 100% خلال العام الدراسي.',
    kpiName: 'نسبة الطالبات ذوات الاحتياجات الخاصة المستفيدات من خدمات الدعم والتهيئة',
    baseline: 80,
    postScore: 100,
    targetImprovement: 20,
    beneficiariesCount: 28,
    beneficiariesTargetPct: 100,
    budgetSource: 'الوزارة',
    budgetAmount: 6000,
    location: 'الفصول وغرف المصادر ومرافق المدرسة',
    procedures: [
      'حصر الحالات واحتياجاتها والتنسيق المستمر مع الأسرة',
      'تهيئة البيئة المدرسية والصفية وتوفير التجهيزات المساندة',
      'متابعة الاندماج ببطاقة ملاحظة قبل وبعد التدخل'
    ],
    satisfaction: { students: 94, teachers: 96, parents: 98 },
    evaluation: { effectiveness: 97, efficiency: 95, sustainability: 94, impact: 98, evaluator: 'مشرفة التربية الخاصة' },
    evidences: [
      { id: 'ev-8', name: 'ملفات الخطط التربوية الفردية الموثقة.pdf', type: 'PDF', date: '1448/04/19' }
    ],
    correctiveActions: []
  },
  {
    id: 8,
    code: 'PRG-08',
    name: 'حضوري تميزي',
    domain: 'رعاية المتعلمين',
    subDomain: 'الانضباط السلوكي',
    type: 'انضباطي / سلوكي',
    owner: 'الموجهة الطلابية والمساعدة الإدارية',
    supervisor: 'وكيلة شؤون الطالبات',
    quarter: 'Q1',
    status: 'منتظم',
    progress: 91,
    targetScore: 95,
    strategicGoal: 'تعزيز الانضباط المدرسي، والحد من ظاهرتي الغياب والتأخر الصباحي لتحسين نواتج التعلم.',
    detailedGoal: 'رفع نسبة الحضور والانتظام في الأيام المستهدفة قبل وبعد الإجازات المطولة إلى 95% وخفض التأخر لأقل من 5%.',
    kpiName: 'نسبة الحضور والانتظام اليومي في نظام نور',
    baseline: 86,
    postScore: 94.5,
    targetImprovement: 8.5,
    beneficiariesCount: 430,
    beneficiariesTargetPct: 95,
    budgetSource: 'ذاتي',
    budgetAmount: 1200,
    location: 'البيئة المدرسية',
    procedures: [
      'الرصد اليومي للغياب والتأخر في نظام نور وإرسال رسائل فورية للأسرة',
      'تكريم دوري للفصل الأكثر انضباطاً والطالبة المواظبة',
      'دراسة حالات الغياب المتكرر وعقد جلسات إرشادية مع ولي الأمر'
    ],
    satisfaction: { students: 87, teachers: 94, parents: 92 },
    evaluation: { effectiveness: 92, efficiency: 93, sustainability: 90, impact: 91, evaluator: 'وكيلة شؤون الطالبات' },
    evidences: [
      { id: 'ev-9', name: 'إحصائية الانضباط المدرسي من نظام نور.pdf', type: 'PDF', date: '1448/05/01' }
    ],
    correctiveActions: []
  },
  {
    id: 9,
    code: 'PRG-09',
    name: 'صحتي في غذائي',
    domain: 'رعاية المتعلمين',
    subDomain: 'النمو الصحي والجسدي',
    type: 'صحي / وقائي',
    owner: 'الموجهة الصحية ورائدة النشاط',
    supervisor: 'إدارة المدرسة',
    quarter: 'Q2',
    status: 'منتظم',
    progress: 79,
    targetScore: 90,
    strategicGoal: 'تعزيز الوعي الصحي والغذائي لدى الطالبات، ودعم تبني العادات الغذائية الصحية في البيئة المدرسية.',
    detailedGoal: 'إشراك 90% من الطالبات في أنشطة التوعية الصحية ورفع مستوى الممارسات الغذائية الصحية بنسبة 10%.',
    kpiName: 'نسبة التحسن في الوعي والممارسات الغذائية الصحية',
    baseline: 65,
    postScore: 77,
    targetImprovement: 10,
    beneficiariesCount: 390,
    beneficiariesTargetPct: 90,
    budgetSource: 'ذاتي',
    budgetAmount: 1600,
    location: 'الفصول وفناء المدرسة والمقصف',
    procedures: [
      'تنفيذ قياس قبلي للوعي الغذائي وتحليل الاحتياجات',
      'تفعيل الإذاعة المدرسية والدقائق التوعوية ومراقبة المقصف المدرسي',
      'تنفيذ القياس البعدي ومقارنة النتائج وتحليل الأثر'
    ],
    satisfaction: { students: 89, teachers: 90, parents: 91 },
    evaluation: { effectiveness: 83, efficiency: 85, sustainability: 80, impact: 84, evaluator: 'الموجهة الصحية' },
    evidences: [
      { id: 'ev-10', name: 'استبانة قياس الوعي الغذائي القبلي والبعدي.pdf', type: 'PDF', date: '1448/05/12' }
    ],
    correctiveActions: []
  },
  {
    id: 10,
    code: 'PRG-10',
    name: 'أبطال اللياقة',
    domain: 'رعاية المتعلمين',
    subDomain: 'النمو الصحي والجسدي',
    type: 'رياضي / بدني',
    owner: 'معلمات التربية البدنية',
    supervisor: 'وكيلة المدرسة',
    quarter: 'Q3',
    status: 'منتظم',
    progress: 75,
    targetScore: 85,
    strategicGoal: 'رفع مستوى اللياقة البدنية، واكتشاف المواهب الرياضية، وتعزيز الروح الرياضية بين الطلبة.',
    detailedGoal: 'إشراك 85% من الطالبات في أنشطة بدنية وبطولات رياضية داخلية خلال العام الدراسي.',
    kpiName: 'نسبة الطالبات المشاركات في الأنشطة والبرامج الرياضية الموجهة',
    baseline: 62,
    postScore: 79,
    targetImprovement: 17,
    beneficiariesCount: 370,
    beneficiariesTargetPct: 85,
    budgetSource: 'الإدارة',
    budgetAmount: 3200,
    location: 'الملاعب والساحات المدرسية',
    procedures: [
      'إعداد خطة الأنشطة والبطولات الرياضية الداخلية',
      'استقطاب الطالبات واكتشاف المواهب الرياضية ودعمها',
      'حصر المشاركات ومقارنة النسبة بخط الأساس'
    ],
    satisfaction: { students: 95, teachers: 88, parents: 87 },
    evaluation: { effectiveness: 84, efficiency: 82, sustainability: 85, impact: 86, evaluator: 'وكيلة المدرسة' },
    evidences: [
      { id: 'ev-11', name: 'توثيق دوري اللياقة البدنية.jpg', type: 'صورة', date: '1448/05/20' }
    ],
    correctiveActions: []
  },
  {
    id: 11,
    code: 'PRG-11',
    name: 'التمكين النفسي',
    domain: 'رعاية المتعلمين',
    subDomain: 'النمو النفسي والاجتماعي',
    type: 'إرشادي / نفسي',
    owner: 'الموجهة الطلابية',
    supervisor: 'إدارة المدرسة',
    quarter: 'Q2',
    status: 'منتظم',
    progress: 86,
    targetScore: 90,
    strategicGoal: 'تعزيز الصحة النفسية والتكيف المدرسي لدى الطالبات.',
    detailedGoal: 'رفع مستوى التكيف المدرسي والرفاه النفسي لدى الطالبات المستهدفات بنسبة 15% عن خط الأساس.',
    kpiName: 'نسبة التحسن في مستوى التكيف المدرسي والرفاه النفسي',
    baseline: 66,
    postScore: 83,
    targetImprovement: 15,
    beneficiariesCount: 115,
    beneficiariesTargetPct: 100,
    budgetSource: 'ذاتي',
    budgetAmount: 1400,
    location: 'غرفة التوجيه الطلابي',
    procedures: [
      'حصر الاحتياج وتطبيق مقياس التكيف المدرسي القبلي',
      'تنفيذ برامج وجلسات الدعم والتمكين النفسي الفردية والجماعية',
      'المتابعة الدورية وتنفيذ القياس البعدي'
    ],
    satisfaction: { students: 93, teachers: 91, parents: 94 },
    evaluation: { effectiveness: 89, efficiency: 90, sustainability: 87, impact: 92, evaluator: 'مشرفة التوجيه الطلابي' },
    evidences: [
      { id: 'ev-12', name: 'تحليل نتائج مقياس التكيف المدرسي.pdf', type: 'PDF', date: '1448/05/15' }
    ],
    correctiveActions: []
  },
  {
    id: 12,
    code: 'PRG-12',
    name: 'صوت الطالبة (المجلس الطلابي)',
    domain: 'رعاية المتعلمين',
    subDomain: 'حقوق المتعلمين والمشاركة',
    type: 'قيادي / حقوقي',
    owner: 'رائدة النشاط والموجهة الطلابية',
    supervisor: 'إدارة المدرسة',
    quarter: 'Q2',
    status: 'منتظم',
    progress: 80,
    targetScore: 100,
    strategicGoal: 'ضمان حقوق المتعلمين في التعبير عن آرائهم، والمشاركة الفاعلة في صنع القرارات المدرسية.',
    detailedGoal: 'تشكيل المجلس الطلابي بتمثيل ديمقراطي وعقد 4 اجتماعات دورية وتنفيذ مبادرتين من اقتراح المجلس.',
    kpiName: 'عدد محاضر اجتماعات المجلس الطلابي وعدد المبادرات الطلابية المنفذة',
    baseline: 50,
    postScore: 85,
    targetImprovement: 35,
    beneficiariesCount: 430,
    beneficiariesTargetPct: 100,
    budgetSource: 'ذاتي',
    budgetAmount: 1000,
    location: 'مصادر التعلم / غرفة الإدارة',
    procedures: [
      'انتخاب أعضاء المجلس الطلابي وعقد الاجتماعات الدورية الأربعة',
      'حصر مقترحات الطالبات واختيار مبادرتين لتحسين البيئة المدرسية',
      'تنفيذ المبادرات وتوثيق أثرها في سجل المجلس'
    ],
    satisfaction: { students: 94, teachers: 89, parents: 88 },
    evaluation: { effectiveness: 86, efficiency: 88, sustainability: 84, impact: 85, evaluator: 'مديرة المدرسة' },
    evidences: [
      { id: 'ev-13', name: 'محاضر اجتماعات المجلس الطلابي.pdf', type: 'PDF', date: '1448/05/19' }
    ],
    correctiveActions: []
  },
  {
    id: 13,
    code: 'PRG-13',
    name: 'وعيي وحمايتي',
    domain: 'رعاية المتعلمين',
    subDomain: 'حقوق المتعلمين والمشاركة',
    type: 'توعوي / حقوقي',
    owner: 'الموجهة الطلابية',
    supervisor: 'إدارة المدرسة',
    quarter: 'Q1',
    status: 'مكتمل',
    progress: 97,
    targetScore: 100,
    strategicGoal: 'تبصير الطالبات بحقوقهن التعليمية والجسدية، وآليات الحماية، ونشر ثقافة خط مساندة الطفل.',
    detailedGoal: 'تنفيذ ورش عمل توعوية لـ 100% من الطالبات حول حقوقهن وآليات الإبلاغ عن أي تنمر أو انتهاك.',
    kpiName: 'نسبة الطالبات الملمات بحقوقهن وآليات الحماية والإبلاغ',
    baseline: 74,
    postScore: 98,
    targetImprovement: 24,
    beneficiariesCount: 430,
    beneficiariesTargetPct: 100,
    budgetSource: 'ذاتي',
    budgetAmount: 900,
    location: 'ممرات المدرسة والفصول',
    procedures: [
      'نشر لوحات واضحة تتضمن الرقم المجاني لخط مساندة الطفل (116111)',
      'تفعيل صندوق تواصل معنا لاستقبال الشكاوى بسرية تامة',
      'قياس الوعي القبلي والبعدي وتنفيذ ورش الحماية'
    ],
    satisfaction: { students: 95, teachers: 94, parents: 97 },
    evaluation: { effectiveness: 95, efficiency: 96, sustainability: 93, impact: 96, evaluator: 'مديرة المدرسة' },
    evidences: [
      { id: 'ev-14', name: 'نتائج استطلاع الوعي بحقوق الحماية.pdf', type: 'PDF', date: '1448/04/10' }
    ],
    correctiveActions: []
  },
  {
    id: 14,
    code: 'PRG-14',
    name: 'ممارسات تصنع الأثر',
    domain: 'التعليم والتعلم',
    subDomain: 'الممارسات التدريسية',
    type: 'تعليمي / مهني',
    owner: 'الهيئة التعليمية',
    supervisor: 'وكيلة الشؤون التعليمية',
    quarter: 'Q2',
    status: 'منتظم',
    progress: 84,
    targetScore: 85,
    strategicGoal: 'تحسين جودة الممارسات التدريسية والانتقال من التعليم التقليدي إلى التعلم المتمحور حول الطالبات.',
    detailedGoal: 'الوصول إلى 85% فأعلى من الحصص المستهدفة التي توظف استراتيجيات التدريس الحديثة والتقويم التكويني.',
    kpiName: 'نسبة الحصص الموظفة لاستراتيجيات التدريس الحديثة وفق الزيارات الصفية',
    baseline: 68,
    postScore: 82,
    targetImprovement: 14,
    beneficiariesCount: 42,
    beneficiariesTargetPct: 85,
    budgetSource: 'ذاتي',
    budgetAmount: 1500,
    location: 'الفصول الدراسية ومصادر التعلم',
    procedures: [
      'رصد الممارسات الحالية وتدريب المعلمات على التقويم التكويني',
      'تنفيذ زيارات صفية وتقديم تغذية راجعة بناءة',
      'مقارنة نتائج المتابعة الصفية الأولية والنهائية'
    ],
    satisfaction: { students: 90, teachers: 89, parents: 87 },
    evaluation: { effectiveness: 87, efficiency: 86, sustainability: 85, impact: 88, evaluator: 'وكيلة الشؤون التعليمية' },
    evidences: [
      { id: 'ev-15', name: 'ملخص استمارات الزيارات الصفية.pdf', type: 'PDF', date: '1448/05/21' }
    ],
    correctiveActions: []
  },
  {
    id: 15,
    code: 'PRG-15',
    name: 'التمكين الرقمي',
    domain: 'التعليم والتعلم',
    subDomain: 'تفعيل التقنية',
    type: 'تعليمي / تقني',
    owner: 'الهيئة التعليمية ولجنة التعلم الإلكتروني',
    supervisor: 'إدارة المدرسة',
    quarter: 'Q3',
    status: 'متعثر',
    progress: 62,
    targetScore: 95,
    strategicGoal: 'تعزيز توظيف التقنية في العملية التعليمية بما يسهم في تحسين جودة التعليم والتعلم.',
    detailedGoal: 'تفعيل منصة مدرستي بنسبة 95% وتوظيف المعامل الافتراضية والوسائط المتعددة في 80% من دروس المواد العلمية.',
    kpiName: 'نسبة تفعيل المنصات المعتمدة ونسبة الدروس الموظفة للمعامل الافتراضية',
    baseline: 60,
    postScore: 68,
    targetImprovement: 20,
    beneficiariesCount: 430,
    beneficiariesTargetPct: 95,
    budgetSource: 'الوزارة / الإدارة',
    budgetAmount: 5500,
    location: 'الفصول الدراسية ومختبر الحاسب',
    procedures: [
      'إسناد الواجبات والاختبارات القصيرة إلكترونياً عبر منصة مدرستي',
      'استخدام شاشات العرض الذكية وتفعيل مختبر الحاسب للمعامل الافتراضية',
      'مقارنة مؤشرات التفعيل الرقمي بالعام السابق'
    ],
    satisfaction: { students: 84, teachers: 74, parents: 81 },
    evaluation: { effectiveness: 66, efficiency: 63, sustainability: 65, impact: 64, evaluator: 'مشرفة تقنية المعلومات' },
    evidences: [
      { id: 'ev-16', name: 'تقرير إحصائيات منصة مدرستي.pdf', type: 'PDF', date: '1448/05/22' }
    ],
    correctiveActions: [
      {
        id: 'ca-102',
        title: 'صيانة أجهزة مختبر الحاسب وتدريب معلمات العلوم على المعامل الافتراضية (PhET)',
        owner: 'منسقة التعلم الإلكتروني',
        dueDate: '2026-12-10',
        status: 'قيد التنفيذ'
      }
    ]
  },
  {
    id: 16,
    code: 'PRG-16',
    name: 'نماء (مجتمعات التعلم المهنية)',
    domain: 'التطوير المهني',
    subDomain: 'الكادر التعليمي والإداري',
    type: 'مهني / تطويري',
    owner: 'الهيئة التعليمية',
    supervisor: 'وكيلة المدرسة',
    quarter: 'Q2',
    status: 'منتظم',
    progress: 87,
    targetScore: 100,
    strategicGoal: 'بناء ثقافة التعلم المستمر والتعاون المهني بين منسوبي المدرسة لسد الفجوات في الأداء التدريسي.',
    detailedGoal: 'تشكيل وتفعيل 3 مجتمعات تعلم مهنية تخصصية وتنفيذ زيارتين تبادليتين على الأقل لكل معلمة.',
    kpiName: 'عدد محاضر اجتماعات مجتمعات التعلم وعدد استمارات تبادل الزيارات',
    baseline: 65,
    postScore: 88,
    targetImprovement: 23,
    beneficiariesCount: 42,
    beneficiariesTargetPct: 100,
    budgetSource: 'ذاتي',
    budgetAmount: 800,
    location: 'مصادر التعلم والفصول الدراسية',
    procedures: [
      'تحديد الاحتياجات المهنية وتشكيل 3 مجتمعات تعلم تخصصية',
      'عقد الاجتماعات الشهرية وتبادل الزيارات الصفية وتوثيق الخبرات'
    ],
    satisfaction: { students: 88, teachers: 93, parents: 85 },
    evaluation: { effectiveness: 90, efficiency: 92, sustainability: 89, impact: 88, evaluator: 'وكيلة المدرسة' },
    evidences: [
      { id: 'ev-17', name: 'محاضر مجتمعات التعلم المهنية.pdf', type: 'PDF', date: '1448/05/11' }
    ],
    correctiveActions: []
  },
  {
    id: 17,
    code: 'PRG-17',
    name: 'كفاءات (التطوير المهني والرخص)',
    domain: 'التطوير المهني',
    subDomain: 'الكادر التعليمي والإداري',
    type: 'مهني / تدريبي',
    owner: 'إدارة المدرسة',
    supervisor: 'إدارة المدرسة',
    quarter: 'Q3',
    status: 'منتظم',
    progress: 78,
    targetScore: 85,
    strategicGoal: 'تمكين الكادر التعليمي من تلبية متطلبات التطوير المستمر والرخص المهنية ومواكبة المستجدات التربوية.',
    detailedGoal: 'رفع نسبة المعلمات المستوفيات لمتطلبات الانتقال إلى الرتب التعليمية الأعلى بنسبة 10% عن خط الأساس.',
    kpiName: 'نسبة المعلمات المستوفيات لمتطلبات الرتبة الأعلى والمشاركات في التدريب المعتمد',
    baseline: 58,
    postScore: 70,
    targetImprovement: 10,
    beneficiariesCount: 48,
    beneficiariesTargetPct: 90,
    budgetSource: 'الإدارة',
    budgetAmount: 2200,
    location: 'قاعة الاجتماعات / التدريب الخارجي',
    procedures: [
      'حصر الاحتياجات المهنية والتوعية بمتطلبات الرخص والرتب التعليمية',
      'توفير برامج التطوير المهني وقياس أثر التدريب على الأداء'
    ],
    satisfaction: { students: 85, teachers: 91, parents: 84 },
    evaluation: { effectiveness: 84, efficiency: 86, sustainability: 85, impact: 83, evaluator: 'مديرة المدرسة' },
    evidences: [
      { id: 'ev-18', name: 'سجل النمو المهني والرخص التعليمية.pdf', type: 'PDF', date: '1448/05/17' }
    ],
    correctiveActions: []
  },
  {
    id: 18,
    code: 'PRG-18',
    name: 'تواصل (مجالس الأمهات والشراكة)',
    domain: 'الشراكة مع الأسرة',
    subDomain: 'التواصل والتثقيف',
    type: 'مجتمعي / تواصلي',
    owner: 'الموجهة الطلابية والإدارة',
    supervisor: 'إدارة المدرسة',
    quarter: 'Q2',
    status: 'منتظم',
    progress: 83,
    targetScore: 90,
    strategicGoal: 'تعزيز الشراكة الفاعلة مع الأسرة وشركاء النجاح بما يسهم في دعم تعلم الطالبات وتحسين البيئة التعليمية.',
    detailedGoal: 'رفع حضور أولياء الأمور إلى 50% كحد أدنى ورفع رضاهم عن فاعلية التواصل والاستجابة بنسبة 20%.',
    kpiName: 'نسبة مشاركة أولياء الأمور ونسبة رضاهم عن فاعلية التواصل',
    baseline: 42,
    postScore: 66,
    targetImprovement: 20,
    beneficiariesCount: 380,
    beneficiariesTargetPct: 50,
    budgetSource: 'ذاتي',
    budgetAmount: 1900,
    location: 'مسرح المدرسة والفصول',
    procedures: [
      'تحديد احتياجات الأسرة وعقد مجالس الشراكة وتفعيل قنوات التواصل الرقمي',
      'قياس رضا الشركاء ومتابعة الملاحظات وتحليل التحسن'
    ],
    satisfaction: { students: 87, teachers: 89, parents: 92 },
    evaluation: { effectiveness: 86, efficiency: 85, sustainability: 84, impact: 88, evaluator: 'الموجهة الطلابية' },
    evidences: [
      { id: 'ev-19', name: 'تقرير مجلس الأمهات واستبانة الرضا.pdf', type: 'PDF', date: '1448/05/08' }
    ],
    correctiveActions: []
  },
  {
    id: 19,
    code: 'PRG-19',
    name: 'مبادرة ارتقاء (الشراكات المجتمعية)',
    domain: 'الشراكة المجتمعية',
    subDomain: 'المؤسسات والخبراء',
    type: 'مجتمعي / مؤسسي',
    owner: 'رائدة النشاط ومنسقة الشراكة المجتمعية',
    supervisor: 'إدارة المدرسة',
    quarter: 'Q3',
    status: 'متعثر',
    progress: 55,
    targetScore: 80,
    strategicGoal: 'بناء شراكات مجتمعية فاعلة مع المؤسسات والجهات المحلية لدعم تطوير الطالبات والمنسوبات.',
    detailedGoal: 'تفعيل شراكتين مجتمعيتين على الأقل ورفع نسبة المستفيدين من برامج الشراكة المجتمعية بنسبة 25%.',
    kpiName: 'عدد عقود الشراكات المجتمعية المفعلة ونسبة المستفيدين منها',
    baseline: 40,
    postScore: 52,
    targetImprovement: 25,
    beneficiariesCount: 210,
    beneficiariesTargetPct: 75,
    budgetSource: 'ذاتي / الجهات الشريكة',
    budgetAmount: 3500,
    location: 'المدرسة / مقر الجهة الشريكة',
    procedures: [
      'تحديد احتياجات الفئات المستهدفة والتواصل مع المؤسسات المحلية',
      'توقيع اتفاقيات الشراكة واستضافة الخبراء وتوثيق المستفيدين'
    ],
    satisfaction: { students: 82, teachers: 80, parents: 84 },
    evaluation: { effectiveness: 62, efficiency: 65, sustainability: 60, impact: 63, evaluator: 'مديرة المدرسة' },
    evidences: [
      { id: 'ev-20', name: 'مسودة اتفاقية شراكة مع المركز الصحي.pdf', type: 'PDF', date: '1448/05/14' }
    ],
    correctiveActions: [
      {
        id: 'ca-103',
        title: 'اعتماد وتوقيع مذكرة التفاهم الثانية مع جمعية التنمية الأسرية بالمحافظة',
        owner: 'منسقة الشراكة المجتمعية',
        dueDate: '2026-11-30',
        status: 'متأخر'
      }
    ]
  },
  {
    id: 20,
    code: 'PRG-20',
    name: 'مدرستي الخضراء (استدامة)',
    domain: 'البيئة التعليمية',
    subDomain: 'الاستدامة وترشيد الموارد',
    type: 'بيئي / توعوي',
    owner: 'رائدة النشاط والهيئة التعليمية',
    supervisor: 'إدارة المدرسة',
    quarter: 'Q2',
    status: 'منتظم',
    progress: 81,
    targetScore: 90,
    strategicGoal: 'المحافظة على البيئة والعناية بالموارد المدرسية، وغرس ثقافة الاستدامة لدى الطالبات.',
    detailedGoal: 'خفض استهلاك الموارد المدرسية بنسبة 20% ومشاركة 90% من الطالبات في مبادرات التشجير وإعادة التدوير.',
    kpiName: 'نسبة خفض استهلاك الموارد المدرسية ونسبة الطالبات المشاركات',
    baseline: 50,
    postScore: 72,
    targetImprovement: 20,
    beneficiariesCount: 395,
    beneficiariesTargetPct: 90,
    budgetSource: 'ذاتي',
    budgetAmount: 2100,
    location: 'مرافق المدرسة والفصول',
    procedures: [
      'توفير حاويات فرز ملونة وتنفيذ حملة ترشيد الكهرباء والمياه',
      'تخصيص مساحات لزراعة الشتلات بمشاركة الطالبات وإعادة التدوير'
    ],
    satisfaction: { students: 92, teachers: 89, parents: 90 },
    evaluation: { effectiveness: 85, efficiency: 88, sustainability: 91, impact: 84, evaluator: 'رائدة النشاط' },
    evidences: [
      { id: 'ev-21', name: 'صور مبادرة التشجير وحاويات الفرز.jpg', type: 'صورة', date: '1448/05/09' }
    ],
    correctiveActions: []
  },
  {
    id: 21,
    code: 'PRG-21',
    name: 'بيئتي الجاذبة',
    domain: 'البيئة التعليمية',
    subDomain: 'تحسين البيئة المادية',
    type: 'تطويري / بيئي',
    owner: 'رائدة النشاط',
    supervisor: 'وكيلة شؤون الطالبات',
    quarter: 'Q1',
    status: 'مكتمل',
    progress: 95,
    targetScore: 95,
    strategicGoal: 'العناية بالبيئة المدرسية وتطوير مرافقها لتكون جاذبة ومحفزة للتعلم.',
    detailedGoal: 'تحسين وتجهيز 100% من الفصول المستهدفة وإنشاء ركنين تفاعليين ورفع رضا الطلبة والمعلمات إلى 95%.',
    kpiName: 'نسبة الفصول المطورة وعدد الأركان التفاعلية ومستوى الرضا العام',
    baseline: 70,
    postScore: 95,
    targetImprovement: 25,
    beneficiariesCount: 472,
    beneficiariesTargetPct: 95,
    budgetSource: 'الإدارة / ذاتي',
    budgetAmount: 4800,
    location: 'الفصول والممرات والساحات',
    procedures: [
      'إطلاق مسابقة أجمل فصل وتجديد اللوحات الإرشادية بأسلوب بصري جاذب',
      'إنشاء ركنين تفاعليين وتقييم الأثر عبر استمارات الرضا'
    ],
    satisfaction: { students: 96, teachers: 95, parents: 93 },
    evaluation: { effectiveness: 95, efficiency: 93, sustainability: 91, impact: 95, evaluator: 'وكيلة شؤون الطالبات' },
    evidences: [
      { id: 'ev-22', name: 'توثيق الأركان التفاعلية والفصول المطورة.jpg', type: 'صورة', date: '1448/04/22' }
    ],
    correctiveActions: []
  },
  {
    id: 22,
    code: 'PRG-22',
    name: 'درع المدرسة (بيئة آمنة)',
    domain: 'البيئة التعليمية',
    subDomain: 'الأمن والسلامة',
    type: 'وقائي / أمني',
    owner: 'منسقة الأمن والسلامة',
    supervisor: 'إدارة المدرسة',
    quarter: 'Q1',
    status: 'مكتمل',
    progress: 94,
    targetScore: 100,
    strategicGoal: 'ضمان بيئة مدرسية آمنة للمتعلمين، وخالية من المخاطر الجسدية والصحية.',
    detailedGoal: 'فحص وصيانة مرافق الأمن والسلامة شهرياً وخفض متوسط زمن الاستجابة والإخلاء في حالات الطوارئ.',
    kpiName: 'متوسط زمن الاستجابة والإخلاء في تجارب الإخلاء الوهمية',
    baseline: 65,
    postScore: 92,
    targetImprovement: 27,
    beneficiariesCount: 478,
    beneficiariesTargetPct: 100,
    budgetSource: 'الوزارة',
    budgetAmount: 3800,
    location: 'كافة مرافق المدرسة',
    procedures: [
      'جولة تفقدية أسبوعية للتأكد من سلامة التمديدات وطفايات الحريق ومخارج الطوارئ',
      'تنفيذ عمليات إخلاء وهمية وقياس تحسن زمن الوصول لنقاط التجمع'
    ],
    satisfaction: { students: 91, teachers: 96, parents: 97 },
    evaluation: { effectiveness: 96, efficiency: 94, sustainability: 95, impact: 94, evaluator: 'مشرف الأمن والسلامة' },
    evidences: [
      { id: 'ev-23', name: 'محضر تجربة الإخلاء الوهمي وزمن الاستجابة.pdf', type: 'PDF', date: '1448/04/16' }
    ],
    correctiveActions: []
  },
  {
    id: 23,
    code: 'PRG-23',
    name: 'أندية الشغف',
    domain: 'النشاط المدرسي',
    subDomain: 'تفعيل النشاط اللاصفي',
    type: 'مهاري / لاصفي',
    owner: 'رائدة النشاط والهيئة التعليمية',
    supervisor: 'وكيلة المدرسة',
    quarter: 'Q3',
    status: 'منتظم',
    progress: 84,
    targetScore: 90,
    strategicGoal: 'تفعيل دور النشاط المدرسي في اكتشاف وتنمية مهارات ومواهب الطالبات المتنوعة.',
    detailedGoal: 'مشاركة 90% من الطالبات في أندية الشغف ورفع تمثيل المدرسة في المسابقات التنافسية بنسبة 20%.',
    kpiName: 'نسبة الطالبات المشاركات في أندية الشغف ونسبة التمثيل في المسابقات',
    baseline: 64,
    postScore: 84,
    targetImprovement: 20,
    beneficiariesCount: 388,
    beneficiariesTargetPct: 90,
    budgetSource: 'ذاتي / الإدارة',
    budgetAmount: 2700,
    location: 'الفصول والمسرح والملاعب',
    procedures: [
      'حصر ميول واهتمامات الطالبات وتفعيل أندية الشغف وفق المجالات',
      'إقامة المعارض الداخلية وتأهيل المتميزات للمنافسات على مستوى الإدارة'
    ],
    satisfaction: { students: 96, teachers: 90, parents: 91 },
    evaluation: { effectiveness: 88, efficiency: 86, sustainability: 85, impact: 89, evaluator: 'وكيلة المدرسة' },
    evidences: [
      { id: 'ev-24', name: 'سجل أندية الشغف والمشاركات التنافسية.pdf', type: 'PDF', date: '1448/05/16' }
    ],
    correctiveActions: []
  },
  {
    id: 24,
    code: 'PRG-24',
    name: 'المنهج في حياتنا',
    domain: 'المحتوى العلمي',
    subDomain: 'التطبيقات العملية',
    type: 'تعليمي / تطبيقي',
    owner: 'معلمات العلوم والرياضيات',
    supervisor: 'إدارة المدرسة',
    quarter: 'Q3',
    status: 'منتظم',
    progress: 77,
    targetScore: 90,
    strategicGoal: 'ربط المحتوى العلمي والمناهج بواقع الحياة العملية وتنمية مهارات التفكير العليا.',
    detailedGoal: 'توظيف المختبرات بنسبة 90% لتنفيذ التجارب المقررة وإنجاز مشروع تطبيقي لكل طالبة.',
    kpiName: 'نسبة استخدام المعامل للتجارب المقررة ونسبة الطلبة المنجزين للمشاريع',
    baseline: 63,
    postScore: 79,
    targetImprovement: 16,
    beneficiariesCount: 415,
    beneficiariesTargetPct: 90,
    budgetSource: 'الإدارة',
    budgetAmount: 3400,
    location: 'مختبر العلوم ومصادر التعلم',
    procedures: [
      'تفعيل جدول منتظم لاستخدام المعامل وتنفيذ التجارب العلمية',
      'تكليف الطالبات بمشروعات تطبيقية وإقامة معرض ختامي لعرض الأعمال'
    ],
    satisfaction: { students: 92, teachers: 89, parents: 88 },
    evaluation: { effectiveness: 85, efficiency: 83, sustainability: 84, impact: 87, evaluator: 'مديرة المدرسة' },
    evidences: [
      { id: 'ev-25', name: 'سجل استخدام مختبر العلوم والمشاريع.pdf', type: 'PDF', date: '1448/05/23' }
    ],
    correctiveActions: []
  }
];

const INITIAL_ALERTS = [
  {
    id: 'alt-1',
    severity: 'high',
    title: 'تعثر في مؤشر الأثر البعدي: برنامج التفكير الرياضي وحل المشكلات',
    desc: 'نسبة التحسن الحالية (+5%) أقل من المستهدف (+10%). تم تفعيل خطة تحسين آلية.',
    time: 'منذ 18 دقيقة',
    programId: 3
  },
  {
    id: 'alt-2',
    severity: 'high',
    title: 'انخفاض تفعيل المعامل الافتراضية: برنامج التمكين الرقمي',
    desc: 'نسبة التوظيف بلغت 62% مقابل 80% مستهدفة بسبب صيانة أجهزة مختبر الحاسب.',
    time: 'منذ ساعتين',
    programId: 15
  },
  {
    id: 'alt-3',
    severity: 'warning',
    title: 'موعد استحقاق قريب: مبادرة ارتقاء (الشراكات المجتمعية)',
    desc: 'متبقي 5 أيام لاعتماد وتوقيع اتفاقية الشراكة المجتمعية الثانية.',
    time: 'منذ 5 ساعات',
    programId: 19
  },
  {
    id: 'alt-4',
    severity: 'success',
    title: 'اعتماد شواهد الإنجاز الكامل: برنامج نحو الإتقان',
    desc: 'تحقق ارتفاع بنسبة +16% في مهارات نافس الأساسية وتجاوز المستهدف (10%).',
    time: 'أمس • 01:30 م',
    programId: 1
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [programs, setPrograms] = useState(INITIAL_PROGRAMS);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [toastMessage, setToastMessage] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState('الكل');
  const [statusFilter, setStatusFilter] = useState('الكل');
  const [quarterFilter, setQuarterFilter] = useState('الكل');
  const [ownerFilter, setOwnerFilter] = useState('الكل');

  const [selectedProgram, setSelectedProgram] = useState(null);
  const [updateModalProgram, setUpdateModalProgram] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [editProgress, setEditProgress] = useState(0);
  const [editPostScore, setEditPostScore] = useState(0);
  const [editStatus, setEditStatus] = useState('منتظم');
  const [newEvidenceName, setNewEvidenceName] = useState('');
  const [newEvidenceType, setNewEvidenceType] = useState('PDF');

  const [newPrg, setNewPrg] = useState({
    name: '',
    domain: 'نواتج التعلم ورعاية المتعلمين',
    type: 'تعليمي',
    owner: '',
    supervisor: 'وكيلة الشؤون التعليمية',
    quarter: 'Q3',
    strategicGoal: '',
    detailedGoal: '',
    kpiName: '',
    baseline: 60,
    targetImprovement: 15,
    beneficiariesCount: 350,
    budgetSource: 'ذاتي',
    budgetAmount: 2000,
    location: 'الفصول الدراسية'
  });

  // SROI Calculator States
  const [sroiProgramId, setSroiProgramId] = useState(1);
  const [sroiInvestment, setSroiInvestment] = useState(2500);
  const [sroiBeneficiaries, setSroiBeneficiaries] = useState(420);
  const [sroiValuePerBeneficiary, setSroiValuePerBeneficiary] = useState(96);
  const [sroiAttributionPct, setSroiAttributionPct] = useState(80);

  // Evaluation & Corrective Actions States
  const [evalProgramId, setEvalProgramId] = useState(3);
  const [evalScores, setEvalScores] = useState({
    effectiveness: 64,
    efficiency: 68,
    sustainability: 62,
    impact: 60
  });
  const [newActionTitle, setNewActionTitle] = useState('');
  const [newActionOwner, setNewActionOwner] = useState('');
  const [newActionDueDate, setNewActionDueDate] = useState('2026-12-15');

  // Reports Generator States
  const [reportScope, setReportScope] = useState('all');
  const [reportDomain, setReportDomain] = useState('نواتج التعلم ورعاية المتعلمين');
  const [reportQuarter, setReportQuarter] = useState('الكل');
  const [includeChartsInReport, setIncludeChartsInReport] = useState(true);
  const [includeRecommendations, setIncludeRecommendations] = useState(true);

  // Ministerial Report State (executorName left blank so user or teacher enters it)
  const [selectedMinisterialProgId, setSelectedMinisterialProgId] = useState(1);
  const [ministerialReport, setMinisterialReport] = useState({
    educationDept: SCHOOL_PROFILE.educationDept,
    schoolName: SCHOOL_PROFILE.schoolName,
    academicYear: '1448هـ',
    programCode: 'PRG-01',
    programName: 'نحو الإتقان',
    domain: 'نواتج التعلم ورعاية المتعلمين',
    programType: 'تعليمي',
    executionDate: '1448/04/15هـ',
    sessionsCount: '6 حصص تدريبية',
    location: 'الفصول الدراسية',
    targetGroup: 'طالبات المرحلة الدراسية المستهدفات في الاختبارات المعيارية',
    actualBeneficiaries: 420,
    attendanceRate: 90,
    strategicGoal: 'تحسين جودة التعليم والتعلم ورفع مستوى إتقان الطالبات للمهارات الأساسية بما يسهم في تحسين نواتج التعلم.',
    detailedGoal: 'رفع مستوى إتقان الطالبات للمهارات الأساسية المستهدفة وفق نتائج القياس التشخيصي وتحليل نتائج الاختبارات المعيارية (نافس).',
    proceduresText: '1. تشخيص مستوى الطالبات وتحديد فجوات التعلم عبر نتائج نافس\n2. تصنيف الطالبات وفق مستويات الإتقان وتصميم خطط علاجية وإثرائية\n3. متابعة تقدم الطالبات بقياسات دورية وتنفيذ القياس البعدي',
    kpiName: 'نسبة الطالبات المتقنات للمهارات المستهدفة في القياس البعدي',
    baselineScore: 68,
    postScore: 84,
    impactSummary: 'ارتفاع ملحوظ في مستوى إتقان الطالبات للمهارات الأساسية بنسبة تحسن بلغت (+16%) متجاوزة المستهدف المخطط (+10%).',
    executorName: '',
    executorRole: 'منسقة البرنامج / معلمة المواد المستهدفة',
    principalName: SCHOOL_PROFILE.principalName,
    principalRole: SCHOOL_PROFILE.principalRole,
    images: []
  });

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, []);

  const triggerToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3800);
  };

  const stats = useMemo(() => {
    const total = programs.length;
    const completed = programs.filter((p) => p.status === 'مكتمل').length;
    const onTrack = programs.filter((p) => p.status === 'منتظم').length;
    const delayed = programs.filter((p) => p.status === 'متعثر').length;

    const avgCompletion = Math.round(
      programs.reduce((acc, p) => acc + p.progress, 0) / (total || 1)
    );

    const impactScores = programs.map((p) => {
      const actualGain = Math.max(0, p.postScore - p.baseline);
      const gainRatio = Math.min(100, (actualGain / (p.targetImprovement || 10)) * 85);
      return Math.round(gainRatio * 0.5 + (p.evaluation?.impact || 80) * 0.5);
    });
    const avgImpact = Math.round(
      impactScores.reduce((acc, s) => acc + s, 0) / (total || 1)
    );

    const totalBeneficiaries = programs.reduce((acc, p) => acc + p.beneficiariesCount, 0);
    const totalBudget = programs.reduce((acc, p) => acc + p.budgetAmount, 0);

    return {
      total,
      completed,
      onTrack,
      delayed,
      avgCompletion,
      avgImpact,
      totalBeneficiaries,
      totalBudget
    };
  }, [programs]);

  const statusPieData = useMemo(
    () => [
      { name: 'مكتمل ومنجز', value: stats.completed, color: '#10B981' },
      { name: 'قيد التنفيذ (منتظم)', value: stats.onTrack, color: '#1E3A8A' },
      { name: 'متعثر (يحتاج تدخل)', value: stats.delayed, color: '#EF4444' }
    ],
    [stats]
  );

  const quarterlyPerformanceData = useMemo(() => {
    const quarters = [
      { key: 'Q1', label: 'الربع الأول (Q1)', target: 95 },
      { key: 'Q2', label: 'الربع الثاني (Q2)', target: 90 },
      { key: 'Q3', label: 'الربع الثالث (Q3)', target: 85 },
      { key: 'Q4', label: 'الربع الرابع (Q4)', target: 92 }
    ];

    return quarters.map((q) => {
      const qProgs = programs.filter((p) => p.quarter === q.key);
      if (qProgs.length === 0) {
        return { name: q.label, المستهدف: q.target, 'المتحقق فعلياً': 78, 'الأثر المحقق': 74 };
      }
      const actualAvg = Math.round(qProgs.reduce((acc, p) => acc + p.progress, 0) / qProgs.length);
      const impactAvg = Math.round(qProgs.reduce((acc, p) => acc + p.evaluation.impact, 0) / qProgs.length);
      return {
        name: q.label,
        المستهدف: q.target,
        'المتحقق فعلياً': actualAvg,
        'الأثر المحقق': impactAvg
      };
    });
  }, [programs]);

  const domainsList = useMemo(
    () => ['الكل', ...Array.from(new Set(programs.map((p) => p.domain)))],
    [programs]
  );
  const ownersList = useMemo(
    () => ['الكل', ...Array.from(new Set(programs.map((p) => p.supervisor)))],
    [programs]
  );

  const filteredPrograms = useMemo(() => {
    return programs.filter((p) => {
      const matchesSearch =
        p.name.includes(searchQuery) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.owner.includes(searchQuery) ||
        p.strategicGoal.includes(searchQuery);
      const matchesDomain = domainFilter === 'الكل' || p.domain === domainFilter;
      const matchesStatus = statusFilter === 'الكل' || p.status === statusFilter;
      const matchesQuarter = quarterFilter === 'الكل' || p.quarter === quarterFilter;
      const matchesOwner = ownerFilter === 'الكل' || p.supervisor === ownerFilter;
      return matchesSearch && matchesDomain && matchesStatus && matchesQuarter && matchesOwner;
    });
  }, [programs, searchQuery, domainFilter, statusFilter, quarterFilter, ownerFilter]);

  const openUpdateModal = (program) => {
    setUpdateModalProgram(program);
    setEditProgress(program.progress);
    setEditPostScore(program.postScore);
    setEditStatus(program.status);
    setNewEvidenceName('');
  };

  const handleSaveProgramUpdate = (e) => {
    e.preventDefault();
    if (!updateModalProgram) return;

    const updatedEvidences = [...updateModalProgram.evidences];
    if (newEvidenceName.trim()) {
      updatedEvidences.push({
        id: `ev-${Date.now()}`,
        name: newEvidenceName.trim(),
        type: newEvidenceType,
        date: '1448/06/02'
      });
    }

    const numericProgress = Number(editProgress);
    const numericPost = Number(editPostScore);

    let computedStatus = editStatus;
    if (numericProgress >= 95 && editStatus !== 'متعثر') {
      computedStatus = 'مكتمل';
    } else if (numericProgress < 65 && editStatus === 'مكتمل') {
      computedStatus = 'متعثر';
    }

    setPrograms((prev) =>
      prev.map((p) =>
        p.id === updateModalProgram.id
          ? { ...p, progress: numericProgress, postScore: numericPost, status: computedStatus, evidences: updatedEvidences }
          : p
      )
    );

    setAlerts((prev) => [
      {
        id: `alt-${Date.now()}`,
        severity: computedStatus === 'متعثر' ? 'high' : 'success',
        title: `تحديث ميداني: ${updateModalProgram.name}`,
        desc: `تم تحديث نسبة الإنجاز إلى ${numericProgress}% والقياس البعدي إلى ${numericPost}%.`,
        time: 'الآن',
        programId: updateModalProgram.id
      },
      ...prev
    ]);

    setUpdateModalProgram(null);
    triggerToast(`تم تحديث بيانات برنامج "${updateModalProgram.name}" بنجاح!`);
  };

  const handleAddNewProgram = (e) => {
    e.preventDefault();
    if (!newPrg.name.trim() || !newPrg.owner.trim()) return;

    const nextId = programs.length + 1;
    const created = {
      id: nextId,
      code: `PRG-${String(nextId).padStart(2, '0')}`,
      name: newPrg.name,
      domain: newPrg.domain,
      subDomain: 'مبادرة مستحدثة',
      type: newPrg.type,
      owner: newPrg.owner,
      supervisor: newPrg.supervisor,
      quarter: newPrg.quarter,
      status: 'منتظم',
      progress: 15,
      targetScore: 100,
      strategicGoal: newPrg.strategicGoal || 'رفع كفاءة الأداء المؤسسي وتحقيق مستهدفات الخطة التشغيلية.',
      detailedGoal: newPrg.detailedGoal || 'تحقيق تحسن ملموس في مؤشرات الأداء المستهدفة بنهاية الفصل الدراسي.',
      kpiName: newPrg.kpiName || 'نسبة التحسن في القياس البعدي مقارنة بخط الأساس',
      baseline: Number(newPrg.baseline),
      postScore: Number(newPrg.baseline) + 3,
      targetImprovement: Number(newPrg.targetImprovement),
      beneficiariesCount: Number(newPrg.beneficiariesCount),
      beneficiariesTargetPct: 90,
      budgetSource: newPrg.budgetSource,
      budgetAmount: Number(newPrg.budgetAmount),
      location: newPrg.location,
      procedures: [
        'حصر الاحتياج وتنفيذ القياس القبلي للفئة المستهدفة',
        'تنفيذ الأنشطة والورش التطبيقية وفق الجدول الزمني',
        'قياس الأثر البعدي وتوثيق الشواهد'
      ],
      satisfaction: { students: 88, teachers: 90, parents: 87 },
      evaluation: { effectiveness: 82, efficiency: 84, sustainability: 80, impact: 81, evaluator: newPrg.supervisor },
      evidences: [],
      correctiveActions: []
    };

    setPrograms((prev) => [created, ...prev]);
    setAddModalOpen(false);
    setNewPrg({
      name: '',
      domain: 'نواتج التعلم ورعاية المتعلمين',
      type: 'تعليمي',
      owner: '',
      supervisor: 'وكيلة الشؤون التعليمية',
      quarter: 'Q3',
      strategicGoal: '',
      detailedGoal: '',
      kpiName: '',
      baseline: 60,
      targetImprovement: 15,
      beneficiariesCount: 350,
      budgetSource: 'ذاتي',
      budgetAmount: 2000,
      location: 'الفصول الدراسية'
    });
    triggerToast(`تمت إضافة "${created.name}" إلى الخطة التشغيلية بنجاح!`);
  };

  const handleSelectSroiProgram = (id) => {
    const numId = Number(id);
    setSroiProgramId(numId);
    const found = programs.find((p) => p.id === numId);
    if (found) {
      setSroiInvestment(found.budgetAmount || 2500);
      setSroiBeneficiaries(found.beneficiariesCount || 300);
      setSroiValuePerBeneficiary(Math.max(45, (found.postScore - found.baseline) * 6));
    }
  };

  const sroiCalculation = useMemo(() => {
    const grossSocialValue = sroiBeneficiaries * sroiValuePerBeneficiary;
    const netAdjustedValue = grossSocialValue * (sroiAttributionPct / 100);
    const ratio = sroiInvestment > 0 ? (netAdjustedValue / sroiInvestment).toFixed(2) : '0.00';
    return {
      grossSocialValue: Math.round(grossSocialValue),
      netAdjustedValue: Math.round(netAdjustedValue),
      ratio
    };
  }, [sroiInvestment, sroiBeneficiaries, sroiValuePerBeneficiary, sroiAttributionPct]);

  const selectedEvalProgram = useMemo(
    () => programs.find((p) => p.id === evalProgramId) || programs[0],
    [programs, evalProgramId]
  );

  useEffect(() => {
    if (selectedEvalProgram && selectedEvalProgram.evaluation) {
      setEvalScores({
        effectiveness: selectedEvalProgram.evaluation.effectiveness,
        efficiency: selectedEvalProgram.evaluation.efficiency,
        sustainability: selectedEvalProgram.evaluation.sustainability,
        impact: selectedEvalProgram.evaluation.impact
      });
    }
  }, [selectedEvalProgram]);

  const currentEvalAverage = useMemo(() => {
    return Math.round(
      (evalScores.effectiveness + evalScores.efficiency + evalScores.sustainability + evalScores.impact) / 4
    );
  }, [evalScores]);

  const handleSaveEvaluation = () => {
    if (!selectedEvalProgram) return;
    const needsIntervention = currentEvalAverage < 70;
    setPrograms((prev) =>
      prev.map((p) =>
        p.id === selectedEvalProgram.id
          ? {
              ...p,
              status: needsIntervention ? 'متعثر' : p.progress >= 95 ? 'مكتمل' : 'منتظم',
              evaluation: { ...p.evaluation, ...evalScores }
            }
          : p
      )
    );
    triggerToast(`تم اعتماد بطاقة التقويم لبرنامج "${selectedEvalProgram.name}" بمتوسط ${currentEvalAverage}%.`);
  };

  const handleAddCorrectiveAction = (e) => {
    e.preventDefault();
    if (!newActionTitle.trim() || !selectedEvalProgram) return;

    const actionObj = {
      id: `ca-${Date.now()}`,
      title: newActionTitle.trim(),
      owner: newActionOwner.trim() || selectedEvalProgram.owner,
      dueDate: newActionDueDate,
      status: 'قيد التنفيذ'
    };

    setPrograms((prev) =>
      prev.map((p) =>
        p.id === selectedEvalProgram.id
          ? { ...p, correctiveActions: [...(p.correctiveActions || []), actionObj] }
          : p
      )
    );
    setNewActionTitle('');
    setNewActionOwner('');
    triggerToast('تمت إضافة الإجراء التصحيحي وجدولته في خطة التحسين.');
  };

  const loadProgramIntoMinisterialReport = (progId, shouldSwitchTab = false) => {
    const numId = Number(progId);
    setSelectedMinisterialProgId(numId);
    const prog = programs.find((p) => p.id === numId);
    if (!prog) return;

    const delta = prog.postScore - prog.baseline;
    setMinisterialReport((prev) => ({
      ...prev,
      programCode: prog.code,
      programName: prog.name,
      domain: prog.domain,
      programType: prog.type,
      location: prog.location,
      actualBeneficiaries: prog.beneficiariesCount,
      attendanceRate: prog.beneficiariesTargetPct,
      strategicGoal: prog.strategicGoal,
      detailedGoal: prog.detailedGoal,
      proceduresText: prog.procedures.map((step, i) => `${i + 1}. ${step}`).join('\n'),
      kpiName: prog.kpiName,
      baselineScore: prog.baseline,
      postScore: prog.postScore,
      impactSummary: `تحقق تحسن في ${prog.kpiName} من (${prog.baseline}%) في القياس القبلي إلى (${prog.postScore}%) في القياس البعدي بمقدار (+${delta}%) مقارنة بالمستهدف (+${prog.targetImprovement}%).`,
      executorName: '', // يترك فارغاً ليقوم المستخدم بكتابته
      executorRole: `مسؤول التنفيذ • إشراف: ${prog.supervisor}`
    }));

    if (shouldSwitchTab) {
      setActiveTab('ministerial');
      triggerToast(`تم استيراد بيانات "${prog.name}" إلى نموذج التقرير الوزاري!`);
    }
  };

  const handleMinisterialImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remainingSlots = 4 - ministerialReport.images.length;
    if (remainingSlots <= 0) {
      triggerToast('الحد الأقصى للصور التوثيقية في النموذج الوزاري هو 4 صور.', 'warning');
      return;
    }

    const filesToProcess = files.slice(0, remainingSlots);
    filesToProcess.forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setMinisterialReport((prev) => {
          if (prev.images.length >= 4) return prev;
          return {
            ...prev,
            images: [
              ...prev.images,
              {
                id: `img-${Date.now()}-${idx}`,
                dataUrl: event.target.result,
                caption: `شاهد توثيقي (${prev.images.length + 1}) - ${prev.programName}`
              }
            ]
          };
        });
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
    triggerToast(`تم إرفاق ${filesToProcess.length} صورة توثيقية للتقرير.`);
  };

  const handleRemoveMinisterialImage = (imgId) => {
    setMinisterialReport((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== imgId)
    }));
  };

  const handleUpdateImageCaption = (imgId, caption) => {
    setMinisterialReport((prev) => ({
      ...prev,
      images: prev.images.map((img) => (img.id === imgId ? { ...img, caption } : img))
    }));
  };

  const handleSaveMinisterialJSON = () => {
    const payload = {
      platform: 'منصة أثر - النموذج الوزاري للتقارير',
      version: '1.0',
      savedAt: new Date().toISOString(),
      data: ministerialReport
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = (ministerialReport.programName || 'برنامج').replace(/\s+/g, '_');
    link.href = url;
    link.setAttribute('download', `تقرير_${safeName}_للتعديل.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('تم تنزيل ملف التقرير (.json) للرجوع إليه وتعديله لاحقاً!');
  };

  const handleLoadMinisterialJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        const restoredData = parsed.data || parsed;
        if (restoredData && restoredData.programName) {
          setMinisterialReport((prev) => ({
            ...prev,
            ...restoredData,
            images: Array.isArray(restoredData.images) ? restoredData.images.slice(0, 4) : []
          }));
          triggerToast(`تمت استعادة بيانات وصور تقرير "${restoredData.programName}" بنجاح!`);
        }
      } catch {
        triggerToast('تعذر قراءة الملف.', 'warning');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleDownloadMinisterialHTML = () => {
    const r = ministerialReport;
    const delta = Number(r.postScore) - Number(r.baselineScore);
    const imagesHtml =
      r.images.length > 0
        ? `<div style="margin-top:16px;">
            <h3 style="background:#0F294A;color:#fff;padding:6px 12px;font-size:13px;border-radius:4px;">الشواهد والصور التوثيقية للبرنامج</h3>
            <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:10px;">
              ${r.images
                .map(
                  (img) => `
                <div style="border:1px solid #cbd5e1;border-radius:8px;padding:6px;text-align:center;">
                  <img src="${img.dataUrl}" style="width:100%;height:170px;object-fit:cover;border-radius:4px;" />
                  <p style="font-size:11px;color:#334155;margin:6px 0 0;">${img.caption || ''}</p>
                </div>`
                )
                .join('')}
            </div>
          </div>`
        : '';

    const htmlDoc = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8" />
<title>تقرير تنفيذ برنامج - ${r.programName}</title>
<style>
  body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; background:#fff; color:#0f172a; padding:24px; direction:rtl; }
  .sheet { max-width:800px; margin:0 auto; border:2px solid #0F294A; padding:24px; border-radius:8px; }
  .header { display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #0F294A; padding-bottom:12px; margin-bottom:16px; }
  table { width:100%; border-collapse:collapse; margin-top:10px; font-size:13px; }
  th, td { border:1px solid #94a3b8; padding:8px 10px; text-align:right; vertical-align:top; }
  th { background:#f1f5f9; color:#0F294A; width:22%; font-weight:bold; }
  .badge { background:#0F294A; color:#fff; padding:4px 12px; border-radius:4px; font-size:14px; font-weight:bold; display:inline-block; }
  .footer { display:flex; justify-content:space-between; margin-top:28px; padding-top:14px; border-top:1px dashed #94a3b8; text-align:center; font-size:13px; }
</style>
</head>
<body>
  <div class="sheet">
    <div class="header">
      <div>
        <div style="font-weight:bold;color:#0F294A;font-size:14px;">المملكة العربية السعودية - وزارة التعليم</div>
        <div style="font-size:12px;color:#475569;">${r.educationDept}</div>
        <div style="font-size:12px;color:#475569;">المدرسة: <strong>${r.schoolName}</strong> • العام الدراسي: ${r.academicYear}</div>
      </div>
      <div style="text-align:left;">
        <span class="badge">تقرير تنفيذ برنامج / نشاط</span>
        <div style="font-size:11px;color:#64748b;margin-top:4px;">الرمز: ${r.programCode} • منصة أثر</div>
      </div>
    </div>
    <table>
      <tr><th>اسم البرنامج / المبادرة</th><td><strong>${r.programName}</strong></td><th>المجال</th><td>${r.domain}</td></tr>
      <tr><th>نوع البرنامج</th><td>${r.programType}</td><th>تاريخ التنفيذ</th><td>${r.executionDate} (${r.sessionsCount})</td></tr>
      <tr><th>مكان التنفيذ</th><td>${r.location}</td><th>الفئة المستهدفة</th><td>${r.targetGroup} (${r.actualBeneficiaries} مستفيد)</td></tr>
      <tr><th>الهدف الاستراتيجي</th><td colspan="3">${r.strategicGoal}</td></tr>
      <tr><th>الهدف التفصيلي</th><td colspan="3">${r.detailedGoal}</td></tr>
      <tr><th>إجراءات التنفيذ</th><td colspan="3" style="white-space:pre-line;">${r.proceduresText}</td></tr>
      <tr><th>مؤشر قياس الأثر</th><td colspan="3">${r.kpiName}</td></tr>
      <tr><th>نتائج القياس (قبلي / بعدي)</th><td colspan="3">القياس القبلي: <strong>${r.baselineScore}%</strong> ← القياس البعدي: <strong>${r.postScore}%</strong> (مقدار التحسن: <strong>${delta >= 0 ? '+' + delta : delta}%</strong>)</td></tr>
      <tr><th>ملخص الأثر والنتائج</th><td colspan="3">${r.impactSummary}</td></tr>
    </table>
    ${imagesHtml}
    <div class="footer">
      <div><strong>منفذ البرنامج</strong><br/>${r.executorName || '..........................'}<br/><span style="font-size:11px;color:#64748b;">${r.executorRole}</span></div>
      <div><strong>يعتمد / قائد المنشأة</strong><br/>${r.principalName}<br/><span style="font-size:11px;color:#64748b;">${r.principalRole}</span></div>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlDoc], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = (r.programName || 'برنامج').replace(/\s+/g, '_');
    link.href = url;
    link.setAttribute('download', `تقرير_وزاري_${safeName}.html`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('تم تنزيل ملف التقرير الوزاري الجاهز للطباعة على جهازك!');
  };

  const reportPrograms = useMemo(() => {
    return programs.filter((p) => {
      if (reportQuarter !== 'الكل' && p.quarter !== reportQuarter) return false;
      if (reportScope === 'delayed') return p.status === 'متعثر';
      if (reportScope === 'impact') return p.postScore - p.baseline >= p.targetImprovement;
      if (reportScope === 'domain') return p.domain === reportDomain;
      return true;
    });
  }, [programs, reportScope, reportDomain, reportQuarter]);

  const handleExportCSV = () => {
    const headers = ['رمز البرنامج', 'اسم البرنامج', 'المجال', 'المسؤول', 'المتابع', 'الربع', 'الحالة', 'نسبة الإنجاز %', 'خط الأساس %', 'القياس البعدي %', 'التحسن الفعلي %', 'عدد المستفيدين'];
    const rows = reportPrograms.map((p) => [
      p.code, `"${p.name}"`, `"${p.domain}"`, `"${p.owner}"`, `"${p.supervisor}"`, p.quarter, p.status, p.progress, p.baseline, p.postScore, p.postScore - p.baseline, p.beneficiariesCount
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `تقرير_منصة_أثر.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('تم تصدير التقرير بصيغة CSV بنجاح!');
  };

  const handlePrintPDF = () => {
    triggerToast('جاري تجهيز صفحة الطباعة...');
    setTimeout(() => window.print(), 300);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'مكتمل':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            مكتمل
          </span>
        );
      case 'متعثر':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            متعثر
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            منتظم
          </span>
        );
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'لوحة القيادة الرئيسية', icon: LayoutDashboard },
    { id: 'programs', label: 'إدارة البرامج والمبادرات', icon: FolderKanban, badge: programs.length },
    { id: 'impact', label: 'مصفوفة قياس الأثر', icon: Target },
    { id: 'evaluation', label: 'متابعة وتقييم الخطة', icon: ClipboardCheck, badge: stats.delayed > 0 ? stats.delayed : null },
    { id: 'ministerial', label: 'إصدار تقرير برنامج (وزاري)', icon: FileCheck2 },
    { id: 'reports', label: 'مولّد التقارير الشامل', icon: FileSpreadsheet }
  ];

  return (
    <div dir="rtl" className={`${darkMode ? 'dark' : ''} min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100`}>
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-[#0F294A] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-blue-700/50">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage.msg}</span>
        </div>
      )}

      {mobileMenuOpen && (
        <div onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden" />
      )}

      <aside className={`fixed lg:sticky top-0 right-0 z-40 h-screen bg-[#0F294A] dark:bg-slate-900 text-white flex flex-col transition-all duration-300 shadow-xl border-l border-slate-800/40 ${sidebarOpen ? 'w-72' : 'w-20'} ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <div className="truncate">
                <h1 className="text-xl font-bold tracking-tight text-white">منصة أثر</h1>
                <p className="text-[11px] text-blue-200/80 font-medium">حوكمة وقياس أثر الخطة التشغيلية</p>
              </div>
            )}
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden lg:flex p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-blue-100">
            {sidebarOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden p-1.5 rounded-lg bg-white/10 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive ? 'bg-white text-[#0F294A] shadow-md font-bold' : 'text-blue-100/85 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#0F294A]' : 'text-blue-300'}`} />
                  {sidebarOpen && <span className="truncate">{item.label}</span>}
                </div>
                {sidebarOpen && item.badge !== undefined && item.badge !== null && (
                  <span className={`px-2 py-0.5 text-xs rounded-full font-bold ${item.id === 'evaluation' ? 'bg-rose-500 text-white' : isActive ? 'bg-[#0F294A]/10 text-[#0F294A]' : 'bg-white/15 text-white'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#0F294A] dark:text-white">
                {navItems.find((n) => n.id === activeTab)?.label}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                {SCHOOL_PROFILE.schoolName} • {programs.length} برنامجاً تشغيلياً
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button onClick={() => setAddModalOpen(true)} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0F294A] hover:bg-blue-900 text-white text-xs sm:text-sm font-semibold shadow-sm transition">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">إضافة برنامج</span>
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto space-y-6">
          {/* 1. Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">نسبة الإنجاز الكلية للخطة</p>
                      <h3 className="text-3xl font-extrabold text-[#0F294A] dark:text-white mt-2">{stats.avgCompletion}%</h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0F294A]"><TrendingUp className="w-6 h-6" /></div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">مؤشر قياس الأثر العام</p>
                      <h3 className="text-3xl font-extrabold text-emerald-600 mt-2">{stats.avgImpact}%</h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600"><Award className="w-6 h-6" /></div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">إجمالي البرامج</p>
                      <h3 className="text-3xl font-extrabold text-slate-800 dark:text-white mt-2">{stats.total} برنامجاً</h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600"><Layers className="w-6 h-6" /></div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-rose-200/80 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">البرامج المتعثرة</p>
                      <h3 className="text-3xl font-extrabold text-rose-600 mt-2">{stats.delayed} برامج</h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600"><ShieldAlert className="w-6 h-6" /></div>
                  </div>
                  <button onClick={() => setActiveTab('evaluation')} className="mt-3 text-xs font-bold text-rose-600 hover:underline flex items-center gap-1">
                    <span>الانتقال لمتابعة وتقييم الخطة</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                  <h3 className="text-base font-bold text-[#0F294A] dark:text-white mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-blue-600" /> الأداء الربعي للبرامج (المستهدف vs المتحقق vs الأثر)</h3>
                  <div className="h-72 w-full" dir="ltr">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={quarterlyPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="المستهدف" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="المتحقق فعلياً" fill="#1E3A8A" radius={[4, 4, 0, 0]} />
                        <Line type="monotone" dataKey="الأثر المحقق" stroke="#10B981" strokeWidth={3} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                  <h3 className="text-base font-bold text-[#0F294A] dark:text-white mb-4 flex items-center gap-2"><PieChartIcon className="w-5 h-5 text-emerald-600" /> توزيع حالة الـ 24 برنامجاً</h3>
                  <div className="h-56 w-full" dir="ltr">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={statusPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                          {statusPieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2 mt-2 text-xs">
                    {statusPieData.map((item) => (
                      <div key={item.name} className="flex justify-between items-center font-medium">
                        <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />{item.name}</span>
                        <span className="font-bold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. Programs (All 24 programs) */}
          {activeTab === 'programs' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="ابحث باسم البرنامج (مثل: نحو الإتقان، صناع المستقبل، التمكين الرقمي)..."
                      className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">المجال</label>
                    <select value={domainFilter} onChange={(e) => setDomainFilter(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium">
                      {domainsList.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">الحالة</label>
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium">
                      <option value="الكل">جميع الحالات</option>
                      <option value="مكتمل">مكتمل</option>
                      <option value="منتظم">منتظم</option>
                      <option value="متعثر">متعثر</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">الربع</label>
                    <select value={quarterFilter} onChange={(e) => setQuarterFilter(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium">
                      <option value="الكل">جميع الأرباع</option>
                      <option value="Q1">Q1</option>
                      <option value="Q2">Q2</option>
                      <option value="Q3">Q3</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-sm font-bold text-[#0F294A] dark:text-white">البرامج والمبادرات التشغيلية ({filteredPrograms.length})</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-right border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/70 text-xs font-bold border-b border-slate-200 dark:border-slate-800">
                        <th className="py-3.5 px-4">البرنامج / الرمز</th>
                        <th className="py-3.5 px-4">المجال</th>
                        <th className="py-3.5 px-4">مسؤول التنفيذ</th>
                        <th className="py-3.5 px-4">الإنجاز</th>
                        <th className="py-3.5 px-4">الأثر (قبلي ← بعدي)</th>
                        <th className="py-3.5 px-4">الحالة</th>
                        <th className="py-3.5 px-4 text-center">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                      {filteredPrograms.map((prog) => {
                        const delta = prog.postScore - prog.baseline;
                        return (
                          <tr key={prog.id} className="hover:bg-blue-50/40 dark:hover:bg-slate-800/50 transition">
                            <td className="py-4 px-4">
                              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-bold ml-2">{prog.code}</span>
                              <button onClick={() => setSelectedProgram(prog)} className="font-bold text-[#0F294A] dark:text-blue-300 hover:underline">{prog.name}</button>
                            </td>
                            <td className="py-4 px-4 text-xs">{prog.domain}</td>
                            <td className="py-4 px-4 text-xs font-semibold">{prog.owner}</td>
                            <td className="py-4 px-4 w-36">
                              <div className="text-xs font-bold mb-1">{prog.progress}%</div>
                              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full" style={{ width: `${prog.progress}%` }} />
                              </div>
                            </td>
                            <td className="py-4 px-4 text-xs">
                              {prog.baseline}% ← <strong>{prog.postScore}%</strong> <span className="text-emerald-600 font-bold">(+{delta}%)</span>
                            </td>
                            <td className="py-4 px-4">{getStatusBadge(prog.status)}</td>
                            <td className="py-4 px-4 text-center">
                              <div className="flex justify-center gap-2">
                                <button onClick={() => setSelectedProgram(prog)} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200" title="تفاصيل"><Eye className="w-4 h-4" /></button>
                                <button onClick={() => openUpdateModal(prog)} className="p-2 rounded-lg bg-blue-50 text-blue-700" title="تحديث"><Edit3 className="w-4 h-4" /></button>
                                <button onClick={() => loadProgramIntoMinisterialReport(prog.id, true)} className="p-2 rounded-lg bg-emerald-50 text-emerald-700" title="تقرير وزاري"><FileCheck2 className="w-4 h-4" /></button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 3. Impact Matrix */}
          {activeTab === 'impact' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-[#0F294A] dark:text-white flex items-center gap-2"><Target className="w-5 h-5 text-emerald-600" /> مصفوفة قياس الأثر والعائد الاجتماعي (SROI)</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div>
                  <label className="block text-xs font-bold mb-1">اختر البرنامج</label>
                  <select value={sroiProgramId} onChange={(e) => handleSelectSroiProgram(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-xs font-bold">
                    {programs.map((p) => <option key={p.id} value={p.id}>{p.code} - {p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">التكلفة الاستثمارية (ر.س)</label>
                  <input type="number" value={sroiInvestment} onChange={(e) => setSroiInvestment(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-xs font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">عدد المستفيدين</label>
                  <input type="number" value={sroiBeneficiaries} onChange={(e) => setSroiBeneficiaries(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-xs font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">قيمة العائد لكل مستفيد</label>
                  <input type="number" value={sroiValuePerBeneficiary} onChange={(e) => setSroiValuePerBeneficiary(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-xs font-bold" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30"><span className="text-xs text-slate-500">القيمة الاجتماعية الإجمالية</span><div className="text-2xl font-extrabold text-[#0F294A] dark:text-blue-300 mt-1">{sroiCalculation.grossSocialValue.toLocaleString()} ر.س</div></div>
                <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30"><span className="text-xs text-slate-500">العائد الصافي المنسوب ({sroiAttributionPct}%)</span><div className="text-2xl font-extrabold text-emerald-600 mt-1">{sroiCalculation.netAdjustedValue.toLocaleString()} ر.س</div></div>
                <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30"><span className="text-xs text-slate-500">نسبة العائد الاجتماعي (SROI)</span><div className="text-2xl font-extrabold text-amber-700 dark:text-amber-400 mt-1">{sroiCalculation.ratio} : 1</div></div>
              </div>
            </div>
          )}

          {/* 4. Evaluation & Monitoring (متابعة وتقييم الخطة) */}
          {activeTab === 'evaluation' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-[#0F294A] dark:text-white flex items-center gap-2"><ClipboardCheck className="w-5 h-5 text-blue-600" /> متابعة وتقييم الخطة التشغيلية وخطط التحسين</h3>
                  <p className="text-xs text-slate-500 mt-1">تقييم الفعالية، الكفاءة، الاستدامة، والأثر، ومتابعة الإجراءات التصحيحية.</p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <label className="text-xs font-bold">اختر البرنامج:</label>
                  <select value={evalProgramId} onChange={(e) => setEvalProgramId(Number(e.target.value))} className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs font-bold">
                    {programs.map((p) => <option key={p.id} value={p.id}>{p.code} - {p.name} ({p.status})</option>)}
                  </select>
                </div>
              </div>

              {selectedEvalProgram && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold text-[#0F294A] dark:text-white">بطاقة تقويم: {selectedEvalProgram.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${currentEvalAverage >= 70 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>المتوسط: {currentEvalAverage}%</span>
                    </div>

                    {['effectiveness', 'efficiency', 'sustainability', 'impact'].map((key) => {
                      const labels = {
                        effectiveness: 'فعالية تحقيق الأهداف',
                        efficiency: 'كفاءة استثمار الموارد',
                        sustainability: 'استدامة الأثر',
                        impact: 'الأثر التربوي الفعلي'
                      };
                      return (
                        <div key={key}>
                          <div className="flex justify-between text-xs font-semibold mb-1">
                            <span>{labels[key]}:</span>
                            <span className="font-bold">{evalScores[key]}%</span>
                          </div>
                          <input type="range" min="0" max="100" value={evalScores[key]} onChange={(e) => setEvalScores({ ...evalScores, [key]: Number(e.target.value) })} className="w-full accent-[#0F294A]" />
                        </div>
                      );
                    })}

                    <button onClick={handleSaveEvaluation} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow">حفظ واعتماد التقييم الميداني</button>
                  </div>

                  <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border space-y-4">
                    <h4 className="text-sm font-bold text-[#0F294A] dark:text-white">الإجراءات التصحيحية وخطة التحسين</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {selectedEvalProgram.correctiveActions && selectedEvalProgram.correctiveActions.length > 0 ? (
                        selectedEvalProgram.correctiveActions.map((ca) => (
                          <div key={ca.id} className="p-3 rounded-xl bg-white dark:bg-slate-900 border text-xs space-y-1">
                            <div className="font-bold">{ca.title}</div>
                            <div className="text-[11px] text-slate-500">المسؤول: {ca.owner} • الاستحقاق: {ca.dueDate}</div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400">لا توجد إجراءات تصحيحية مسجلة حالياً.</p>
                      )}
                    </div>

                    <form onSubmit={handleAddCorrectiveAction} className="pt-3 border-t space-y-2.5">
                      <input type="text" required placeholder="إضافة إجراء تصحيحي..." value={newActionTitle} onChange={(e) => setNewActionTitle(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-xs" />
                      <button type="submit" className="w-full py-2 bg-[#0F294A] text-white rounded-xl text-xs font-bold">إضافة خطة المعالجة</button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 5. Ministerial Report (executorName blank by default) */}
          {activeTab === 'ministerial' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col xl:flex-row justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
                  <span className="text-xs font-bold text-[#0F294A] dark:text-blue-300">استيراد بيانات برنامج:</span>
                  <select value={selectedMinisterialProgId} onChange={(e) => loadProgramIntoMinisterialReport(e.target.value, false)} className="w-full sm:max-w-md px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs font-bold">
                    {programs.map((p) => <option key={p.id} value={p.id}>{p.code} — {p.name}</option>)}
                  </select>
                </div>

                <div className="flex flex-wrap gap-2">
                  <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold cursor-pointer">
                    <FolderOpen className="w-4 h-4 text-amber-600" /> فتح محفوظ
                    <input type="file" accept=".json" onChange={handleLoadMinisterialJSON} className="hidden" />
                  </label>
                  <button type="button" onClick={handleSaveMinisterialJSON} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                    <Save className="w-4 h-4" /> حفظ للتعديل
                  </button>
                  <button type="button" onClick={handleDownloadMinisterialHTML} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold">
                    <FileDown className="w-4 h-4" /> تنزيل التقرير
                  </button>
                  <button type="button" onClick={handlePrintPDF} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F294A] text-white text-xs font-bold">
                    <Printer className="w-4 h-4" /> طباعة / PDF
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                <div className="xl:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-[#0F294A] dark:text-white pb-2 border-b">بيانات التقرير الوزاري</h3>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">اسم المنفذة / المعلمة (فارغ للكتابة الحرة):</label>
                    <input
                      type="text"
                      value={ministerialReport.executorName}
                      placeholder="اكتبي اسم المعلمة أو المنفذة هنا..."
                      onChange={(e) => setMinisterialReport({ ...ministerialReport, executorName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-blue-300 dark:border-blue-700 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">اسم البرنامج:</label>
                    <input type="text" value={ministerialReport.programName} onChange={(e) => setMinisterialReport({ ...ministerialReport, programName: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs font-bold" />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">صور التوثيق ({ministerialReport.images.length} / 4):</label>
                    {ministerialReport.images.length < 4 && (
                      <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-xl bg-blue-50/40 cursor-pointer text-xs">
                        <ImageIcon className="w-6 h-6 text-[#0F294A] mb-1" />
                        <span>إرفاق صور الشواهد</span>
                        <input type="file" accept="image/*" multiple onChange={handleMinisterialImageUpload} className="hidden" />
                      </label>
                    )}
                    {ministerialReport.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {ministerialReport.images.map((img) => (
                          <div key={img.id} className="p-2 border rounded-xl bg-slate-50 space-y-1">
                            <div className="relative h-20 rounded overflow-hidden">
                              <img src={img.dataUrl} alt={img.caption} className="w-full h-full object-cover" />
                              <button type="button" onClick={() => handleRemoveMinisterialImage(img.id)} className="absolute top-1 left-1 p-1 bg-rose-600 text-white rounded"><Trash2 className="w-3 h-3" /></button>
                            </div>
                            <input type="text" value={img.caption} onChange={(e) => handleUpdateImageCaption(img.id, e.target.value)} className="w-full px-2 py-1 border rounded text-[10px]" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="xl:col-span-7 bg-white text-slate-900 p-6 sm:p-8 rounded-2xl border-2 border-[#0F294A] shadow-xl space-y-5">
                  <div className="flex justify-between items-start pb-4 border-b-2 border-[#0F294A]">
                    <div>
                      <div className="text-xs font-extrabold text-[#0F294A]">المملكة العربية السعودية • وزارة التعليم</div>
                      <div className="text-xs font-bold text-slate-700">{ministerialReport.educationDept}</div>
                      <div className="text-xs text-slate-600">المدرسة: <strong>{ministerialReport.schoolName}</strong> • العام الدراسي: <strong>{ministerialReport.academicYear}</strong></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-[#0F294A] text-white text-xs font-bold rounded-lg">تقرير تنفيذ برنامج</span>
                      <div className="w-10 h-10 border rounded-lg flex items-center justify-center text-[#0F294A]"><QrCode className="w-6 h-6" /></div>
                    </div>
                  </div>

                  <table className="w-full text-right text-xs border-collapse border border-slate-400">
                    <tbody>
                      <tr className="border-b border-slate-300">
                        <th className="bg-slate-100 p-2.5 w-1/4 border-l border-slate-300">اسم البرنامج</th>
                        <td className="p-2.5 font-extrabold">{ministerialReport.programName}</td>
                        <th className="bg-slate-100 p-2.5 w-1/5 border-l border-slate-300">المجال</th>
                        <td className="p-2.5">{ministerialReport.domain}</td>
                      </tr>
                      <tr className="border-b border-slate-300">
                        <th className="bg-slate-100 p-2.5 border-l border-slate-300">الهدف التفصيلي</th>
                        <td colSpan="3" className="p-2.5">{ministerialReport.detailedGoal}</td>
                      </tr>
                      <tr className="border-b border-slate-300">
                        <th className="bg-slate-100 p-2.5 border-l border-slate-300">إجراءات التنفيذ</th>
                        <td colSpan="3" className="p-2.5 whitespace-pre-line">{ministerialReport.proceduresText}</td>
                      </tr>
                      <tr className="border-b border-slate-300 bg-emerald-50/50">
                        <th className="bg-emerald-100/80 p-2.5 border-l border-slate-300">نتائج قياس الأثر</th>
                        <td colSpan="3" className="p-2.5">
                          <div className="font-bold mb-1">قبلي: {ministerialReport.baselineScore}% ← بعدي: {ministerialReport.postScore}%</div>
                          <p>{ministerialReport.impactSummary}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {ministerialReport.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      {ministerialReport.images.map((img) => (
                        <div key={img.id} className="border rounded-xl p-2 text-center bg-slate-50">
                          <img src={img.dataUrl} alt={img.caption} className="w-full h-36 object-cover rounded-lg" />
                          <p className="text-[11px] font-semibold mt-1">{img.caption}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-4 border-t-2 border-slate-300 grid grid-cols-2 gap-6 text-center text-xs">
                    <div>
                      <span className="block font-bold text-[#0F294A]">منفذ البرنامج</span>
                      <span className="block font-extrabold text-sm mt-1">{ministerialReport.executorName || '..........................'}</span>
                      <span className="block text-[11px] text-slate-500">{ministerialReport.executorRole}</span>
                    </div>
                    <div>
                      <span className="block font-bold text-[#0F294A]">يعتمد / قائد المنشأة</span>
                      <span className="block font-extrabold text-sm mt-1">{ministerialReport.principalName}</span>
                      <span className="block text-[11px] text-slate-500">{ministerialReport.principalRole}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. Reports Generator */}
          {activeTab === 'reports' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b">
                <div>
                  <h3 className="text-base font-bold text-[#0F294A] dark:text-white">مولّد التقارير الشامل (24 برنامجاً)</h3>
                  <p className="text-xs text-slate-500">تصدير بيانات الخطة التشغيلية إلى CSV أو طباعتها</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleExportCSV} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"><Download className="w-4 h-4" /> تصدير CSV</button>
                  <button onClick={handlePrintPDF} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F294A] text-white text-xs font-bold"><Printer className="w-4 h-4" /> طباعة</button>
                </div>
              </div>

              <div className="overflow-x-auto border rounded-xl">
                <table className="w-full text-right text-xs">
                  <thead className="bg-[#0F294A] text-white">
                    <tr>
                      <th className="py-3 px-3">الرمز</th>
                      <th className="py-3 px-3">اسم البرنامج</th>
                      <th className="py-3 px-3">المجال</th>
                      <th className="py-3 px-3">المسؤول</th>
                      <th className="py-3 px-3">الإنجاز</th>
                      <th className="py-3 px-3">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {reportPrograms.map((p) => (
                      <tr key={p.id}>
                        <td className="py-2.5 px-3 font-bold">{p.code}</td>
                        <td className="py-2.5 px-3 font-bold">{p.name}</td>
                        <td className="py-2.5 px-3">{p.domain}</td>
                        <td className="py-2.5 px-3">{p.owner}</td>
                        <td className="py-2.5 px-3 font-bold">{p.progress}%</td>
                        <td className="py-2.5 px-3">{p.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border overflow-hidden my-8">
            <div className="bg-[#0F294A] text-white p-6 flex justify-between items-start">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-xs font-bold">{selectedProgram.code}</span>
                <h3 className="text-xl font-extrabold mt-2">{selectedProgram.name}</h3>
                <p className="text-xs text-blue-200 mt-1">{selectedProgram.domain}</p>
              </div>
              <button onClick={() => setSelectedProgram(null)} className="p-2 rounded-xl bg-white/10"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4 text-xs">
              <div><strong>الهدف الاستراتيجي:</strong> <p className="mt-1 text-slate-600 dark:text-slate-300">{selectedProgram.strategicGoal}</p></div>
              <div><strong>الهدف التفصيلي:</strong> <p className="mt-1 text-slate-600 dark:text-slate-300">{selectedProgram.detailedGoal}</p></div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800"><span>الإنجاز</span><div className="text-base font-bold mt-1">{selectedProgram.progress}%</div></div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800"><span>القياس القبلي</span><div className="text-base font-bold mt-1">{selectedProgram.baseline}%</div></div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800"><span>القياس البعدي</span><div className="text-base font-bold text-emerald-600 mt-1">{selectedProgram.postScore}%</div></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {updateModalProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border overflow-hidden">
            <div className="bg-[#0F294A] text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-base font-bold">تحديث: {updateModalProgram.name}</h3>
              <button onClick={() => setUpdateModalProgram(null)}><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSaveProgramUpdate} className="p-6 space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1"><span>نسبة الإنجاز</span><span>{editProgress}%</span></div>
                <input type="range" min="0" max="100" value={editProgress} onChange={(e) => setEditProgress(e.target.value)} className="w-full accent-[#0F294A]" />
              </div>
              <div>
                <label className="block font-bold mb-1">القياس البعدي (%)</label>
                <input type="number" min="0" max="100" value={editPostScore} onChange={(e) => setEditPostScore(e.target.value)} className="w-full px-3 py-2 rounded-xl border font-bold" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setUpdateModalProgram(null)} className="px-4 py-2 bg-slate-100 rounded-xl font-bold">إلغاء</button>
                <button type="submit" className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold">حفظ</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Program Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border overflow-hidden my-8">
            <div className="bg-[#0F294A] text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-base font-bold">إضافة برنامج جديد</h3>
              <button onClick={() => setAddModalOpen(false)}><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleAddNewProgram} className="p-6 space-y-3 text-xs">
              <div><label className="block font-bold mb-1">اسم البرنامج *</label><input type="text" required value={newPrg.name} onChange={(e) => setNewPrg({ ...newPrg, name: e.target.value })} className="w-full px-3 py-2 rounded-xl border" /></div>
              <div><label className="block font-bold mb-1">الجهة المنفذة *</label><input type="text" required value={newPrg.owner} onChange={(e) => setNewPrg({ ...newPrg, owner: e.target.value })} className="w-full px-3 py-2 rounded-xl border" /></div>
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setAddModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-bold">إلغاء</button>
                <button type="submit" className="px-5 py-2 bg-[#0F294A] text-white rounded-xl font-bold">إضافة</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
