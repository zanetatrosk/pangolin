import { z } from "zod";
import i18n from "@/lib/i18n";
import { RecurrenceType, DanceEventCreation } from "./types";

// --- Helpers ---
const todayStr = () => new Date().toLocaleDateString("en-CA");

const LocationSchema = z.object({
  name: z.string().trim().optional(),
  street: z.string().trim().optional(),
  city: z.string().trim().min(1, i18n.t("newEvent.validation.city")),
  state: z.string().trim().optional(),
  postalCode: z.string().trim().optional(),
  country: z.string().trim().min(1, i18n.t("newEvent.validation.country")),
  county: z.string().trim().optional(),
  houseNumber: z.string().trim().optional(),
});

const EventMediaItemSchema = z.object({
  type: z.enum(["image", "video"]),
  url: z.string().url(),
  id: z.string(),
});

// --- Main Schema ---

// We use z.Schema<DanceEventCreation> to force strict alignment
export const newEventSchema = z.object({
  basicInfo: z
    .object({
      eventName: z
        .string()
        .trim()
        .min(3, i18n.t("newEvent.validation.eventNameLength")),
      location: LocationSchema,
      date: z.string().trim().min(1, i18n.t("newEvent.validation.startDateRequired")),
      time: z.string().trim().min(1, i18n.t("newEvent.validation.timeRequired")),
      endDate: z.string().trim().optional(),
      price: z.number().min(0).optional(),
      currency: z.string().trim().optional(),
      // Strict boolean to match Interface
      isRecurring: z.boolean(),
      recurrenceType: z.nativeEnum(RecurrenceType).optional(),
      // Must be .nullable() to match string | null
      recurrenceEndDate: z.string().trim().nullable(),
    })
    .superRefine((data, ctx) => {
      console.log("Running custom validation for basicInfo with data:", data);
      const today = todayStr();
      console.log("Validating basicInfo with data:", data);
      // 1. Date Logic
      if (data.date && data.date < today && data.endDate === undefined) {
        ctx.addIssue({
          code: "custom",
          path: ["date"],
          message: i18n.t("newEvent.validation.startDateFuture"),
        });
      }

      if (data.endDate) {
        if (data.endDate <= today) {
          ctx.addIssue({
            code: "custom",
            path: ["endDate"],
            message: i18n.t("newEvent.validation.endDateFuture"),
          });
        }
        if (data.date && data.endDate <= data.date) {
          ctx.addIssue({
            code: "custom",
            path: ["endDate"],
            message: i18n.t("newEvent.validation.endDateAfterStartDate"),
          });
        }
      }

      // 2. Recurring Logic
      if (data.isRecurring) {
        if (!data.recurrenceType) {
          ctx.addIssue({
            code: "custom",
            path: ["recurrenceType"],
            message: i18n.t("newEvent.validation.recurrenceType"),
          });
        }
        if (!data.recurrenceEndDate) {
          ctx.addIssue({
            code: "custom",
            path: ["recurrenceEndDate"],
            message: i18n.t("newEvent.validation.recurrenceEndDateRequired"),
          });
        } else {
          if (data.recurrenceEndDate <= today) {
            ctx.addIssue({
              code: "custom",
              path: ["recurrenceEndDate"],
              message: i18n.t("newEvent.validation.endDateFuture"),
            });
          }
          if (data.date && data.recurrenceEndDate <= data.date) {
            ctx.addIssue({
              code: "custom",
              path: ["recurrenceEndDate"],
              message: i18n.t("newEvent.validation.endDateAfterStartDate"),
            });
          }
        }
      }

      // 3. Price/Currency Logic
      if (data.price !== undefined && !data.currency) {
        ctx.addIssue({
          code: "custom",
          path: ["currency"],
          message: i18n.t("newEvent.validation.currencyRequiredWhenPriceIsSet"),
        });
      }
      if (data.currency && data.price === undefined) {
        ctx.addIssue({
          code: "custom",
          path: ["price"],
          message: i18n.t("newEvent.validation.priceRequiredWhenCurrencyIsSet"),
        });
      }
    }),

  additionalDetails: z
    .object({
      danceStyles: z.array(z.string()),
      skillLevel: z.array(z.string()),
      typeOfEvent: z.array(z.string()),
      maxAttendees: z.number().optional(),
      allowWaitlist: z.boolean(),
      allowPartnerPairing: z.boolean(),
      facebookEventUrl: z.string().trim().startsWith("https://").optional(),
    })
    .optional(), // Matches additionalDetails?: in Interface

  description: z.string().optional(),
  coverImage: EventMediaItemSchema.optional(),
  media: z.array(EventMediaItemSchema).optional(),
}) satisfies z.ZodType<DanceEventCreation>;
// ^ "satisfies" ensures the schema matches your interface exactly
