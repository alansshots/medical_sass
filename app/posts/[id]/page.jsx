'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { MapPin, Calendar, Clock, Phone, Mail, Facebook, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'// Import your Supabase client configuration

export default function PostingDetail() {
  const { id } = useParams();
  const [posting, setPosting] = useState('');
  const supabase = createClientComponentClient()

  // Fetch data from Supabase when the component mounts
  useEffect(() => {
    async function fetchPosting() {
      const { data, error } = await supabase
        .from('posts') // Replace 'postings' with your Supabase table name
        .select('*')
        .eq('id', id)
        .single(); // Fetch a single record based on the ID

      if (error) {
        console.error('Error fetching posting:', error);
      } else {
        setPosting(data); // Set the fetched data in state
      }
    }

    if (id) {
      fetchPosting();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-sky-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/posts" className="inline-flex items-center text-sky-600 hover:text-sky-800 mb-6">
          <ArrowLeft className="mr-2" size={20} />
          Назад 
        </Link>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-sky-600 text-white px-6 py-4">
            <h1 className="text-3xl font-bold">{posting.title}</h1>
            <p className="text-sky-100">{posting.type}</p>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-sky-800 mb-2">Описание</h2>
              <p className="text-gray-600">{posting.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-sky-800 mb-2">Детайли</h2>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="mr-2" size={20} />
                    <span>{posting.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="mr-2" size={20} />
                    <span>Публикувано: {new Date(posting.created_at).toLocaleDateString('bg-BG')}</span>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-sky-800 mb-2">Автор на публикацията</h2>
                <p className="text-gray-600 mb-1">{posting.name}</p>
                <p className="text-gray-600 mb-1">{posting.university}</p>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-sky-800 mb-2">Контакти</h2>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Phone className="mr-2" size={20} />
                  <span>{posting.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="mr-2" size={20} />
                  <span>{posting.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Facebook className="mr-2" size={20} />
                  <span>{posting.facebook}</span>
                </div>
              </div>
            </div>
            {/* <button className="w-full bg-sky-600 text-white py-2 px-4 rounded-full hover:bg-sky-700 transition-colors">
              Book Appointment
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
