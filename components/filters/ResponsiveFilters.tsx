"use client";

import {
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  ListRestart,
  X,
} from "lucide-react";
import dayjs from "dayjs";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { CardData } from "@/typings/typings";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "../ui/scroll-area";
import { MediaType, discoverMedia } from "@/services/home.apis";
import { filterLanguages, genresMovieList } from "@/constants/constants";
import { Drawer, DrawerContent, DrawerHeader } from "../ui/drawer";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ActionTypes,
  InitialStateInterface,
  filterReducer,
  initialState,
} from "./filterReducer";

interface ResponsiveCustomFiltersProps {
  mediaType: MediaType;
  open: boolean;
  setIsFilterApplied: Dispatch<SetStateAction<boolean>>;
  setIsFilterReseted: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<CardData>>;
  setResponsiveFilter: Dispatch<SetStateAction<boolean>>;
}

const ResponsiveCustomFilters = ({
  mediaType,
  open,
  setIsFilterApplied,
  setIsFilterReseted,
  setData,
  setResponsiveFilter,
}: ResponsiveCustomFiltersProps) => {
  const [languagesOpen, setLanguageOpen] = useState(false);
  const [isFilterStateValid, setIsFilterStateValid] = useState(false);

  const [filterState, dispatch] = useReducer(filterReducer, initialState);

  const fetchFilterData = async () => {
    const data = await discoverMedia(1, filterState, mediaType);
    setData(data);
  };

  const handleChange = (date: Date | undefined, type: string) => {
    if (
      type === ActionTypes.FROM_DATE &&
      filterState.fromDate === String(date)
    ) {
      dispatch({ type, payload: "" });
      return;
    }

    if (type === ActionTypes.TO_DATE && filterState.toDate === String(date)) {
      dispatch({ type, payload: "" });
      return;
    }

    dispatch({ type, payload: String(date) });
  };

  const handleChangeLanguage = (language: string) => {
    if (filterState.language === language) {
      dispatch({ type: ActionTypes.LANGUAGES, payload: "" });
      return;
    }

    dispatch({ type: ActionTypes.LANGUAGES, payload: language });
  };

  const handleChangeGenres = (id: number) => {
    const ids = filterState.genres;
    const isExists = ids.findIndex((item) => item === id);

    if (isExists !== -1) {
      ids.splice(isExists, 1);
    } else {
      ids.push(id);
    }

    dispatch({ type: ActionTypes.GENRES, payload: ids });
  };

  const handleSearch = () => {
    if (isFilterStateValid) {
      setIsFilterApplied(true);
      fetchFilterData();
      setResponsiveFilter(false);
    }
  };

  useEffect(() => {
    const isInitialStateValid = (state: InitialStateInterface): boolean => {
      return Object.values(state).some((value) => {
        if (Array.isArray(value)) {
          return value.length > 0;
        } else {
          return Boolean(value);
        }
      });
    };

    setIsFilterStateValid(isInitialStateValid(filterState));
  }, [filterState]);

  return (
    <Drawer open={open} onOpenChange={setResponsiveFilter}>
      <DrawerContent>
        <DrawerHeader className="flex justify-between">
          <h2 className="font-bold text-lg">Filters</h2>

          <div className="flex space-x-4">
            <ListRestart
              className="cursor-pointer"
              onClick={() => {
                setIsFilterReseted(true);
                dispatch({ type: ActionTypes.RESET, payload: initialState });
              }}
            />

            <X
              className="cursor-pointer"
              onClick={() => setResponsiveFilter(false)}
            />
          </div>
        </DrawerHeader>

        <h6 className="px-5 py-2 mt-2 text-sm">Release Dates</h6>

        <div className="flex space-x-2 items-center my-2 px-5 w-full">
          <div className="text-sm min-w-[22%] w-3/12">From</div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !filterState.fromDate && "text-muted-foreground"
                )}
                style={{ borderRadius: "7px" }}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filterState.fromDate ? (
                  dayjs(filterState.fromDate).format("MMM DD, YYYY")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-full p-0">
              <Calendar
                mode="single"
                selected={filterState.fromDate as Date}
                onSelect={(date) => handleChange(date, ActionTypes.FROM_DATE)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex space-x-2 items-center my-2 px-5 w-full">
          <h2 className="text-sm min-w-[22%] w-3/12">To</h2>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !filterState.toDate && "text-muted-foreground"
                )}
                style={{ borderRadius: "7px" }}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filterState.toDate ? (
                  dayjs(filterState.toDate).format("MMM DD, YYYY")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-full p-0">
              <Calendar
                mode="single"
                selected={filterState.toDate as Date}
                onSelect={(date) => handleChange(date, ActionTypes.TO_DATE)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <hr />

        <h6 className="px-5 py-2 mt-2 text-sm">Genres</h6>

        <div className="flex flex-wrap px-5 py-2">
          {genresMovieList.map((genreItem) => {
            return (
              <div
                key={genreItem.id}
                className={`border-2 cursor-pointer min-w-fit px-2.5 py-2 mt-2 mr-2 rounded-3xl text-sm ${
                  filterState.genres.includes(genreItem.id) && "bg-[#01B4E4]"
                }`}
                onClick={() => handleChangeGenres(genreItem.id)}
              >
                {genreItem.name}
              </div>
            );
          })}
        </div>

        <hr />

        <h6 className="px-5 py-2 mt-2 text-sm">Languages</h6>

        <div className="my-2 px-5">
          <Popover open={languagesOpen} onOpenChange={setLanguageOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={languagesOpen}
                className="w-full justify-between"
              >
                {filterState.language !== ""
                  ? filterLanguages.filter(
                      (item) => item.iso === filterState.language
                    )[0]?.language
                  : "Select Language..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="h-[200px] w-screen p-0">
              <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandEmpty>No Language found.</CommandEmpty>
                <ScrollArea>
                  <CommandGroup>
                    {filterLanguages.map((languageItem) => (
                      <CommandItem
                        key={languageItem.id}
                        value={languageItem.language}
                        onSelect={(currentValue) => {
                          handleChangeLanguage(languageItem.iso);
                          setLanguageOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            filterLanguages.filter(
                              (item) => item.iso === filterState.language
                            )[0]?.language === languageItem.language
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {languageItem.language}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </ScrollArea>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <hr />

        <Button
          variant="ghost"
          className="bg-[#01B4E4] mt-3 w-full"
          onClick={handleSearch}
          disabled={!isFilterStateValid}
        >
          Search
        </Button>
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveCustomFilters;
