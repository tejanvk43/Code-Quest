export interface EventInfo {
    id: string;
    name: string;
    shortDesc: string;
    icon: string;
    color: string;
    organizers: string[];
    description: string;
    rounds: string[];
    process?: string[];
    venue: string;
    requirements: string[];
    prizeParam?: string; // Renamed to avoid confusion with an array
    submissionDate?: string;
    time?: string;
}

export const eventsData: EventInfo[] = [
    {
        id: 'hire-ready',
        name: 'HireReady',
        shortDesc: 'A technical recruitment simulation to prep you for the real world.',
        icon: '👔',
        color: 'blue',
        organizers: [
            'Pothuri Teja Naga Venkata Kishore – 23NG1A0543 (Lead Coordinator)',
            'Kireety – 24NG1A0507',
            'Likith – 24NG1A05E1'
        ],
        description: 'HireReady is a technical recruitment simulation designed to replicate the real-world hiring process followed by the modern tech industry. The event exposes participants to structured interview rounds that test analytical thinking, technical proficiency, communication skills, and professional behavior. The objective is to prepare students for actual placement scenarios by providing a realistic, high-pressure interview environment.',
        rounds: [
            'Resume Screening',
            'Aptitude & Reasoning Test',
            'Coding Round',
            'Group Discussion',
            'HR Round',
            'Technical Interview Round'
        ],
        process: [
            'Resume Submission: Participants must upload their resumes during registration.',
            'Aptitude & Reasoning Round: All participants take this. Top 10–20 qualify.',
            'Further Rounds: Qualified participants proceed through Coding, GD, HR, and Technical interviews.',
            'Evaluation Method: Joint evaluation by coordinators and AI tools.'
        ],
        venue: 'CSI Room',
        requirements: [
            'Chairs: 30',
            'Tables: 3',
            'Computer Systems: 160'
        ],
        prizeParam: 'Prizes awarded based on cumulative performance across all rounds, not a single round.',
        time: '09:00 AM - 04:00 PM'
    },
    {
        id: 'technical-tic-tac-toe',
        name: 'Technical Tic Tac Toe',
        shortDesc: 'Strategy meets programming in this 3x3 battle of wits.',
        icon: '⭕',
        color: 'red',
        organizers: [
            'G. Sandhya',
            'S. Uma',
            'K. Raghuvaran',
            'N. Manoj'
        ],
        description: 'A strategic twist on the classic game where every move requires solving a technical puzzle. Played by 2 participants on a 3x3 grid with 9 technical questions. A buzzer determines who creates their move.',
        rounds: [
            'Round 1: Rapid Fire (Buzzer based)',
            'Winner decided by line formation or max correct answers in 2 mins.'
        ],
        venue: 'Seminar hall',
        requirements: [
            'Projector',
            'Chairs',
            'Screen'
        ],
        submissionDate: '27-12-2025',
        time: '10:30 AM - 12:30 PM'
    },
    {
        id: 'code-combat',
        name: 'Code Combat',
        shortDesc: 'The ultimate algorithmic battle using CodeCombat platform.',
        icon: '⚔️',
        color: 'green',
        organizers: [
            'K. Sriram Karthieya',
            'A. Sania',
            'J. Sathish',
            'R. Tharika'
        ],
        description: 'Code Combat is a competitive event using the online platform CodeCombat (https://codecombat.com/play). Participants solve coding challenges within a fixed time limit to test logic and speed.',
        rounds: [
            'Round 1: Set-wise competition (4 sets)',
            'Final Round: Winners from each set compete with higher difficulty.'
        ],
        venue: 'Computer Laboratory (Department Lab)',
        requirements: [
            'Desktop computers',
            'Stable internet connection',
            'Web browser',
            'Seating arrangement',
            'Timer/stopwatch'
        ],
        submissionDate: '29/12/2025 (10:00AM – 3:00PM)',
        time: '10:00 AM - 01:00 PM'
    },
    {
        id: 'spotx',
        name: 'SpotX',
        shortDesc: 'Find the bug, fix the logic. A test of observation.',
        icon: '🐞',
        color: 'red',
        organizers: [
            'Yasmitha-24NG1A5405 (Lead)',
            'Kumar kowshik-24NG1A5455',
            'Bhuvaneswari-24NG1A5410',
            'Manivitha-24NG1A6118'
        ],
        description: 'Spot the Difference is a technical event where participants identify small differences between two similar technical items such as code snippets, UI screens, or diagrams.',
        rounds: [
            'Difference in emojis',
            'Explanation of the keywords',
            'Difference in codes',
            'Find out all the differences in the given images'
        ],
        process: [
            'Participating 2 members at a time',
            'Answering 6 questions in 1 minute'
        ],
        venue: 'Seminar hall',
        requirements: [
            'Projector-1',
            'Tables-1',
            'Chairs-40'
        ],
        time: '02:00 PM - 03:00 PM'
    },
    {
        id: 'brain-quest',
        name: 'Brain Quest',
        shortDesc: 'Rapid-fire technical quiz testing knowledge and speed.',
        icon: '🧠',
        color: 'cyan',
        organizers: [
            'Md. sahil',
            'Sk. abbas',
            'V. harsha Vardhan',
            'J. priya'
        ],
        description: 'Players analyse a paragraph and answer questions within a time limit. If they take too long, the question is skipped. Admin decides the winner based on top scores.',
        rounds: [
            'Paragraph Analysis & Q/A',
            'Rapid Fire'
        ],
        venue: 'Cp lab 1, with internet access',
        requirements: [
            'Internet access',
            'Xerox papers (backup)'
        ],
        submissionDate: '29/12/2025 (10:00 am to 3:30 pm)',
        time: '11:00 AM - 03:00 PM'
    }
];
