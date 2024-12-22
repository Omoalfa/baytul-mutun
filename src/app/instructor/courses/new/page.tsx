'use client'

import { useState } from 'react';
import { useCreateCourse } from '@/hooks/useApi';
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CourseLevel } from '@/types/course'

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  requirements: z.array(z.string()).min(1, "At least one requirement is needed"),
  level: z.nativeEnum(CourseLevel),
  objectives: z.array(z.string()).min(1, "At least one objective is needed"),
  price: z.number().min(0, "Price cannot be negative"),
  duration: z.number().min(1, "Duration is required"),
  avatar: z.instanceof(File, { message: "Please upload a course image" }).optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function CreateCourseForm() {
  const router = useRouter();
  const { mutate: createCourse, isPending, error } = useCreateCourse();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      requirements: [],
      level: CourseLevel.BEGINNER,
      objectives: [],
      price: 0,
      duration: 1,
    },
  })

  const [newRequirement, setNewRequirement] = useState("")
  const [newObjective, setNewObjective] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      form.setValue("avatar", file)
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setAvatarUrl(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const addRequirement = () => {
    if (newRequirement.trim()) {
      const current = form.getValues("requirements")
      form.setValue("requirements", [...current, newRequirement.trim()])
      setNewRequirement("")
    }
  }

  const addObjective = () => {
    if (newObjective.trim()) {
      const current = form.getValues("objectives")
      form.setValue("objectives", [...current, newObjective.trim()])
      setNewObjective("")
    }
  }

  const onSubmit = (data: FormValues) => {
    console.log(data)
    // Extract avatar file from the data
    const courseData = {
      title: data.title,
      description: data.description,
      requirements: data.requirements,
      level: data.level,
      objectives: data.objectives,
      price: data.price,
      duration: data.duration,
      avatar: data.avatar
    }
    
    createCourse(courseData, {
      onSuccess: () => {
        router.push("/instructor/courses")
      },
      onError: (error) => {
        console.error("Error creating course:", error)
      },
    })
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Course</CardTitle>
        <CardDescription>Fill in the details to create a new course</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          {error && <p>{error.message}</p>}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Course title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Course description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(CourseLevel).map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Course price" 
                        {...field} 
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (in weeks)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        value={field.value}
                        onChange={e => field.onChange(Number(e.target.value))}
                        placeholder="e.g., 2" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormLabel>Requirements</FormLabel>
              <div className="flex gap-2">
                <Input
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  placeholder="Add a requirement"
                />
                <Button type="button" onClick={addRequirement}>
                  Add
                </Button>
              </div>
              <ul className="list-disc pl-4">
                {form.watch("requirements").map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
              {form.formState.errors.requirements && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.requirements.message}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <FormLabel>Objectives</FormLabel>
              <div className="flex gap-2">
                <Input
                  value={newObjective}
                  onChange={(e) => setNewObjective(e.target.value)}
                  placeholder="Add an objective"
                />
                <Button type="button" onClick={addObjective}>
                  Add
                </Button>
              </div>
              <ul className="list-disc pl-4">
                {form.watch("objectives").map((obj, index) => (
                  <li key={index}>{obj}</li>
                ))}
              </ul>
              {form.formState.errors.objectives && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.objectives.message}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <FormLabel>Course Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="cursor-pointer"
              />
              {avatarUrl && (
                <div className="mt-2">
                  <img
                    src={avatarUrl}
                    alt="Course preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
              {form.formState.errors.avatar && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.avatar.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Creating..." : "Create Course"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
