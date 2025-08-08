#!/usr/bin/env tsx

import { DatabaseSync } from 'node:sqlite'
import { createId } from '@paralleldrive/cuid2'

const dbFile = './data/trips.db'
const sqlite = new DatabaseSync(dbFile)

console.log('🌱 Seeding itinerary database...')

try {
  // Disable foreign keys temporarily for seeding
  sqlite.exec('PRAGMA foreign_keys = OFF')

  // Clear existing data first
  sqlite.exec('DELETE FROM itinerary_item_attendees')
  sqlite.exec('DELETE FROM itinerary_items')
  sqlite.exec('DELETE FROM content_items')

  const now = Date.now()

  // Rich itinerary items based on mock data
  const itineraryItems = [
    // Rio Trip Items
    {
      id: 'item_rio_arrival',
      title: 'Flight Arrival - Rio de Janeiro',
      description:
        'TAM Airlines JJ8070 - Land at Galeão International Airport. Check flight status before departure.',
      type: 'transport',
      start_date: new Date('2024-03-15T22:45:00').getTime(),
      end_date: new Date('2024-03-15T23:30:00').getTime(),
      is_all_day: 0,
      status: 'confirmed',
      priority: 'high',
      tags: JSON.stringify(['travel', 'arrival', 'flight']),
      notes:
        'Gate information will be announced 2 hours before departure. Arrive 3 hours early for international flight.',
      type_data: JSON.stringify({
        transportType: 'flight',
        airline: 'TAM Airlines',
        flightNumber: 'JJ8070',
        confirmationCode: 'ABC123',
        from: 'Origin Airport',
        to: 'Galeão International Airport',
      }),
      created_at: now,
      updated_at: now,
      trip_id: 'trip_rio_vacation',
      user_id: 'user_test_john_doe',
      location_id: 'loc_galeao_airport',
    },
    {
      id: 'item_rio_hotel_checkin',
      title: 'Hotel Check-in - Copacabana Palace',
      description: 'Check into Ocean View Suite. Request early check-in if available.',
      type: 'accommodation',
      start_date: new Date('2024-03-16T15:00:00').getTime(),
      end_date: new Date('2024-03-22T12:00:00').getTime(),
      is_all_day: 0,
      status: 'confirmed',
      priority: 'high',
      tags: JSON.stringify(['accommodation', 'hotel']),
      notes: 'Confirmation number: CPH789456. Ocean view suite includes breakfast and pool access.',
      type_data: JSON.stringify({
        accommodationType: 'hotel',
        checkIn: '2024-03-16T15:00:00',
        checkOut: '2024-03-22T12:00:00',
        roomType: 'Ocean View Suite',
        confirmationCode: 'CPH789456',
      }),
      created_at: now,
      updated_at: now,
      trip_id: 'trip_rio_vacation',
      user_id: 'user_test_john_doe',
      location_id: 'loc_copacabana_palace',
    },
    {
      id: 'item_christ_redeemer_tour',
      title: 'Christ the Redeemer Tour',
      description:
        'Small group tour with professional guide. Includes train ticket to Corcovado and entrance fees.',
      type: 'activity',
      start_date: new Date('2024-03-17T09:00:00').getTime(),
      end_date: new Date('2024-03-17T14:00:00').getTime(),
      is_all_day: 0,
      status: 'confirmed',
      priority: 'high',
      tags: JSON.stringify(['sightseeing', 'tour', 'culture']),
      notes:
        'Booking reference: CTR2024789. Meeting point: Hotel lobby at 8:45 AM. Bring comfortable walking shoes and camera.',
      type_data: JSON.stringify({
        category: 'sightseeing',
        cost: { amount: 85, currency: 'USD' },
        groupSize: 'small',
        includes: ['transportation', 'guide', 'entrance fees'],
      }),
      created_at: now,
      updated_at: now,
      trip_id: 'trip_rio_vacation',
      user_id: 'user_test_john_doe',
      location_id: 'loc_christ_redeemer',
    },
    {
      id: 'item_copacabana_beach',
      title: 'Copacabana Beach Day',
      description:
        'Relax on the famous beach, try local food from beach vendors, and enjoy the atmosphere.',
      type: 'activity',
      start_date: new Date('2024-03-18T10:00:00').getTime(),
      end_date: new Date('2024-03-18T17:00:00').getTime(),
      is_all_day: 0,
      status: 'planned',
      priority: 'medium',
      tags: JSON.stringify(['beach', 'leisure', 'relaxation']),
      notes:
        'Bring sunscreen, beach towel, and cash for vendors. Try the famous açaí bowls and grilled cheese.',
      type_data: JSON.stringify({
        category: 'leisure',
        activities: ['sunbathing', 'swimming', 'food tasting'],
        recommendations: ['açaí bowl', 'grilled cheese', 'coconut water'],
      }),
      created_at: now,
      updated_at: now,
      trip_id: 'trip_rio_vacation',
      user_id: 'user_test_john_doe',
      location_id: 'loc_copacabana_beach',
    },
    {
      id: 'item_sugarloaf_sunset',
      title: 'Sugarloaf Mountain Cable Car',
      description:
        'Panoramic views of Rio at sunset. Take the cable car to the top for breathtaking views.',
      type: 'activity',
      start_date: new Date('2024-03-19T16:00:00').getTime(),
      end_date: new Date('2024-03-19T19:00:00').getTime(),
      is_all_day: 0,
      status: 'confirmed',
      priority: 'high',
      tags: JSON.stringify(['sightseeing', 'sunset', 'photography']),
      notes: 'Best time for photos is just before sunset. Cable car operates until 8 PM.',
      type_data: JSON.stringify({
        category: 'sightseeing',
        cost: { amount: 75, currency: 'USD' },
        bestTime: 'sunset',
        duration: '3 hours',
      }),
      created_at: now,
      updated_at: now,
      trip_id: 'trip_rio_vacation',
      user_id: 'user_test_john_doe',
      location_id: 'loc_sugarloaf_mountain',
    },
    {
      id: 'item_rio_departure',
      title: 'Departure Flight',
      description: 'Return flight home. Check-in online 24 hours before departure.',
      type: 'transport',
      start_date: new Date('2024-03-22T15:30:00').getTime(),
      end_date: new Date('2024-03-22T16:30:00').getTime(),
      is_all_day: 0,
      status: 'confirmed',
      priority: 'high',
      tags: JSON.stringify(['travel', 'departure', 'flight']),
      notes: 'Arrive at airport 3 hours early. Remember to check baggage weight limits.',
      type_data: JSON.stringify({
        transportType: 'flight',
        from: 'Galeão International Airport',
        to: 'Home Airport',
        checkInTime: '24 hours before',
      }),
      created_at: now,
      updated_at: now,
      trip_id: 'trip_rio_vacation',
      user_id: 'user_test_john_doe',
      location_id: 'loc_galeao_airport',
    },

    // Tokyo Business Trip Items
    {
      id: 'item_tokyo_arrival',
      title: 'Arrive in Tokyo',
      description: 'Business trip arrival at Narita Airport. Express train to city center.',
      type: 'transport',
      start_date: new Date('2024-02-10T18:30:00').getTime(),
      end_date: new Date('2024-02-10T19:30:00').getTime(),
      is_all_day: 0,
      status: 'completed',
      priority: 'high',
      tags: JSON.stringify(['business', 'travel', 'arrival']),
      notes: 'Take Narita Express to Shinjuku Station. Hotel shuttle available from station.',
      type_data: JSON.stringify({
        transportType: 'flight',
        from: 'Origin Airport',
        to: 'Narita International Airport',
      }),
      created_at: now,
      updated_at: now,
      trip_id: 'trip_tokyo_business',
      user_id: 'user_test_jane_smith',
      location_id: 'loc_narita_airport',
    },
    {
      id: 'item_tokyo_meeting',
      title: 'Business Meeting - Shibuya Office',
      description:
        'Quarterly review meeting with Japan team. Presentation at 10 AM, lunch meeting at 12 PM.',
      type: 'work',
      start_date: new Date('2024-02-12T10:00:00').getTime(),
      end_date: new Date('2024-02-12T16:00:00').getTime(),
      is_all_day: 0,
      status: 'completed',
      priority: 'high',
      tags: JSON.stringify(['business', 'meeting', 'presentation']),
      notes:
        'Bring presentation materials and business cards. Meeting room: Conference Room A, 15th floor.',
      type_data: JSON.stringify({
        workType: 'conference',
        agenda: ['quarterly review', 'project updates', 'team lunch'],
        attendees: ['Japan team', 'regional managers'],
      }),
      created_at: now,
      updated_at: now,
      trip_id: 'trip_tokyo_business',
      user_id: 'user_test_jane_smith',
      location_id: 'loc_shibuya_office',
    },

    // London Weekend Items
    {
      id: 'item_london_planning',
      title: 'Plan London Itinerary',
      description:
        'Research attractions, book theater tickets, and finalize restaurant reservations.',
      type: 'activity',
      start_date: new Date('2024-06-15T10:00:00').getTime(),
      end_date: new Date('2024-06-15T12:00:00').getTime(),
      is_all_day: 0,
      status: 'planned',
      priority: 'medium',
      tags: JSON.stringify(['planning', 'research', 'preparation']),
      notes: 'Book theater tickets online. Check opening hours for museums and attractions.',
      type_data: JSON.stringify({
        category: 'planning',
        tasks: ['book theater tickets', 'reserve restaurants', 'check museum hours'],
        priority: 'high',
      }),
      created_at: now,
      updated_at: now,
      trip_id: 'trip_london_weekend',
      user_id: 'user_test_john_doe',
      location_id: null,
    },
  ]

  // Content items based on ContentService data
  const contentItems = [
    // Destination content
    {
      id: createId(),
      category: 'destinations',
      title: 'Rio de Janeiro Guide',
      content: `# Rio de Janeiro

## Overview
The vibrant city known for its beaches, culture, and iconic landmarks.

## Must-See Attractions
- **Christ the Redeemer** - Iconic statue atop Corcovado Mountain
- **Sugarloaf Mountain** - Cable car with panoramic views
- **Copacabana Beach** - Famous beach with stunning coastline
- **Ipanema Beach** - Trendy beach neighborhood
- **Santa Teresa** - Historic neighborhood with colonial architecture

## Transportation
- **Getting There**: Galeão International Airport (GIG)
- **Getting Around**: Metro, buses, taxis, Uber

## Best Time to Visit
- **Dry Season**: May to September (less rain, cooler temperatures)
- **Summer**: December to March (hot, more crowded, Carnival season)

## Tips
- Plan for at least 3-4 days to see main attractions
- Book Christ the Redeemer tickets in advance
- Be aware of safety in certain areas, especially at night`,
      slug: 'rio-de-janeiro',
      tags: JSON.stringify(['brazil', 'beach', 'culture', 'south-america']),
      created_at: now,
      updated_at: now,
      trip_id: 'trip_rio_vacation',
      user_id: 'user_test_john_doe',
    },
    {
      id: createId(),
      category: 'destinations',
      title: 'Tokyo Business Travel Guide',
      content: `# Tokyo, Japan

## Overview
A fascinating blend of ultra-modern and traditional, Tokyo offers endless discoveries.

## Business Districts
- **Shibuya** - Major business hub with modern offices
- **Shinjuku** - Government offices and corporate headquarters
- **Marunouchi** - Financial district near Tokyo Station

## Transportation
- **Getting There**: Narita (NRT) or Haneda (HND)
- **Getting Around**: JR Pass, metro, trains - extremely efficient

## Business Culture
- Punctuality is crucial - arrive 10 minutes early
- Business cards (meishi) are very important
- Bowing is customary in business settings

## Tips
- Learn basic Japanese phrases for business
- Carry cash - many places don't accept cards
- Book restaurants in advance for business dinners`,
      slug: 'tokyo-business',
      tags: JSON.stringify(['japan', 'business', 'asia', 'corporate']),
      created_at: now,
      updated_at: now,
      trip_id: 'trip_tokyo_business',
      user_id: 'user_test_jane_smith',
    },

    // Activity content
    {
      id: createId(),
      category: 'activities',
      title: 'Christ the Redeemer Tour Details',
      content: `# Christ the Redeemer Tour

## Tour Information
- **Duration**: 5 hours (9:00 AM - 2:00 PM)
- **Group Size**: Small group (maximum 8 people)
- **Guide**: Professional English-speaking guide

## What's Included
- Hotel pickup and drop-off
- Corcovado train tickets
- Entrance fees to Christ the Redeemer
- Professional guide services

## What to Bring
- Comfortable walking shoes (some stairs involved)
- Camera or smartphone for photos
- Sun protection (hat, sunscreen, sunglasses)
- Light jacket (it can be cooler at the top)
- Water bottle

## Meeting Details
- **Pickup Time**: 8:45 AM
- **Location**: Hotel lobby
- **Confirmation Code**: CTR2024789

## Important Notes
- Tour operates rain or shine
- Alternative date available if weather is severe
- Wear comfortable clothes for walking and climbing stairs`,
      slug: 'christ-redeemer-tour',
      tags: JSON.stringify(['tour', 'sightseeing', 'rio', 'guided']),
      created_at: now,
      updated_at: now,
      trip_id: 'trip_rio_vacation',
      user_id: 'user_test_john_doe',
    },

    // Budget content
    {
      id: createId(),
      category: 'budget',
      title: 'Rio Trip Budget Breakdown',
      content: `# Rio Trip Budget Breakdown

## Accommodation (7 nights)
- **Copacabana Palace Hotel**: $1,200
- **Resort fees and taxes**: $50
- **Subtotal**: $1,250

## Transportation
- **Roundtrip flights**: $850
- **Airport transfers**: $60
- **Local transport (metro, taxis)**: $100
- **Subtotal**: $1,010

## Activities & Tours
- **Christ the Redeemer tour**: $85
- **Sugarloaf Mountain cable car**: $75
- **Beach activities and rentals**: $150
- **Subtotal**: $310

## Food & Dining
- **Breakfast (included with hotel)**: $0
- **Lunch and dinner**: $500
- **Drinks and snacks**: $200
- **Subtotal**: $700

## Shopping & Miscellaneous
- **Souvenirs and gifts**: $100
- **Emergency fund**: $200
- **Subtotal**: $300

## Total Estimated Cost
**$3,570** per person

## Money-Saving Tips
- Book tours in advance for early bird discounts
- Use metro instead of taxis when possible
- Try local restaurants instead of hotel dining
- Look for free beach activities and walking tours`,
      slug: 'rio-budget-breakdown',
      tags: JSON.stringify(['budget', 'money', 'planning', 'costs']),
      created_at: now,
      updated_at: now,
      trip_id: 'trip_rio_vacation',
      user_id: 'user_test_john_doe',
    },
  ]

  // Insert itinerary items
  const insertItemStmt = sqlite.prepare(`
    INSERT INTO itinerary_items (id, title, description, type, start_date, end_date, is_all_day, status, priority, tags, notes, type_data, created_at, updated_at, trip_id, user_id, location_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  for (const item of itineraryItems) {
    insertItemStmt.run(
      item.id,
      item.title,
      item.description,
      item.type,
      item.start_date,
      item.end_date,
      item.is_all_day,
      item.status,
      item.priority,
      item.tags,
      item.notes,
      item.type_data,
      item.created_at,
      item.updated_at,
      item.trip_id,
      item.user_id,
      item.location_id
    )
    console.log(`✅ Created itinerary item: ${item.title}`)
  }

  // Insert content items
  const insertContentStmt = sqlite.prepare(`
    INSERT INTO content_items (id, category, title, content, slug, tags, created_at, updated_at, trip_id, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  for (const content of contentItems) {
    insertContentStmt.run(
      content.id,
      content.category,
      content.title,
      content.content,
      content.slug,
      content.tags,
      content.created_at,
      content.updated_at,
      content.trip_id,
      content.user_id
    )
    console.log(`✅ Created content item: ${content.title}`)
  }

  // Re-enable foreign keys
  sqlite.exec('PRAGMA foreign_keys = ON')

  console.log(
    `🎉 Successfully seeded ${itineraryItems.length} itinerary items and ${contentItems.length} content items!`
  )
} catch (error) {
  console.error('❌ Error seeding itinerary data:', error)
  process.exit(1)
} finally {
  sqlite.close()
}
