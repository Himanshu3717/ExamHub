"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaInfoCircle,
  FaUniversity,
  FaUser,
  FaCalendar,
  FaFile,
  FaClipboardList,
  FaBook,
  FaCheckCircle,
  FaList,
  FaCalendarCheck,
  FaClipboard
} from 'react-icons/fa';

interface ExamDetails {
  introduction: string;
  conductingBody: string;
  eligibility: {
    educationalQualification: string[];
    ageLimit: string;
    otherCriteria?: string[];
  };
  importantDates: {
    [key: string]: string;
  };
  prospectus: {
    downloadLink: string;
    details: string[];
  };
  applicationForm: {
    mode: string;
    steps: string[];
    fee: {
      general: number;
      reserved: number;
    };
  };
  examinationDetails: {
    mode: string;
    duration: string;
    sections: {
      name: string;
      marks: number;
      questions: number;
    }[];
    mediumOfExam: string[];
  };
  syllabus: string[];
  examDates: string[];
  result: {
    expectedDate: string;
    method: string;
  };
  counselingDetails: {
    mode: string;
    rounds: string[];
    documentVerification: boolean;
  };
}

export default function ExamDetailsPage() {
  const examData: ExamDetails = {
    introduction: "A comprehensive national-level examination for aspiring candidates seeking admission to premier engineering institutions across India.",
    conductingBody: "National Testing Agency (NTA)",
    eligibility: {
      educationalQualification: [
        "12th Pass with Physics and Mathematics",
        "Minimum 50% aggregate score",
        "Valid for both appearing and passed students"
      ],
      ageLimit: "No upper age limit",
      otherCriteria: [
        "Indian Nationals",
        "NRI/Foreign Nationals can also apply"
      ]
    },
    importantDates: {
      "Application Start": "15 August 2024",
      "Application End": "30 September 2024",
      "Admit Card Release": "15 October 2024",
      "Exam Date": "10-20 November 2024",
      "Result Declaration": "15 December 2024"
    },
    prospectus: {
      downloadLink: "https://example.com/prospectus",
      details: [
        "Complete exam guidelines",
        "Detailed syllabus",
        "Exam pattern information"
      ]
    },
    applicationForm: {
      mode: "Online",
      steps: [
        "Register on official website",
        "Fill personal details",
        "Upload documents",
        "Pay application fee"
      ],
      fee: {
        general: 1200,
        reserved: 600
      }
    },
    examinationDetails: {
      mode: "Computer Based Test (CBT)",
      duration: "3 hours",
      sections: [
        { name: "Physics", marks: 30, questions: 30 },
        { name: "Chemistry", marks: 30, questions: 30 },
        { name: "Mathematics", marks: 40, questions: 40 }
      ],
      mediumOfExam: ["English", "Hindi"]
    },
    syllabus: [
      "Physics: Mechanics, Thermodynamics, Optics",
      "Chemistry: Organic, Inorganic, Physical Chemistry",
      "Mathematics: Algebra, Calculus, Trigonometry"
    ],
    examDates: [
      "10 November 2024 (Shift 1)",
      "11 November 2024 (Shift 2)",
      "12 November 2024 (Shift 3)"
    ],
    result: {
      expectedDate: "15 December 2024",
      method: "Online through official website"
    },
    counselingDetails: {
      mode: "Online and Offline",
      rounds: [
        "First Round",
        "Second Round",
        "Spot Counseling"
      ],
      documentVerification: true
    }
  };

  const [activeSection, setActiveSection] = useState<string>('introduction');

  const renderSection = () => {
    switch (activeSection) {
      case 'introduction':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaInfoCircle className="text-blue-600 text-2xl" />
              <h3 className="text-xl font-semibold">Introduction</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{examData.introduction}</p>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold flex items-center">
                  <FaUniversity className="mr-2 text-blue-600" /> Conducting Body
                </h4>
                <p>{examData.conductingBody}</p>
              </div>
            </div>
          </motion.div>
        );

      case 'eligibility':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaUser className="text-blue-600 text-2xl" />
              <h3 className="text-xl font-semibold">Eligibility Criteria</h3>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Educational Qualification</h4>
                <ul className="list-disc pl-5">
                  {examData.eligibility.educationalQualification.map((qual, index) => (
                    <li key={index}>{qual}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Age Limit</h4>
                <p>{examData.eligibility.ageLimit}</p>
              </div>
              {examData.eligibility.otherCriteria && (
                <div>
                  <h4 className="font-semibold mb-2">Other Criteria</h4>
                  <ul className="list-disc pl-5">
                    {examData.eligibility.otherCriteria.map((criteria, index) => (
                      <li key={index}>{criteria}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        );

      case 'importantDates':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaCalendar className="text-blue-600 text-2xl" />
              <h3 className="text-xl font-semibold">Important Dates</h3>
            </div>
            <div className="space-y-2">
              {Object.entries(examData.importantDates).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b pb-2">
                  <span className="font-medium">{key}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'prospectus':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaFile className="text-blue-600 text-2xl" />
              <h3 className="text-xl font-semibold">Prospectus</h3>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Prospectus Details</h4>
              <ul className="list-disc pl-5">
                {examData.prospectus.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
              <a
                href={examData.prospectus.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Download Prospectus
              </a>
            </div>
          </motion.div>
        );

      case 'applicationForm':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaClipboardList className="text-blue-600 text-2xl" />
              <h3 className="text-xl font-semibold">Application Form</h3>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Application Mode</h4>
                <p>{examData.applicationForm.mode}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Application Steps</h4>
                <ol className="list-decimal pl-5">
                  {examData.applicationForm.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Application Fee</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-semibold">General Category</h5>
                    <p>₹{examData.applicationForm.fee.general}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-semibold">Reserved Categories</h5>
                    <p>₹{examData.applicationForm.fee.reserved}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'examinationDetails':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaCheckCircle className="text-blue-600 text-2xl" />
              <h3 className="text-xl font-semibold">Examination Details</h3>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Exam Mode</h4>
                <p>{examData.examinationDetails.mode}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Exam Duration</h4>
                <p>{examData.examinationDetails.duration}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Exam Sections</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-blue-100">
                        <th className="border p-2">Section</th>
                        <th className="border p-2">Questions</th>
                        <th className="border p-2">Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {examData.examinationDetails.sections.map((section, index) => (
                        <tr key={index}>
                          <td className="border p-2">{section.name}</td>
                          <td className="border p-2 text-center">{section.questions}</td>
                          <td className="border p-2 text-center">{section.marks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Medium of Exam</h4>
                <p>{examData.examinationDetails.mediumOfExam.join(', ')}</p>
              </div>
            </div>
          </motion.div>
        );

      case 'syllabus':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaBook className="text-blue-600 text-2xl" />
              <h3 className="text-xl font-semibold">Syllabus</h3>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              {examData.syllabus.map((topic, index) => (
                <li key={index} className="text-gray-700">{topic}</li>
              ))}
            </ul>
          </motion.div>
        );

      case 'examDates':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaCalendarCheck className="text-blue-600 text-2xl" />
              <h3 className="text-xl font-semibold">Exam Dates</h3>
            </div>
            <ul className="list-disc pl-5">
              {examData.examDates.map((date, index) => (
                <li key={index}>{date}</li>
              ))}
            </ul>
          </motion.div>
        );

      case 'result':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaClipboard className="text-blue-600 text-2xl" />
              <h3 className="text-xl font-semibold">Result</h3>
            </div>
            <div className="space-y-2">
              <p><strong>Expected Result Date:</strong> {examData.result.expectedDate}</p>
              <p><strong>Result Method:</strong> {examData.result.method}</p>
            </div>
          </motion.div>
        );

      case 'counseling':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaList className="text-blue-600 text-2xl" />
              <h3 className="text-xl font-semibold">Counseling Details</h3>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Counseling Mode</h4>
                <p>{examData.counselingDetails.mode}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Counseling Rounds</h4>
                <ul className="list-disc pl-5">
                  {examData.counselingDetails.rounds.map((round, index) => (
                    <li key={index}>{round}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Document Verification</h4>
                <p>{examData.counselingDetails.documentVerification ? 'Required' : 'Not Required'}</p>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-blue-600 dark:bg-blue-800 text-white">
          <h1 className="text-3xl font-bold">Exam Details</h1>
        </div>

        {/* Navigation Tabs */}
        <div className="p-4 bg-gray-100 dark:bg-gray-700 overflow-x-auto">
          <div className="flex space-x-4">
            {[
              { key: 'introduction', label: 'Introduction', icon: FaInfoCircle },
              { key: 'eligibility', label: 'Eligibility', icon: FaUser },
              { key: 'importantDates', label: 'Important Dates', icon: FaCalendar },
              { key: 'prospectus', label: 'Prospectus', icon: FaFile },
              { key: 'applicationForm', label: 'Application', icon: FaClipboardList },
              { key: 'examinationDetails', label: 'Exam Details', icon: FaCheckCircle },
              { key: 'syllabus', label: 'Syllabus', icon: FaBook },
              { key: 'examDates', label: 'Exam Dates', icon: FaCalendarCheck },
              { key: 'result', label: 'Result', icon: FaClipboard },
              { key: 'counseling', label: 'Counseling', icon: FaList }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveSection(tab.key)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg
                  ${activeSection === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100'}
                `}
              >
                <tab.icon />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Content Section */}
        <div className="p-6">
          {renderSection()}
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-100 dark:bg-gray-700 p-6 flex justify-center space-x-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Apply Now
          </button>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
            Download Notification
          </button>
        </div>
      </div>
    </div>
  );
}