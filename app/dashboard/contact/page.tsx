import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, Phone, User } from "lucide-react"

// Mock data for support contacts
const supportContacts = [
  {
    name: "Customer Support",
    email: "support@eventmanager.com",
    phone: "+1 (555) 123-4567",
    hours: "Mon-Fri, 9:00 AM - 5:00 PM",
  },
  {
    name: "Technical Support",
    email: "tech@eventmanager.com",
    phone: "+1 (555) 987-6543",
    hours: "24/7 Support",
  },
  {
    name: "Booking Assistance",
    email: "bookings@eventmanager.com",
    phone: "+1 (555) 456-7890",
    hours: "Mon-Sat, 8:00 AM - 8:00 PM",
  },
]

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-gray-600 mt-1">Get in touch with our support team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Message subject" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Type your message here" rows={5} />
                </div>

                <Button type="submit" className="w-full md:w-auto">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600">info@eventmanager.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium">Live Chat</h3>
                    <p className="text-gray-600">Available 24/7</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Support Team</h2>
              <div className="space-y-4">
                {supportContacts.map((contact, index) => (
                  <div key={index} className="pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex items-center mb-2">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      <h3 className="font-medium">{contact.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{contact.email}</p>
                    <p className="text-sm text-gray-600 mb-1">{contact.phone}</p>
                    <p className="text-sm text-gray-600">{contact.hours}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
