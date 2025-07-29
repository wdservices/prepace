
"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSubjects } from "@/lib/data";
import { Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const optionSchema = z.object({
  value: z.string().min(1, "Option cannot be empty."),
});

const formSchema = z.object({
  subject: z.string().min(1, "Please select a subject."),
  year: z.string().min(4, "Please enter a valid year.").max(4),
  question: z.string().min(10, "Question must be at least 10 characters."),
  options: z.array(optionSchema).min(2, "Please provide at least two options.").max(4, "You can have a maximum of 4 options."),
  answer: z.string().min(1, "Please select the correct answer."),
});

export default function AddContentPage() {
  const subjects = getSubjects();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      year: new Date().getFullYear().toString(),
      question: "",
      options: [{ value: "" }, { value: "" }],
      answer: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Here you would typically send the data to your backend/database
    console.log(values);
    toast({
      title: "Content Submitted!",
      description: "The new question has been added (check the console).",
    });
    // In a real app, you would probably reset the form after successful submission
  };

  const optionsWatch = form.watch("options");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Add New Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subjects.map((s) => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 2023" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter the question text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <FormLabel>Options</FormLabel>
                    <div className="space-y-2 mt-2">
                      {fields.map((field, index) => (
                        <FormField
                          key={field.id}
                          control={form.control}
                          name={`options.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex items-center gap-2">
                              <FormControl>
                                <Input placeholder={`Option ${index + 1}`} {...field} />
                              </FormControl>
                              {fields.length > 2 && (
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  onClick={() => remove(index)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              )}
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                     {fields.length < 4 && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => append({ value: "" })}
                        >
                            Add Option
                        </Button>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name="answer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correct Answer</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={optionsWatch.some(o => !o.value)}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the correct answer" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {optionsWatch.map((option, index) =>
                                option.value ? (
                                    <SelectItem key={index} value={option.value}>
                                    {option.value}
                                    </SelectItem>
                                ) : null
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" size="lg">Submit Content</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
